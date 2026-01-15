/**
 * Composable for MoMo Integration
 * Handles both automatic (API) and manual payment tracking
 */

import { ref, computed } from 'vue';
import { momoService } from '../utils/momoService';
import { useAppState } from './useAppState';
import { getFunctions, httpsCallable } from 'firebase/functions';

export function useMoMo() {
    const { addTransaction, addPendingTransaction, settings } = useAppState();

    const isLoading = ref(false);
    const error = ref(null);
    const currentPayment = ref(null);

    // Check if MoMo Business API is configured
    const isBusinessAPIConfigured = computed(() => {
        return !!(
            import.meta.env.VITE_MOMO_PARTNER_CODE &&
            import.meta.env.VITE_MOMO_ACCESS_KEY &&
            import.meta.env.VITE_MOMO_SECRET_KEY
        );
    });

    // Check if personal phone is configured
    const isPersonalConfigured = computed(() => {
        return !!settings.value.momoPhone;
    });

    /**
     * Create payment using Business API (Automatic)
     */
    const createBusinessPayment = async (paymentData) => {
        isLoading.value = true;
        error.value = null;

        try {
            const { memberId, memberName, amount, category = 'fund' } = paymentData;

            // Generate unique order ID
            const orderId = `${memberId}_${category}_${Date.now()}`;

            // Try to use Firebase Function first (recommended for security)
            if (window.firebase) {
                try {
                    const functions = getFunctions();
                    const createPayment = httpsCallable(functions, 'createMoMoPayment');

                    const result = await createPayment({
                        orderId,
                        amount,
                        memberName,
                        memberId,
                        category,
                        returnUrl: window.location.origin + '/finance'
                    });

                    if (result.data.success) {
                        currentPayment.value = {
                            orderId,
                            qrCodeUrl: result.data.qrCodeUrl,
                            deepLink: result.data.deepLink,
                            payUrl: result.data.payUrl,
                            amount,
                            memberName,
                            method: 'business_api'
                        };
                        return currentPayment.value;
                    }
                } catch (funcError) {
                    console.warn('Firebase Function not available, using client-side call:', funcError);
                }
            }

            // Fallback to client-side call (less secure, signatures exposed)
            const result = await momoService.createPaymentQR({
                orderId,
                amount,
                description: `${memberName} - ${category === 'fund' ? 'Quỹ tháng' : 'Tiền phạt'}`,
                memberName,
                memberId,
                category
            });

            if (result.success) {
                currentPayment.value = {
                    orderId,
                    qrCodeUrl: result.qrCodeUrl,
                    deepLink: result.deepLink,
                    payUrl: result.payUrl,
                    amount,
                    memberName,
                    method: 'business_api'
                };
                return currentPayment.value;
            } else {
                throw new Error(result.error);
            }
        } catch (err) {
            error.value = err.message;
            console.error('Create business payment error:', err);
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Create personal payment link (Manual tracking)
     */
    const createPersonalPayment = (paymentData) => {
        const { memberName, amount, category = 'fund' } = paymentData;
        const phone = settings.value.momoPhone;

        if (!phone) {
            error.value = 'Chưa cấu hình số điện thoại MoMo';
            return null;
        }

        const note = `${memberName} ${category === 'fund' ? 'dong quy' : 'dong phat'}`;
        const qrData = momoService.generatePersonalQRLink({ phone, amount, note });

        currentPayment.value = {
            memberName,
            amount,
            note,
            qrData,  // Raw QR data string
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`,
            deepLink: `momo://app?action=transfer&amount=${amount}&note=${encodeURIComponent(note)}&recipient=${phone}`,
            method: 'personal'
        };

        return currentPayment.value;
    };

    /**
     * Check payment status (for Business API)
     */
    const checkPaymentStatus = async (orderId) => {
        isLoading.value = true;
        error.value = null;

        try {
            const result = await momoService.checkTransactionStatus(orderId);
            return result;
        } catch (err) {
            error.value = err.message;
            console.error('Check payment status error:', err);
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Manually confirm payment (for personal method or when webhook fails)
     * @param {boolean} isPending - If true, creates pending transaction (for members), otherwise direct transaction (for admin)
     */
    const manuallyConfirmPayment = async (paymentData, isPending = false) => {
        const {
            memberId,
            memberName,
            amount,
            category = 'fund',
            transactionId = null,
            note = ''
        } = paymentData;

        try {
            const transactionData = {
                type: 'income',
                category,
                amount,
                description: note || `${memberName} - ${category === 'fund' ? 'Quỹ tháng' : 'Tiền phạt'} (MoMo)`,
                date: new Date().toISOString().split('T')[0],
                memberId,
                momoTransId: transactionId,
                source: 'momo_manual',
                createdAt: new Date()
            };

            if (isPending) {
                // Create pending transaction for member payments
                await addPendingTransaction(transactionData);
            } else {
                // Create direct transaction for admin
                await addTransaction(transactionData);
            }
            return true;
        } catch (err) {
            error.value = err.message;
            console.error('Manual confirm error:', err);
            return false;
        }
    };

    /**
     * Create payment (smart router - chooses best method)
     */
    const createPayment = async (paymentData) => {
        // If Business API is configured, use it
        if (isBusinessAPIConfigured.value) {
            return await createBusinessPayment(paymentData);
        }
        // Otherwise use personal method
        else if (isPersonalConfigured.value) {
            return createPersonalPayment(paymentData);
        }
        // No method configured
        else {
            error.value = 'Chưa cấu hình phương thức thanh toán MoMo';
            return null;
        }
    };

    return {
        // State
        isLoading,
        error,
        currentPayment,

        // Computed
        isBusinessAPIConfigured,
        isPersonalConfigured,

        // Methods
        createPayment,
        createBusinessPayment,
        createPersonalPayment,
        checkPaymentStatus,
        manuallyConfirmPayment
    };
}

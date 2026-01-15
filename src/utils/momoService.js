/**
 * MoMo Payment Service
 * Handles integration with MoMo Business API
 */

class MoMoService {
    constructor() {
        this.partnerCode = import.meta.env.VITE_MOMO_PARTNER_CODE || '';
        this.accessKey = import.meta.env.VITE_MOMO_ACCESS_KEY || '';
        this.secretKey = import.meta.env.VITE_MOMO_SECRET_KEY || '';
        this.endpoint = import.meta.env.VITE_MOMO_ENDPOINT || 'https://test-payment.momo.vn';
        this.appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    }

    /**
     * Generate signature for MoMo API requests using Web Crypto API
     * @param {Object} params - Request parameters
     * @returns {Promise<string>} HMAC SHA256 signature
     */
    async generateSignature(params) {
        // Sort keys alphabetically and concatenate
        const sortedKeys = Object.keys(params).sort();
        const signatureString = sortedKeys
            .map(key => `${key}=${params[key]}`)
            .join('&');

        // Convert secret key and message to Uint8Array
        const encoder = new TextEncoder();
        const keyData = encoder.encode(this.secretKey);
        const messageData = encoder.encode(signatureString);

        // Import the key for HMAC
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        // Generate HMAC SHA256
        const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);

        // Convert to hex string
        const hashArray = Array.from(new Uint8Array(signature));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        return hashHex;
    }

    /**
     * Create a payment QR code request
     * @param {Object} paymentData
     * @returns {Promise<Object>} Payment response with QR code
     */
    async createPaymentQR(paymentData) {
        const {
            orderId,
            amount,
            description,
            memberName,
            returnUrl = `${this.appUrl}/finance`,
            notifyUrl = `${this.appUrl}/api/momo/webhook`
        } = paymentData;

        const requestId = `${orderId}_${Date.now()}`;
        const orderInfo = description || `${memberName} - Đóng quỹ`;

        const params = {
            partnerCode: this.partnerCode,
            accessKey: this.accessKey,
            requestId: requestId,
            amount: amount.toString(),
            orderId: orderId,
            orderInfo: orderInfo,
            returnUrl: returnUrl,
            notifyUrl: notifyUrl,
            requestType: 'qrCode',
            extraData: '' // Can store memberId or other metadata (base64 encoded)
        };

        // Generate signature
        params.signature = await this.generateSignature(params);

        try {
            const response = await fetch(`${this.endpoint}/gw_payment/transactionProcessor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });

            const result = await response.json();

            if (result.errorCode === 0) {
                return {
                    success: true,
                    qrCodeUrl: result.qrCodeUrl,
                    deepLink: result.deeplink,
                    payUrl: result.payUrl,
                    orderId: orderId,
                    requestId: requestId
                };
            } else {
                throw new Error(result.localMessage || 'MoMo API Error');
            }
        } catch (error) {
            console.error('MoMo Create Payment Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Check transaction status
     * @param {string} orderId - Order ID to check
     * @returns {Promise<Object>} Transaction status
     */
    async checkTransactionStatus(orderId) {
        const requestId = `${orderId}_status_${Date.now()}`;

        const params = {
            partnerCode: this.partnerCode,
            accessKey: this.accessKey,
            requestId: requestId,
            orderId: orderId,
            requestType: 'transactionStatus'
        };

        params.signature = await this.generateSignature(params);

        try {
            const response = await fetch(`${this.endpoint}/gw_payment/transactionProcessor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });

            const result = await response.json();

            return {
                success: result.errorCode === 0,
                status: this.mapMoMoStatus(result.errorCode),
                amount: result.amount,
                transId: result.transId,
                message: result.localMessage,
                raw: result
            };
        } catch (error) {
            console.error('MoMo Check Status Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Verify webhook signature from MoMo
     * @param {Object} data - Webhook data from MoMo
     * @returns {boolean} Is signature valid
     */
    async verifyWebhookSignature(data) {
        const signature = data.signature;
        delete data.signature;

        const expectedSignature = await this.generateSignature(data);
        return signature === expectedSignature;
    }

    /**
     * Map MoMo error codes to status
     * @param {number} errorCode
     * @returns {string} Status string
     */
    mapMoMoStatus(errorCode) {
        const statusMap = {
            0: 'SUCCESS',
            9000: 'PENDING',
            10: 'REJECTED',
            11: 'CANCELLED',
            12: 'REJECTED',
            default: 'FAILED'
        };
        return statusMap[errorCode] || statusMap.default;
    }

    /**
     * Generate simple personal QR link (fallback method)
     * MoMo Personal Payment Format:
     * - App deep link: momo://app?action=transfer&amount=X&note=Y&recipient=PHONE
     * - Web fallback: https://nhantien.momo.vn/PHONE (but requires login)
     * - QR Code: Use 2|99|PHONE||0|0|AMOUNT|NOTE|transfer_p2p
     * 
     * @param {Object} data
     * @returns {string} MoMo QR data string
     */
    generatePersonalQRLink(data) {
        const { phone, amount, note } = data;

        // MoMo QR Code Format (Version 2)
        // Format: 2|99|PHONE_NUMBER||0|0|AMOUNT|NOTE|transfer_p2p
        const qrData = `2|99|${phone}||0|0|${amount}|${note}|transfer_p2p`;

        console.log('📱 MoMo QR Data:', qrData);

        return qrData;
    }
}

// Export singleton instance
export const momoService = new MoMoService();
export default momoService;

<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Đóng Quỹ & Phạt</h2>
            </div>
            <div class="card-content">
                <!-- Stats Cards -->
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 2rem;">
                    <div class="stat-card stat-info">
                        <div class="stat-content">
                            <div class="stat-label">Quỹ Còn Phải Đóng</div>
                            <div class="stat-value">{{ formatCurrency(remainingFund) }}</div>
                        </div>
                    </div>
                    <div class="stat-card stat-warning">
                        <div class="stat-content">
                            <div class="stat-label">Phạt Còn Phải Đóng</div>
                            <div class="stat-value">{{ formatCurrency(remainingFines) }}</div>
                        </div>
                    </div>
                </div>

                <!-- Payment Actions -->
                <div class="payment-actions">
                    <button class="btn btn-primary" @click="openPaymentModal('fund')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        Đóng Quỹ Qua MoMo
                    </button>
                    <button class="btn btn-warning" @click="openPaymentModal('fine')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        Đóng Phạt Qua MoMo
                    </button>
                </div>

                <!-- Pending Transactions -->
                <div v-if="myPendingTransactions.length > 0" class="pending-section">
                    <h3 style="margin: 2rem 0 1rem;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin-right: 8px;">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Giao Dịch Chờ Phê Duyệt
                    </h3>
                    <div class="pending-transactions">
                        <div v-for="transaction in myPendingTransactions" :key="transaction.id" 
                             class="pending-card" :class="transaction.status">
                            <div class="pending-header">
                                <div class="pending-info">
                                    <div class="pending-type">
                                        {{ transaction.category === 'fund' ? '💰 Quỹ Tháng' : '⚠️ Tiền Phạt' }}
                                    </div>
                                    <div class="pending-date">{{ formatDateTime(transaction.createdAt) }}</div>
                                </div>
                                <div class="pending-amount">{{ formatCurrency(transaction.amount) }}</div>
                            </div>
                            <div class="pending-status">
                                <span class="status-badge" :class="transaction.status">
                                    <template v-if="transaction.status === 'pending'">
                                        ⏳ Chờ Admin phê duyệt
                                    </template>
                                    <template v-else-if="transaction.status === 'rejected'">
                                        ❌ Đã từ chối
                                    </template>
                                </span>
                            </div>
                            <div v-if="transaction.status === 'rejected' && transaction.rejectionReason" class="rejection-reason">
                                <strong>Lý do:</strong> {{ transaction.rejectionReason }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment History -->
                <div class="my-payments-history" v-if="myApprovedPayments.length > 0">
                    <h3 style="margin: 2rem 0 1rem;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin-right: 8px;">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Lịch Sử Đã Được Duyệt
                    </h3>
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Loại</th>
                                    <th>Số Tiền</th>
                                    <th>Ghi Chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="payment in myApprovedPayments" :key="payment.id">
                                    <td>{{ formatDate(payment.date) }}</td>
                                    <td>
                                        <span class="badge" :class="payment.category === 'fund' ? 'badge-info' : 'badge-warning'">
                                            {{ payment.category === 'fund' ? 'Quỹ' : 'Phạt' }}
                                        </span>
                                    </td>
                                    <td style="font-weight: 600;">{{ formatCurrency(payment.amount) }}</td>
                                    <td>{{ payment.description || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else-if="myPendingTransactions.length === 0" class="empty-state">
                    <div class="empty-icon">💳</div>
                    <h3>Chưa có giao dịch</h3>
                    <p>Hãy thanh toán quỹ hoặc phạt qua MoMo để bắt đầu</p>
                </div>
            </div>
        </div>

        <!-- MoMo Payment Modal -->
        <div class="modal" v-if="showMoMoModal" @click.self="closeMoMoModal" style="display: flex;">
            <div class="modal-content momo-modal">
                <div class="modal-header">
                    <h2>{{ paymentType === 'fund' ? 'Đóng Quỹ Qua MoMo' : 'Đóng Phạt Qua MoMo' }}</h2>
                    <button class="close-btn" @click="closeMoMoModal">×</button>
                </div>
                <div class="modal-body">
                    <!-- Step 1: Enter Amount -->
                    <div v-if="momoStep === 1">
                        <div class="form-group">
                            <label>Số Tiền Cần Đóng</label>
                            <input 
                                type="number" 
                                v-model.number="momoForm.amount" 
                                :placeholder="`Tối đa: ${formatCurrency(paymentType === 'fund' ? remainingFund : remainingFines)}`"
                                :max="paymentType === 'fund' ? remainingFund : remainingFines"
                                min="1000"
                                step="1000">
                            <small class="form-hint">
                                Số tiền còn phải đóng: {{ formatCurrency(paymentType === 'fund' ? remainingFund : remainingFines) }}
                            </small>
                        </div>
                        <div class="form-group">
                            <label>Ghi Chú (Tùy chọn)</label>
                            <textarea 
                                v-model="momoForm.note" 
                                rows="3" 
                                placeholder="Ví dụ: Đóng quỹ tháng 1/2026"></textarea>
                        </div>
                        <div class="form-actions">
                            <button class="btn btn-secondary" @click="closeMoMoModal">Hủy</button>
                            <button class="btn btn-primary" @click="generateMoMoQR" :disabled="!momoForm.amount || momoForm.amount <= 0">
                                Tạo Mã QR
                            </button>
                        </div>
                    </div>

                    <!-- Step 2: Show QR Code -->
                    <div v-else-if="momoStep === 2" class="qr-step">
                        <div class="qr-container">
                            <div v-if="momoPayment" class="qr-code">
                                <img :src="momoPayment.qrCodeUrl" alt="MoMo QR Code">
                            </div>
                            <div class="qr-info">
                                <div class="info-row">
                                    <span class="label">Số tiền:</span>
                                    <span class="value amount">{{ formatCurrency(momoForm.amount) }}</span>
                                </div>
                                <div class="info-row">
                                    <span class="label">Loại:</span>
                                    <span class="value">{{ paymentType === 'fund' ? 'Quỹ tháng' : 'Tiền phạt' }}</span>
                                </div>
                                <div class="info-row" v-if="settings.momoPhone">
                                    <span class="label">SĐT nhận:</span>
                                    <span class="value mono">{{ settings.momoPhone }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="qr-instructions">
                            <h4>📱 Hướng dẫn thanh toán:</h4>
                            <ol>
                                <li>Mở ứng dụng <strong>MoMo</strong> trên điện thoại</li>
                                <li>Chọn <strong>"Quét mã QR"</strong></li>
                                <li>Quét mã QR bên trên</li>
                                <li>Xác nhận thanh toán</li>
                                <li>Sau khi thanh toán thành công, nhấn nút <strong>"Đã Thanh Toán"</strong> bên dưới</li>
                            </ol>
                            <div class="warning-box">
                                ⚠️ <strong>Lưu ý:</strong> Giao dịch sẽ được gửi đến Admin để phê duyệt. Bạn sẽ nhận được thông báo khi giao dịch được duyệt.
                            </div>
                        </div>

                        <div class="form-actions">
                            <button class="btn btn-secondary" @click="momoStep = 1">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                                    <line x1="19" y1="12" x2="5" y2="12"></line>
                                    <polyline points="12 19 5 12 12 5"></polyline>
                                </svg>
                                Quay Lại
                            </button>
                            <button class="btn btn-success" @click="confirmPayment">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Đã Thanh Toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import { useMoMo } from '../composables/useMoMo';

const { members, transactions, pendingTransactions, contributionTiers, matches, settings, getMemberName } = useAppState();
const { guestMemberId } = useAuth();
const { createPayment, isPersonalConfigured, error: momoError } = useMoMo();

const showMoMoModal = ref(false);
const momoStep = ref(1); // 1: Enter amount, 2: Show QR
const paymentType = ref('fund');
const momoPayment = ref(null);
const momoForm = reactive({
    amount: 0,
    note: ''
});

// Get current member
const currentMember = computed(() => {
    if (!guestMemberId.value) return null;
    return members.value.find(m => m.id === guestMemberId.value);
});

// Get my pending transactions
const myPendingTransactions = computed(() => {
    if (!guestMemberId.value) return [];
    return pendingTransactions.value
        .filter(t => t.memberId === guestMemberId.value && (t.status === 'pending' || t.status === 'rejected'))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

// Get my approved payments (from main transactions)
const myApprovedPayments = computed(() => {
    if (!guestMemberId.value) return [];
    return transactions.value
        .filter(t => t.memberId === guestMemberId.value && (t.category === 'fund' || t.category === 'fine'))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
});

// Calculate remaining fund to pay
const remainingFund = computed(() => {
    if (!currentMember.value || !currentMember.value.contributionTierId) return 0;
    
    const tier = contributionTiers.value.find(t => t.id === currentMember.value.contributionTierId);
    if (!tier) return 0;
    
    // Calculate months since start of year
    const startDate = new Date('2026-01-01');
    const currentDate = new Date();
    const monthsDiff = Math.max(1, Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 30)));
    
    const totalRequired = tier.monthlyFee * monthsDiff;
    const totalPaid = currentMember.value.fundPaid || 0;
    
    return Math.max(0, totalRequired - totalPaid);
});

// Calculate remaining fines to pay
const remainingFines = computed(() => {
    if (!currentMember.value) return 0;
    
    let totalFinesRequired = 0;
    
    matches.value.forEach(match => {
        const attendance = match.attendance?.find(a => a.memberId === guestMemberId.value);
        if (attendance) {
            if (attendance.status === 'absent') {
                totalFinesRequired += 50000; // 50k for absent
            } else if (attendance.isLate) {
                totalFinesRequired += 20000; // 20k for late
            }
        }
    });
    
    const totalPaid = currentMember.value.fines || 0;
    return Math.max(0, totalFinesRequired - totalPaid);
});

// Methods
const openPaymentModal = (type) => {
    console.log('🔵 openPaymentModal called', { 
        type, 
        isPersonalConfigured: isPersonalConfigured.value,
        currentShowMoMoModal: showMoMoModal.value 
    });
    
    if (!isPersonalConfigured.value) {
        console.error('❌ MoMo not configured');
        alert('⚠️ Chưa cấu hình số điện thoại MoMo. Vui lòng liên hệ Admin.');
        return;
    }

    paymentType.value = type;
    const suggestedAmount = type === 'fund' ? remainingFund.value : remainingFines.value;
    momoForm.amount = suggestedAmount > 0 ? suggestedAmount : 10000; // Default 10k if no debt
    momoForm.note = '';
    momoStep.value = 1;
    showMoMoModal.value = true;
    
    console.log('✅ Modal state updated', { 
        type, 
        suggestedAmount, 
        actualAmount: momoForm.amount,
        remainingFund: remainingFund.value,
        remainingFines: remainingFines.value,
        showMoMoModal: showMoMoModal.value,
        momoStep: momoStep.value
    });
    
    // Double check after a tick
    setTimeout(() => {
        console.log('🔍 After tick check:', {
            showMoMoModal: showMoMoModal.value,
            momoStep: momoStep.value,
            momoFormAmount: momoForm.amount
        });
    }, 100);
};

const closeMoMoModal = () => {
    showMoMoModal.value = false;
    momoStep.value = 1;
    momoPayment.value = null;
    momoForm.amount = 0;
    momoForm.note = '';
};

const generateMoMoQR = async () => {
    console.log('🔵 generateMoMoQR called', {
        amount: momoForm.amount,
        paymentType: paymentType.value,
        guestMemberId: guestMemberId.value
    });
    
    if (!momoForm.amount || momoForm.amount <= 0) {
        alert('Vui lòng nhập số tiền hợp lệ');
        return;
    }

    // Remove maxAmount validation - allow prepayment
    // const maxAmount = paymentType.value === 'fund' ? remainingFund.value : remainingFines.value;
    // if (maxAmount > 0 && momoForm.amount > maxAmount) {
    //     alert(`Số tiền không được vượt quá ${formatCurrency(maxAmount)}`);
    //     return;
    // }

    try {
        console.log('🔄 Creating payment...');
        const payment = await createPayment({
            memberId: guestMemberId.value,
            memberName: getMemberName(guestMemberId.value),
            amount: momoForm.amount,
            category: paymentType.value
        });

        if (payment) {
            momoPayment.value = payment;
            momoStep.value = 2;
            console.log('✅ QR Code generated', payment);
        } else {
            console.error('❌ Payment creation failed - returned null');
            alert('❌ Không thể tạo mã QR. Vui lòng thử lại.');
        }
    } catch (err) {
        console.error('❌ Generate QR error:', err);
        alert('❌ Có lỗi xảy ra: ' + (momoError.value || err.message));
    }
};

const confirmPayment = async () => {
    if (!confirm('Bạn đã hoàn tất thanh toán qua MoMo?')) return;

    try {
        const { manuallyConfirmPayment } = useMoMo();
        
        const success = await manuallyConfirmPayment({
            memberId: guestMemberId.value,
            memberName: getMemberName(guestMemberId.value),
            amount: momoForm.amount,
            category: paymentType.value,
            note: momoForm.note || `${paymentType.value === 'fund' ? 'Quỹ tháng' : 'Tiền phạt'} - MoMo`
        }, true); // isPending = true for member payments

        if (success) {
            alert('✅ Giao dịch đã được gửi!\n\n⏳ Đang chờ Admin phê duyệt. Bạn sẽ nhận được thông báo khi giao dịch được duyệt.');
            closeMoMoModal();
        } else {
            alert('❌ Có lỗi xảy ra khi tạo giao dịch');
        }
    } catch (err) {
        console.error('Confirm payment error:', err);
        alert('❌ Có lỗi xảy ra: ' + err.message);
    }
};

const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

const formatDate = (str) => {
    if (!str) return '';
    const d = new Date(str);
    return d.toLocaleDateString('vi-VN');
};

const formatDateTime = (str) => {
    if (!str) return '';
    const d = new Date(str);
    return d.toLocaleString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>

<style scoped>
.payment-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

.payment-actions .btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    flex: 1;
}

.payment-actions .btn svg {
    width: 20px;
    height: 20px;
}

.payment-actions .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Pending Transactions */
.pending-section {
    margin: var(--spacing-xl) 0;
}

.pending-transactions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.pending-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    transition: all var(--transition-normal);
}

.pending-card.pending {
    border-left: 4px solid var(--warning-500);
}

.pending-card.rejected {
    border-left: 4px solid var(--danger-500);
    opacity: 0.8;
}

.pending-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.pending-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.pending-type {
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--text-primary);
}

.pending-date {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.pending-amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--success-500);
}

.pending-status {
    margin-top: var(--spacing-sm);
}

.status-badge {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
}

.status-badge.pending {
    background: rgba(251, 191, 36, 0.1);
    color: var(--warning-500);
}

.status-badge.rejected {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger-500);
}

.rejection-reason {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(239, 68, 68, 0.05);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    color: var(--danger-500);
}

/* MoMo Modal */
.momo-modal {
    max-width: 600px;
}

.qr-step {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.qr-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
}

.qr-code {
    background: white;
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
}

.qr-code img {
    display: block;
    width: 250px;
    height: 250px;
}

.qr-info {
    width: 100%;
    background: rgba(var(--primary-500-rgb), 0.05);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
}

.info-row {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--border-color);
}

.info-row:last-child {
    border-bottom: none;
}

.info-row .label {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.info-row .value {
    color: var(--text-primary);
    font-weight: 600;
}

.info-row .value.amount {
    color: var(--success-500);
    font-size: 1.25rem;
}

.info-row .value.mono {
    font-family: 'Courier New', monospace;
}

.qr-instructions {
    background: rgba(var(--primary-500-rgb), 0.03);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
}

.qr-instructions h4 {
    margin: 0 0 var(--spacing-md) 0;
    color: var(--text-primary);
}

.qr-instructions ol {
    margin: 0;
    padding-left: var(--spacing-xl);
}

.qr-instructions li {
    margin: var(--spacing-sm) 0;
    color: var(--text-secondary);
}

.warning-box {
    margin-top: var(--spacing-lg);
    padding: var(--spacing-md);
    background: rgba(251, 191, 36, 0.1);
    border-left: 4px solid var(--warning-500);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    color: var(--text-primary);
}

.form-hint {
    display: block;
    margin-top: var(--spacing-xs);
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-md);
}

@media (max-width: 768px) {
    .payment-actions {
        flex-direction: column;
    }

    .payment-actions .btn {
        width: 100%;
    }

    .pending-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
    }

    .qr-code img {
        width: 200px;
        height: 200px;
    }
}
</style>

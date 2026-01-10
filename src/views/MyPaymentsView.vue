<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Đóng Quỹ & Phạt</h2>
            </div>
            <div class="card-content">
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 2rem;">
                    <div class="stat-card stat-info">
                        <div class="stat-content">
                            <div class="stat-label">Quỹ Đã Đóng</div>
                            <div class="stat-value">{{ formatCurrency(myStats.fundPaid) }}</div>
                        </div>
                    </div>
                    <div class="stat-card stat-warning">
                        <div class="stat-content">
                            <div class="stat-label">Phạt Đã Đóng</div>
                            <div class="stat-value">{{ formatCurrency(myStats.fines) }}</div>
                        </div>
                    </div>
                </div>

                <div class="payment-actions">
                    <button class="btn btn-primary" @click="openPaymentModal('fund')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Đóng Quỹ
                    </button>
                    <button class="btn btn-warning" @click="openPaymentModal('fine')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        Đóng Phạt
                    </button>
                </div>

                <div class="my-payments-history" v-if="myPayments.length > 0">
                    <h3 style="margin: 2rem 0 1rem;">Lịch Sử Đóng Tiền</h3>
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
                                <tr v-for="payment in myPayments" :key="payment.id">
                                    <td>{{ formatDate(payment.date) }}</td>
                                    <td>
                                        <span class="badge" :class="payment.type === 'fund' ? 'badge-info' : 'badge-warning'">
                                            {{ payment.type === 'fund' ? 'Quỹ' : 'Phạt' }}
                                        </span>
                                    </td>
                                    <td style="font-weight: 600;">{{ formatCurrency(payment.amount) }}</td>
                                    <td>{{ payment.note || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <p>Chưa có lịch sử đóng tiền</p>
                </div>
            </div>
        </div>

        <!-- Payment Modal -->
        <div class="modal" v-if="showModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ paymentType === 'fund' ? 'Đóng Quỹ' : 'Đóng Phạt' }}</h2>
                    <button class="modal-close" @click="closeModal">x</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Số Tiền</label>
                        <input type="number" v-model.number="form.amount" placeholder="Nhập số tiền" min="0">
                    </div>
                    <div class="form-group">
                        <label>Ghi Chú</label>
                        <textarea v-model="form.note" rows="3" placeholder="Ghi chú (tùy chọn)"></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary" @click="submitPayment">Xác Nhận</button>
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

const { members, transactions, addTransaction } = useAppState();
const { guestMemberId } = useAuth();

const showModal = ref(false);
const paymentType = ref('fund');
const form = reactive({
    amount: 0,
    note: ''
});

// Get current member stats
const myStats = computed(() => {
    if (!guestMemberId.value) return { fundPaid: 0, fines: 0 };
    const member = members.value.find(m => m.id === guestMemberId.value);
    return member || { fundPaid: 0, fines: 0 };
});

// Get my payment history
const myPayments = computed(() => {
    if (!guestMemberId.value) return [];
    return transactions.value
        .filter(t => t.memberId === guestMemberId.value && (t.category === 'fund' || t.category === 'fine'))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
});

const openPaymentModal = (type) => {
    paymentType.value = type;
    form.amount = 0;
    form.note = '';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const submitPayment = () => {
    if (!form.amount || form.amount <= 0) {
        alert('Vui lòng nhập số tiền hợp lệ');
        return;
    }

    if (!guestMemberId.value) {
        alert('Không tìm thấy thông tin thành viên');
        return;
    }

    // Add transaction
    addTransaction({
        type: 'expense',
        category: paymentType.value,
        amount: form.amount,
        description: form.note || (paymentType.value === 'fund' ? 'Đóng quỹ' : 'Đóng phạt'),
        date: new Date().toISOString().split('T')[0],
        memberId: guestMemberId.value
    });

    // Update member stats
    const member = members.value.find(m => m.id === guestMemberId.value);
    if (member) {
        if (paymentType.value === 'fund') {
            member.fundPaid = (member.fundPaid || 0) + form.amount;
        } else {
            member.fines = (member.fines || 0) + form.amount;
        }
    }

    alert(`✅ Đã ${paymentType.value === 'fund' ? 'đóng quỹ' : 'đóng phạt'} thành công!`);
    closeModal();
};

const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
const formatDate = (str) => {
    if (!str) return '';
    const d = new Date(str);
    return d.toLocaleDateString('vi-VN');
};
</script>

<style scoped>
.payment-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
    .payment-actions {
        flex-direction: column;
    }

    .payment-actions .btn {
        width: 100%;
    }
}
</style>

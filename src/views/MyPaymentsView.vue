<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Đóng Quỹ & Phạt</h2>
            </div>
            <div class="card-content">
                <!-- Balance Statistics -->
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-bottom: 2rem;">
                    <div class="stat-card stat-info">
                        <div class="stat-content">
                            <div class="stat-label">Các Khoản Nợ ({{ unpaidReceivables.length }})</div>
                            <div class="stat-value text-danger">{{ formatCurrency(totalDebt) }}</div>
                        </div>
                    </div>
                    <div class="stat-card stat-success">
                        <div class="stat-content">
                            <div class="stat-label">Tổng Đã Đóng</div>
                            <div class="stat-value text-success">{{ formatCurrency(totalPaid) }}</div>
                        </div>
                    </div>
                </div>

                <!-- Detailed Debt Ledger -->
                <div v-if="unpaidReceivables.length > 0" class="debt-ledger-section" style="margin-bottom: 2.5rem;">
                    <h3 style="margin-bottom: 1rem; color: var(--warning-400);">📝 Chi Tiết Các Khoản Nợ</h3>
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Ngày phát sinh</th>
                                    <th>Nội dung</th>
                                    <th class="text-right">Số tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="r in unpaidReceivables" :key="r.id">
                                    <td>{{ formatDate(r.date) }}</td>
                                    <td>
                                        <span class="type-tag" :class="r.type">{{ r.type === 'fine' ? 'Phạt' : (r.type === 'fund' ? 'Quỹ' : 'Khác') }}</span>
                                        {{ r.description }}
                                    </td>
                                    <td class="text-right font-bold text-danger">{{ formatCurrency(r.amount) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" class="text-right"><strong>TỔNG CỘNG:</strong></td>
                                    <td class="text-right font-bold text-danger" style="font-size: 1.2rem;">{{ formatCurrency(totalDebt) }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <!-- QR Payment Section -->
                <div v-if="settings.fundQR" class="payment-qr-section">
                    <h3>📲 Thanh Toán Chuyển Khoản</h3>
                    <div class="qr-display-container">
                        <div class="qr-image" v-html="settings.fundQR"></div>
                        <div class="qr-guide">
                            <p>Quét mã QR bên cạnh để thực hiện chuyển khoản đóng quỹ/phạt nhanh chóng.</p>
                            <ul>
                                <li>Nội dung: <strong>{{ currentMember?.name }} thanh toan</strong></li>
                                <li>Số tiền: <strong>{{ formatCurrency(totalDebt) }}</strong></li>
                                <li>Sau khi chuyển, hãy tải ảnh minh chứng bên dưới.</li>
                            </ul>
                            <button v-if="settings.momoLink" @click="openMoMo" class="btn-momo-full">
                                <img src="../assets/momo-logo.png" alt="MoMo">
                                <span>Đóng Quỹ/Phạt Qua MoMo</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Confirmation Form -->
                <div class="payment-confirmation-section" style="margin-top: 2rem;">
                    <div class="card" style="border: 2px dashed rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.02);">
                        <div class="card-header" style="border-bottom: 1px solid rgba(59, 130, 246, 0.1);">
                            <h3 style="margin: 0; color: var(--primary-400);">✍️ Xác Nhận Đã Chuyển Khoản</h3>
                        </div>
                        <div class="card-content">
                            <div class="form-grid-custom" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                                <div class="form-group">
                                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">Loại thanh toán</label>
                                    <BaseSelect 
                                        v-model="form.category"
                                        :options="categoryOptions"
                                    />
                                </div>
                                <div class="form-group">
                                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">Số tiền đã chuyển (VNĐ)</label>
                                    <input type="number" v-model="form.amount" placeholder="Ví dụ: 100000" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); background: var(--bg-tertiary); border: 1px solid var(--border-primary); color: var(--text-primary);">
                                </div>
                                <div class="form-group" style="grid-column: 1 / -1;">
                                    <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem;">Ghi chú (Tùy chọn)</label>
                                    <input type="text" v-model="form.description" placeholder="Ví dụ: Đóng quỹ tháng 2" style="width: 100%; padding: 0.75rem; border-radius: var(--radius-md); background: var(--bg-tertiary); border: 1px solid var(--border-primary); color: var(--text-primary);">
                                </div>
                            </div>
                            <button @click="submitConfirmation" class="btn btn-primary" style="width: 100%; padding: 1rem; font-weight: 700; text-transform: uppercase;">
                                🚀 Gửi Yêu Cầu Xác Nhận
                            </button>
                            <p style="text-align: center; font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.75rem;">
                                Sau khi gửi, thủ quỹ sẽ kiểm tra và duyệt giao dịch của bạn.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Pending/Rejected Section -->
                <div v-if="pendingRequests.length > 0" class="pending-section">
                    <h3 style="margin: 2.5rem 0 1rem; color: var(--warning-400); display: flex; align-items: center; gap: 0.5rem;">
                        <span class="pulse-dot"></span>
                        Yêu Cầu Đang Chờ Duyệt ({{ pendingRequests.length }})
                    </h3>
                    <div class="pending-transactions-grid">
                        <div v-for="req in pendingRequests" :key="req.id" class="pending-card" :class="req.status">
                            <div class="pending-header">
                                <span class="pending-type">{{ req.category === 'fund' ? 'Quỹ Tháng' : 'Tiền Phạt' }}</span>
                                <span class="pending-amount">{{ formatCurrency(req.amount) }}</span>
                            </div>
                            <div class="pending-body">
                                <p class="pending-desc">{{ req.description || 'Không có ghi chú' }}</p>
                                <p class="pending-date">Ngày gửi: {{ formatDateTime(req.date) }}</p>
                            </div>
                            <div class="pending-footer">
                                <div class="status-badge" :class="req.status">
                                    {{ req.status === 'pending' ? '⌛ Chờ duyệt' : '❌ Đã từ chối' }}
                                </div>
                                <div v-if="req.status === 'rejected'" class="rejection-reason">
                                    <strong>Lý do:</strong> {{ req.rejectionReason }}
                                </div>
                                <button v-if="req.status === 'rejected'" class="btn btn-sm btn-danger" @click="deletePending(req.id)">Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- History Section -->
                <div v-if="paymentHistory.length > 0" class="my-payments-history">
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
                                <tr v-for="tx in paymentHistory" :key="tx.id">
                                    <td>{{ formatDate(tx.date) }}</td>
                                    <td>
                                        <span class="badge" :class="tx.category === 'fund' ? 'badge-info' : 'badge-warning'">
                                            {{ tx.category === 'fund' ? 'Quỹ' : 'Phạt' }}
                                        </span>
                                    </td>
                                    <td style="font-weight: 600;">{{ formatCurrency(tx.amount) }}</td>
                                    <td>{{ tx.description || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else-if="pendingRequests.length === 0" class="empty-state">
                    <div class="empty-icon">💳</div>
                    <h3>Chưa có giao dịch thanh toán</h3>
                    <p>Liên hệ thủ quỹ để đóng quỹ hoặc tiền phạt bằng tiền mặt</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import { useFinancialCalculations } from '../composables/useFinancialCalculations';
import BaseSelect from '../components/BaseSelect.vue';

const { transactions, pendingTransactions, addPendingTransaction, deletePendingTransaction, settings, members, receivables } = useAppState();
const { guestMemberId } = useAuth();
const { getStatusText } = useFinancialCalculations();

const form = ref({ category: 'fund', amount: null, description: '' });
const categoryOptions = [
    { label: 'Đóng quỹ tháng', value: 'fund' },
    { label: 'Đóng tiền phạt', value: 'fine' }
];

const currentMember = computed(() => members.value.find(m => m.id === guestMemberId.value));

const paymentHistory = computed(() => {
    if (!guestMemberId.value) return [];
    return transactions.value
        .filter(t => t.memberId === guestMemberId.value && (t.category === 'fund' || t.category === 'fine'))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
});

const pendingRequests = computed(() => {
    if (!guestMemberId.value) return [];
    return pendingTransactions.value
        .filter(t => t.memberId === guestMemberId.value)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
});

const myReceivables = computed(() => {
    if (!guestMemberId.value) return [];
    return receivables.value.filter(r => r.memberId === guestMemberId.value);
});

const unpaidReceivables = computed(() => myReceivables.value.filter(r => r.status === 'unpaid').sort((a,b) => new Date(a.date) - new Date(b.date)));
const totalDebt = computed(() => unpaidReceivables.value.reduce((sum, r) => sum + r.amount, 0));
const totalPaid = computed(() => myReceivables.value.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0));

const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);
const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : '';
const formatDateTime = (ts) => ts ? new Date(ts).toLocaleString('vi-VN') : '';

const openMoMo = () => {
    if (settings.value.momoLink) window.open(settings.value.momoLink, '_blank');
    else alert('Chưa cấu hình link MoMo trong cài đặt!');
};

const submitConfirmation = async () => {
    if (!form.value.amount || form.value.amount <= 0) {
        alert('Vui lòng nhập số tiền hợp lệ!');
        return;
    }
    if (!guestMemberId.value) {
        alert('Lỗi: Không tìm thấy ID thành viên. Vui lòng đăng nhập lại!');
        return;
    }

    await addPendingTransaction({
        memberId: guestMemberId.value,
        category: form.value.category,
        amount: form.value.amount,
        description: form.value.description
    });

    form.value.amount = null;
    form.value.description = '';
    alert('✅ Đã gửi yêu cầu xác nhận. Vui lòng chờ thủ quỹ duyệt!');
};

const deletePending = async (id) => {
    if (confirm('Bạn có muốn xóa yêu cầu này?')) {
        await deletePendingTransaction(id);
    }
};
</script>

<style scoped>
.payment-qr-section { display: flex; flex-direction: column; gap: 1.5rem; background: var(--bg-tertiary); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-primary); margin-top: 2rem; }
.qr-display-container { display: flex; gap: 2rem; align-items: center; }
.qr-image { width: 220px; height: 220px; background: white; padding: 1rem; border-radius: var(--radius-lg); display: flex; justify-content: center; align-items: center; flex-shrink: 0; }
.qr-image :deep(img), .qr-image :deep(svg) { max-width: 100%; max-height: 100%; object-fit: contain; }
.qr-guide { flex: 1; display: flex; flex-direction: column; gap: 1rem; }
.qr-guide ul { list-style: none; padding: 0; }
.qr-guide li { margin-bottom: 0.5rem; color: var(--text-secondary); }
.btn-momo-full { background: #ae2070; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: var(--radius-md); font-weight: 700; display: flex; align-items: center; gap: 0.75rem; cursor: pointer; transition: all 0.2s; }
.btn-momo-full img { width: 24px; height: 24px; border-radius: 4px; }

@media (max-width: 768px) {
    .qr-display-container { flex-direction: column; align-items: center; text-align: center; }
    .qr-guide ul { text-align: left; }
}

.pending-transactions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
.pending-card { background: var(--bg-secondary); border: 1px solid var(--border-primary); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; position: relative; }
.pending-card.pending { border-left: 4px solid var(--warning-500); }
.pending-card.rejected { border-left: 4px solid var(--danger-500); }
.pending-header { display: flex; justify-content: space-between; align-items: center; }
.pending-type { font-weight: 700; color: var(--primary-400); }
.pending-amount { font-weight: 700; font-size: 1.1rem; }
.pending-desc { font-size: 0.9rem; color: var(--text-primary); }
.pending-date { font-size: 0.75rem; color: var(--text-muted); }
.status-badge { font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 4px; display: inline-block; }
.status-badge.pending { background: rgba(245, 158, 11, 0.1); color: var(--warning-400); }
.status-badge.rejected { background: rgba(239, 68, 68, 0.1); color: var(--danger-400); }
.rejection-reason { font-size: 0.8rem; color: var(--danger-400); padding: 0.5rem; background: rgba(239, 68, 68, 0.05); border-radius: 4px; border: 1px dashed var(--danger-500); }
.btn-clear { align-self: flex-end; font-size: 0.75rem; color: var(--text-muted); background: transparent; border: 1px solid var(--border-primary); padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer; }

.pulse-dot { width: 8px; height: 8px; background: var(--warning-500); border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }
@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

.type-tag { font-size: 0.7rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; margin-right: 6px; border: 1px solid currentColor; }
.type-tag.fine { color: var(--danger-400); background: rgba(239, 68, 68, 0.1); }
.type-tag.fund { color: var(--primary-400); background: rgba(59, 130, 246, 0.1); }
.type-tag.pitch_fee { color: var(--success-400); background: rgba(16, 185, 129, 0.1); }
</style>

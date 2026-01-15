<template>
    <div class="view-container">
        <div class="view-header">
            <h1>Phê Duyệt Giao Dịch</h1>
            <p class="subtitle">Quản lý các giao dịch MoMo chờ phê duyệt từ thành viên</p>
        </div>

        <!-- Statistics Cards -->
        <div class="stats-grid">
            <div class="stat-card pending">
                <div class="stat-icon">⏳</div>
                <div class="stat-content">
                    <div class="stat-value">{{ pendingCount }}</div>
                    <div class="stat-label">Chờ duyệt</div>
                </div>
            </div>
            <div class="stat-card approved">
                <div class="stat-icon">✅</div>
                <div class="stat-content">
                    <div class="stat-value">{{ approvedCount }}</div>
                    <div class="stat-label">Đã duyệt hôm nay</div>
                </div>
            </div>
            <div class="stat-card rejected">
                <div class="stat-icon">❌</div>
                <div class="stat-content">
                    <div class="stat-value">{{ rejectedCount }}</div>
                    <div class="stat-label">Đã từ chối</div>
                </div>
            </div>
            <div class="stat-card total">
                <div class="stat-icon">💰</div>
                <div class="stat-content">
                    <div class="stat-value">{{ formatCurrency(pendingAmount) }}</div>
                    <div class="stat-label">Tổng chờ duyệt</div>
                </div>
            </div>
        </div>

        <!-- Filter Tabs -->
        <div class="tabs">
            <button 
                class="tab" 
                :class="{ active: currentTab === 'pending' }"
                @click="currentTab = 'pending'">
                Chờ Duyệt ({{ pendingCount }})
            </button>
            <button 
                class="tab" 
                :class="{ active: currentTab === 'rejected' }"
                @click="currentTab = 'rejected'">
                Đã Từ Chối ({{ rejectedCount }})
            </button>
        </div>

        <!-- Pending Transactions List -->
        <div class="transactions-list" v-if="filteredTransactions.length > 0">
            <div 
                v-for="transaction in filteredTransactions" 
                :key="transaction.id"
                class="transaction-card"
                :class="transaction.status">
                <div class="transaction-header">
                    <div class="transaction-member">
                        <div class="member-avatar">
                            {{ getMemberInitials(transaction.memberId) }}
                        </div>
                        <div class="member-info">
                            <div class="member-name">{{ getMemberName(transaction.memberId) }}</div>
                            <div class="transaction-date">{{ formatDate(transaction.createdAt) }}</div>
                        </div>
                    </div>
                    <div class="transaction-amount">
                        <div class="amount">{{ formatCurrency(transaction.amount) }}</div>
                        <div class="category-badge" :class="transaction.category">
                            {{ transaction.category === 'fund' ? '💰 Quỹ' : '⚠️ Phạt' }}
                        </div>
                    </div>
                </div>

                <div class="transaction-details">
                    <div class="detail-row">
                        <span class="label">Mô tả:</span>
                        <span class="value">{{ transaction.description }}</span>
                    </div>
                    <div class="detail-row" v-if="transaction.momoTransId">
                        <span class="label">Mã GD MoMo:</span>
                        <span class="value mono">{{ transaction.momoTransId }}</span>
                    </div>
                    <div class="detail-row" v-if="transaction.status === 'rejected'">
                        <span class="label">Lý do từ chối:</span>
                        <span class="value error">{{ transaction.rejectionReason || 'Không rõ' }}</span>
                    </div>
                </div>

                <div class="transaction-actions" v-if="transaction.status === 'pending'">
                    <button class="btn btn-success" @click="approveTransaction(transaction.id)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Phê Duyệt
                    </button>
                    <button class="btn btn-danger" @click="showRejectModal(transaction)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Từ Chối
                    </button>
                </div>

                <div class="transaction-actions" v-else-if="transaction.status === 'rejected'">
                    <button class="btn btn-secondary" @click="deleteTransaction(transaction.id)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Xóa
                    </button>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" v-else>
            <div class="empty-icon">📭</div>
            <h3>{{ currentTab === 'pending' ? 'Không có giao dịch chờ duyệt' : 'Không có giao dịch bị từ chối' }}</h3>
            <p>{{ currentTab === 'pending' ? 'Tất cả giao dịch đã được xử lý' : 'Chưa có giao dịch nào bị từ chối' }}</p>
        </div>

        <!-- Reject Modal -->
        <div class="modal" v-if="rejectModal.show" @click.self="closeRejectModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Từ Chối Giao Dịch</h2>
                    <button class="close-btn" @click="closeRejectModal">×</button>
                </div>
                <div class="modal-body">
                    <p>Bạn có chắc chắn muốn từ chối giao dịch này?</p>
                    <div class="transaction-summary">
                        <div><strong>Thành viên:</strong> {{ getMemberName(rejectModal.transaction?.memberId) }}</div>
                        <div><strong>Số tiền:</strong> {{ formatCurrency(rejectModal.transaction?.amount) }}</div>
                        <div><strong>Loại:</strong> {{ rejectModal.transaction?.category === 'fund' ? 'Quỹ tháng' : 'Tiền phạt' }}</div>
                    </div>
                    <div class="form-group">
                        <label>Lý do từ chối (tùy chọn):</label>
                        <textarea 
                            v-model="rejectModal.reason" 
                            placeholder="Nhập lý do từ chối..."
                            rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="closeRejectModal">Hủy</button>
                    <button class="btn btn-danger" @click="confirmReject">Xác Nhận Từ Chối</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppState } from '../composables/useAppState';

const { 
    pendingTransactions, 
    getMemberName, 
    approvePendingTransaction, 
    rejectPendingTransaction,
    deletePendingTransaction 
} = useAppState();

const currentTab = ref('pending');
const rejectModal = ref({
    show: false,
    transaction: null,
    reason: ''
});

// Computed
const filteredTransactions = computed(() => {
    return pendingTransactions.value
        .filter(t => t.status === currentTab.value)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const pendingCount = computed(() => {
    return pendingTransactions.value.filter(t => t.status === 'pending').length;
});

const rejectedCount = computed(() => {
    return pendingTransactions.value.filter(t => t.status === 'rejected').length;
});

const approvedCount = computed(() => {
    // Count transactions approved today
    const today = new Date().toISOString().split('T')[0];
    return pendingTransactions.value.filter(t => 
        t.status === 'approved' && 
        t.approvedAt && 
        t.approvedAt.startsWith(today)
    ).length;
});

const pendingAmount = computed(() => {
    return pendingTransactions.value
        .filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0);
});

// Methods
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(amount);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getMemberInitials = (memberId) => {
    const name = getMemberName(memberId);
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length >= 2) {
        return words[words.length - 2][0] + words[words.length - 1][0];
    }
    return name.substring(0, 2).toUpperCase();
};

const approveTransaction = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn phê duyệt giao dịch này?')) return;
    
    const success = approvePendingTransaction(id);
    if (success) {
        alert('✅ Đã phê duyệt giao dịch thành công!');
    } else {
        alert('❌ Có lỗi xảy ra khi phê duyệt giao dịch');
    }
};

const showRejectModal = (transaction) => {
    rejectModal.value = {
        show: true,
        transaction,
        reason: ''
    };
};

const closeRejectModal = () => {
    rejectModal.value = {
        show: false,
        transaction: null,
        reason: ''
    };
};

const confirmReject = () => {
    const success = rejectPendingTransaction(
        rejectModal.value.transaction.id, 
        rejectModal.value.reason
    );
    
    if (success) {
        alert('✅ Đã từ chối giao dịch');
        closeRejectModal();
    } else {
        alert('❌ Có lỗi xảy ra');
    }
};

const deleteTransaction = (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) return;
    
    deletePendingTransaction(id);
    alert('✅ Đã xóa giao dịch');
};
</script>

<style scoped>
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}

.stat-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    transition: all var(--transition-normal);
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.stat-card.pending {
    border-left: 4px solid var(--warning-500);
}

.stat-card.approved {
    border-left: 4px solid var(--success-500);
}

.stat-card.rejected {
    border-left: 4px solid var(--danger-500);
}

.stat-card.total {
    border-left: 4px solid var(--primary-500);
}

.stat-icon {
    font-size: 2rem;
}

.stat-content {
    flex: 1;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
}

.stat-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.tabs {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
    border-bottom: 2px solid var(--border-color);
}

.tab {
    padding: var(--spacing-md) var(--spacing-lg);
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--text-secondary);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    margin-bottom: -2px;
}

.tab:hover {
    color: var(--text-primary);
    background: rgba(var(--primary-500-rgb), 0.05);
}

.tab.active {
    color: var(--primary-500);
    border-bottom-color: var(--primary-500);
}

.transactions-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.transaction-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    transition: all var(--transition-normal);
}

.transaction-card:hover {
    box-shadow: var(--shadow-lg);
}

.transaction-card.pending {
    border-left: 4px solid var(--warning-500);
}

.transaction-card.rejected {
    border-left: 4px solid var(--danger-500);
    opacity: 0.8;
}

.transaction-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.transaction-member {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.member-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.125rem;
}

.member-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.member-name {
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--text-primary);
}

.transaction-date {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.transaction-amount {
    text-align: right;
}

.amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--success-500);
    margin-bottom: var(--spacing-xs);
}

.category-badge {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
}

.category-badge.fund {
    background: rgba(34, 197, 94, 0.1);
    color: var(--success-500);
}

.category-badge.fine {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger-500);
}

.transaction-details {
    background: rgba(var(--primary-500-rgb), 0.03);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.detail-row {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-xs) 0;
}

.detail-row .label {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.detail-row .value {
    color: var(--text-primary);
    font-weight: 500;
}

.detail-row .value.mono {
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
}

.detail-row .value.error {
    color: var(--danger-500);
}

.transaction-actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: flex-end;
}

.transaction-actions .btn {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.transaction-actions .btn svg {
    width: 16px;
    height: 16px;
}

.transaction-summary {
    background: rgba(var(--primary-500-rgb), 0.05);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    margin: var(--spacing-md) 0;
}

.transaction-summary > div {
    padding: var(--spacing-xs) 0;
}

@media (max-width: 768px) {
    .transaction-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-md);
    }

    .transaction-amount {
        text-align: left;
        width: 100%;
    }

    .transaction-actions {
        flex-direction: column;
    }

    .transaction-actions .btn {
        width: 100%;
        justify-content: center;
    }
}
</style>

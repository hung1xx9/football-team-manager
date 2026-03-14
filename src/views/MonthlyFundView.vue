<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h1>💵 Quỹ Hàng Tháng</h1>
                <p class="card-subtitle">Theo dõi đóng quỹ hàng tháng của các thành viên</p>
            </div>
            <div class="card-content">
                <!-- Month Picker -->
                <div class="picker-group">
                    <label>Chọn tháng</label>
                    <input type="month" v-model="selectedMonth" class="form-control month-picker" />
                </div>

                <!-- Summary Stats -->
                <div class="stats-grid">
                    <div class="stat-card stat-success">
                        <div class="stat-content">
                            <div class="stat-label">Đã Thu</div>
                            <div class="stat-value">{{ formatCurrency(summary.collected) }}</div>
                        </div>
                    </div>
                    <div class="stat-card stat-warning">
                        <div class="stat-content">
                            <div class="stat-label">Còn Thiếu</div>
                            <div class="stat-value">{{ formatCurrency(summary.missing) }}</div>
                        </div>
                    </div>
                    <div class="stat-card stat-info">
                        <div class="stat-content">
                            <div class="stat-label">Quỹ Dự Kiến/Tháng</div>
                            <div class="stat-value">{{ formatCurrency(summary.expected) }}</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-content">
                            <div class="stat-label">Còn thiếu (đến tháng {{ currentMonthLabel }})</div>
                            <div class="stat-value">{{ formatCurrency(summary.totalDebt) }}</div>
                        </div>
                    </div>
                </div>

                <!-- Payment Progress -->
                <div class="progress-section">
                    <div class="progress-header">
                        <span>Tiến độ thu quỹ tháng {{ selectedMonthLabel }}</span>
                        <span class="progress-percent">{{ summary.percent }}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" :style="{ width: summary.percent + '%' }"></div>
                    </div>
                </div>

                <!-- Member List -->
                <div class="card" style="margin-top: var(--spacing-lg);">
                    <div class="card-header">
                        <h3>📋 Tình Trạng Đóng Quỹ</h3>
                        <div class="card-actions">
                            <span class="summary-badge success">✔ Đã đóng: {{ summary.paidCount }}</span>
                            <span class="summary-badge danger">✘ Chưa đóng: {{ summary.unpaidCount }}</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="table-container">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thành Viên</th>
                                        <th class="text-center">Bậc Đóng Góp</th>
                                        <th class="text-center">Phải Đóng</th>
                                        <th class="text-center">Đã Đóng</th>
                                        <th class="text-center">Còn Thiếu</th>
                                        <th class="text-center">Trạng Thái</th>
                                        <th v-if="isAdmin">Thao Tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(ms, idx) in memberFundStats"
                                        :key="ms.id"
                                        :class="{ 'row-paid': ms.missing <= 0 }">
                                        <td class="text-center">{{ idx + 1 }}</td>
                                        <td class="font-medium">{{ ms.name }}</td>
                                        <td class="text-center">
                                            <span class="tier-badge">{{ ms.tierName }}</span>
                                        </td>
                                        <td class="text-center">{{ formatCurrency(ms.required) }}</td>
                                        <td class="text-center text-success">{{ formatCurrency(ms.paid) }}</td>
                                        <td class="text-center" :class="{ 'text-danger': ms.missing > 0 }">
                                            {{ ms.missing > 0 ? formatCurrency(ms.missing) : '—' }}
                                        </td>
                                        <td class="text-center">
                                            <span class="badge" :class="ms.missing <= 0 ? 'badge-success' : 'badge-warning'">
                                                {{ ms.missing <= 0 ? '✔ Đủ' : '⚠ Thiếu' }}
                                            </span>
                                        </td>
                                        <td v-if="isAdmin">
                                            <button
                                                v-if="ms.missing > 0"
                                                class="btn btn-sm btn-primary"
                                                @click="openPayModal(ms)"
                                            >
                                                💳 Thu quỹ
                                            </button>
                                            <span v-else class="text-success text-sm">✔ Hoàn thành</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pay Modal -->
        <div class="modal" v-if="showPayModal" style="display: flex;">
            <div class="modal-content" style="max-width: 420px;">
                <div class="modal-header">
                    <h2>💳 Thu Quỹ Tháng</h2>
                    <button class="modal-close" @click="showPayModal = false">×</button>
                </div>
                <div class="modal-body">
                    <p>Thu quỹ từ <strong>{{ payTarget?.name }}</strong> tháng <strong>{{ selectedMonthLabel }}</strong></p>
                    <div class="info-box">
                        <div class="info-row">
                            <span>Phải đóng:</span>
                            <strong>{{ formatCurrency(payTarget?.required) }}</strong>
                        </div>
                        <div class="info-row">
                            <span>Đã đóng:</span>
                            <strong class="text-success">{{ formatCurrency(payTarget?.paid) }}</strong>
                        </div>
                        <div class="info-row">
                            <span>Còn thiếu:</span>
                            <strong class="text-danger">{{ formatCurrency(payTarget?.missing) }}</strong>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top: 1rem;">
                        <label>Số tiền thu</label>
                        <input type="number" v-model.number="payForm.amount" step="10000" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="showPayModal = false">Hủy</button>
                    <button class="btn btn-success" @click="confirmPay">✔ Xác Nhận</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useAppState } from '../composables/useAppState';

const { members, transactions, contributionTiers, settings, addTransaction } = useAppState();

const isAdmin = computed(() => {
    const role = settings.value?.currentRole;
    return role === 'admin' || role === 'treasurer';
});

const now = new Date();
const selectedMonth = ref(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
const showPayModal = ref(false);
const payTarget = ref(null);
const payForm = reactive({ amount: 0 });

const selectedMonthLabel = computed(() => {
    const [y, m] = selectedMonth.value.split('-');
    return `${m}/${y}`;
});

const currentMonthLabel = computed(() => {
    return `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
});

// Get fund paid for a member in a specific month
const getMemberMonthlyPaid = (memberId, month) => {
    return (transactions.value || []).filter(t =>
        t.memberId === memberId &&
        t.category === 'fund' &&
        t.type === 'income' &&
        t.date?.startsWith(month)
    ).reduce((sum, t) => sum + (t.amount || 0), 0);
};

// Count months from Jan 2026 to selected month for total debt calc
const monthsToSelected = computed(() => {
    const [y, m] = selectedMonth.value.split('-').map(Number);
    const start = new Date(2026, 0, 1);
    const end = new Date(y, m - 1, 1);
    let months = 0;
    let cur = new Date(start);
    while (cur <= end) {
        months++;
        cur.setMonth(cur.getMonth() + 1);
    }
    return months;
});

const memberFundStats = computed(() => {
    return (members.value || []).map(member => {
        const tier = (contributionTiers.value || []).find(t => t.id === member.contributionTierId);
        const monthlyFee = tier?.monthlyFee || 0;
        const required = monthlyFee; // For selected month only
        const paid = getMemberMonthlyPaid(member.id, selectedMonth.value);
        const missing = Math.max(0, required - paid);

        // Total debt across all months
        const totalPaid = member.fundPaid || 0;
        const totalRequired = monthlyFee * monthsToSelected.value;
        const totalDebt = Math.max(0, totalRequired - totalPaid);

        return {
            id: member.id,
            name: member.name,
            tierName: tier?.name || 'Không xác định',
            required,
            paid,
            missing,
            totalDebt
        };
    }).sort((a, b) => b.missing - a.missing);
});

const summary = computed(() => {
    const stats = memberFundStats.value;
    const expected = stats.reduce((s, m) => s + m.required, 0);
    const collected = stats.reduce((s, m) => s + m.paid, 0);
    const missing = stats.reduce((s, m) => s + m.missing, 0);
    const totalDebt = stats.reduce((s, m) => s + m.totalDebt, 0);
    const paidCount = stats.filter(m => m.missing <= 0 && m.required > 0).length;
    const unpaidCount = stats.filter(m => m.missing > 0).length;
    const percent = expected > 0 ? Math.min(100, Math.round((collected / expected) * 100)) : 0;
    return { expected, collected, missing, totalDebt, paidCount, unpaidCount, percent };
});

const openPayModal = (ms) => {
    payTarget.value = ms;
    payForm.amount = ms.missing;
    showPayModal.value = true;
};

const confirmPay = () => {
    if (!payTarget.value) return;
    addTransaction({
        type: 'income',
        category: 'fund',
        amount: payForm.amount,
        description: `${payTarget.value.name} đóng quỹ tháng ${selectedMonthLabel.value}`,
        date: `${selectedMonth.value}-01`,
        memberId: payTarget.value.id
    });
    showPayModal.value = false;
};

const formatCurrency = (val) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);
</script>

<style scoped>
.card-subtitle {
    color: var(--text-muted);
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.month-picker {
    max-width: 200px;
}

.progress-section {
    margin: 1.5rem 0;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
    font-weight: 600;
}

.progress-percent {
    color: var(--primary-400);
    font-weight: 700;
}

.progress-bar-bg {
    height: 10px;
    background: rgba(255,255,255,0.08);
    border-radius: 99px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-500), var(--primary-400));
    border-radius: 99px;
    transition: width 0.5s ease;
}

.summary-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
}
.summary-badge.success { background: rgba(74, 222, 128, 0.15); color: #4ade80; }
.summary-badge.danger { background: rgba(248, 113, 113, 0.15); color: #f87171; }

.tier-badge {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
}

.row-paid { opacity: 0.7; }
.text-success { color: #4ade80; }
.text-danger { color: #f87171; }
.text-center { text-align: center; }
.text-sm { font-size: 0.85rem; }
.font-medium { font-weight: 500; }

.info-box {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin-top: 0.5rem;
}

.info-row {
    display: flex;
    justify-content: space-between;
    padding: 0.35rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.info-row:last-child { border-bottom: none; }

.picker-group {
    margin-bottom: 1rem;
}

.picker-group label {
    display: block;
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 0.4rem;
}
</style>

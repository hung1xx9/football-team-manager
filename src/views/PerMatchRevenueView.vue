<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>💰 Thu Theo Trận</h2>
                <p class="card-subtitle">Theo dõi thu chi theo từng trận đấu và tình trạng đóng tiền</p>
            </div>
            <div class="card-content">
                <!-- Match Selector -->
                <div class="picker-group">
                    <label>Chọn trận đấu</label>
                    <select v-model="selectedMatchId" class="form-select">
                        <option value="">-- Chọn trận --</option>
                        <option v-for="m in sortedMatches" :key="m.id" :value="m.id">
                            {{ formatDate(m.date) }} - {{ m.opponent || 'Không rõ đối thủ' }}
                        </option>
                    </select>
                </div>

                <!-- No match selected -->
                <div v-if="!selectedMatchId" class="empty-state">
                    <div class="empty-icon">⚽</div>
                    <p>Vui lòng chọn một trận đấu để xem thông tin thu tiền</p>
                </div>

                <!-- Match Detail -->
                <div v-if="selectedMatch" class="match-detail">
                    <!-- Summary Stats -->
                    <div class="stats-grid">
                        <div class="stat-card stat-success">
                            <div class="stat-content">
                                <div class="stat-label">Tổng Thu (Theo Trận)</div>
                                <div class="stat-value">{{ formatCurrency(matchSummary.totalCollected) }}</div>
                            </div>
                        </div>
                        <div class="stat-card stat-warning">
                            <div class="stat-content">
                                <div class="stat-label">Còn Thiếu</div>
                                <div class="stat-value">{{ formatCurrency(matchSummary.totalMissing) }}</div>
                            </div>
                        </div>
                        <div class="stat-card stat-info">
                            <div class="stat-content">
                                <div class="stat-label">Phí/Trận</div>
                                <div class="stat-value">{{ formatCurrency(selectedMatch.perMatchFee || 50000) }}</div>
                            </div>
                        </div>
                        <div class="stat-card stat-danger">
                            <div class="stat-content">
                                <div class="stat-label">Tổng Tất Cả</div>
                                <div class="stat-value">{{ formatCurrency(matchSummary.totalRevenue) }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Member Payment Table -->
                    <div class="card" style="margin-top: var(--spacing-lg);">
                        <div class="card-header">
                            <h3>📋 Chi Tiết Thu Theo Thành Viên</h3>
                            <div class="card-actions">
                                <span class="summary-badge info">
                                    Tham gia: {{ matchSummary.presentCount }} / {{ memberStats.length }}
                                </span>
                                <button
                                    v-if="isAdmin"
                                    class="btn btn-sm btn-primary"
                                    @click="openSetFeeModal"
                                >
                                    ⚙️ Đặt Phí Trận
                                </button>
                            </div>
                        </div>
                        <div class="card-content">
                            <div class="table-container">
                                <table class="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Thành Viên</th>
                                            <th class="text-center">Tình Trạng</th>
                                            <th class="text-center">Điểm Danh</th>
                                            <th class="text-center">Phí Trận</th>
                                            <th class="text-center">Đã Đóng</th>
                                            <th class="text-center">Còn Thiếu</th>
                                            <th v-if="isAdmin">Thao Tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(s, idx) in memberStats" :key="s.id"
                                            :class="{ 'row-paid': s.isPaid, 'row-missing': s.missing > 0 && s.attended }">
                                            <td class="text-center">{{ idx + 1 }}</td>
                                            <td class="font-medium">{{ s.name }}</td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    :class="{
                                                        'badge-success': s.isPaid,
                                                        'badge-warning': !s.isPaid && s.attended && s.missing > 0,
                                                        'badge-secondary': !s.attended
                                                    }">
                                                    {{ s.isPaid ? '✔ Đã Đóng' : s.attended ? '⚠ Còn Thiếu' : '— Vắng' }}
                                                </span>
                                            </td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    :class="{
                                                        'badge-success': s.attendanceStatus === 'PRESENT',
                                                        'badge-warning': s.attendanceStatus === 'LATE',
                                                        'badge-danger': s.attendanceStatus === 'ABSENT',
                                                        'badge-secondary': !s.attendanceStatus
                                                    }">
                                                    {{ getAttendanceLabel(s.attendanceStatus) }}
                                                </span>
                                            </td>
                                            <td class="text-center">{{ formatCurrency(s.fee) }}</td>
                                            <td class="text-center text-success">{{ formatCurrency(s.paid) }}</td>
                                            <td class="text-center" :class="{ 'text-danger': s.missing > 0 }">
                                                {{ s.missing > 0 ? formatCurrency(s.missing) : '—' }}
                                            </td>
                                            <td v-if="isAdmin">
                                                <button
                                                    v-if="s.attended && s.missing > 0"
                                                    class="btn btn-sm btn-primary"
                                                    @click="selectMatch(s)"
                                                >
                                                    💳 Đóng quỹ
                                                </button>
                                                <span v-else-if="s.isPaid" class="text-success text-sm">✔ Hoàn thành</span>
                                                <span v-else class="text-muted text-sm">—</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr class="tfoot-total">
                                            <td colspan="4"><strong>Tổng Tất Cả:</strong></td>
                                            <td class="text-center"><strong>{{ formatCurrency(matchSummary.totalRevenue) }}</strong></td>
                                            <td class="text-center text-success"><strong>{{ formatCurrency(matchSummary.totalCollected) }}</strong></td>
                                            <td class="text-center text-danger"><strong>{{ formatCurrency(matchSummary.totalMissing) }}</strong></td>
                                            <td v-if="isAdmin"></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Set Fee Modal -->
        <div class="modal" v-if="showFeeModal" style="display: flex;">
            <div class="modal-content" style="max-width: 400px;">
                <div class="modal-header">
                    <h2>⚙️ Đặt Phí Trận Đấu</h2>
                    <button class="modal-close" @click="showFeeModal = false">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Phí trận (VNĐ/người)</label>
                        <input type="number" v-model.number="feeForm.perMatchFee" step="10000" min="0" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="showFeeModal = false">Hủy</button>
                    <button class="btn btn-primary" @click="saveFee">💾 Lưu</button>
                </div>
            </div>
        </div>

        <!-- Pay Fund Modal -->
        <div class="modal" v-if="showPayModal" style="display: flex;">
            <div class="modal-content" style="max-width: 450px;">
                <div class="modal-header">
                    <h2>💳 Đóng Quỹ Theo Trận</h2>
                    <button class="modal-close" @click="showPayModal = false">×</button>
                </div>
                <div class="modal-body">
                    <p>Xác nhận thu tiền trận từ <strong>{{ payTarget?.name }}</strong>?</p>
                    <div class="info-box">
                        <div class="info-row">
                            <span>Phí trận:</span>
                            <strong>{{ formatCurrency(payTarget?.fee) }}</strong>
                        </div>
                        <div class="info-row">
                            <span>Đã đóng:</span>
                            <strong class="text-success">{{ formatCurrency(payTarget?.paid) }}</strong>
                        </div>
                        <div class="info-row">
                            <span>Còn chiếu:</span>
                            <strong class="text-danger">{{ formatCurrency(payTarget?.missing) }}</strong>
                        </div>
                    </div>
                    <div class="form-group" style="margin-top: 1rem;">
                        <label>Số tiền thu</label>
                        <input type="number" v-model.number="payForm.amount" step="10000" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Ghi chú</label>
                        <input type="text" v-model="payForm.note" class="form-control" placeholder="Đóng tiền trận...">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="showPayModal = false">Hủy</button>
                    <button class="btn btn-success" @click="confirmPay">✔ Xác Nhận Thu</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useAppState } from '../composables/useAppState';

const { members, matches, transactions, addTransaction, updateMatch, settings } = useAppState();

// Auth check
const isAdmin = computed(() => {
    const role = settings.value?.currentRole;
    return role === 'admin' || role === 'treasurer';
});

const selectedMatchId = ref('');
const showFeeModal = ref(false);
const showPayModal = ref(false);
const payTarget = ref(null);

const feeForm = reactive({ perMatchFee: 50000 });
const payForm = reactive({ amount: 0, note: '' });

// Sorted matches (newest first)
const sortedMatches = computed(() =>
    [...(matches.value || [])].sort((a, b) => new Date(b.date) - new Date(a.date))
);

const selectedMatch = computed(() =>
    matches.value?.find(m => m.id === selectedMatchId.value) || null
);

// Get per-match payments from transactions
const getMatchPayments = (matchId, memberId) => {
    return (transactions.value || []).filter(t =>
        t.matchId === matchId &&
        t.memberId === memberId &&
        t.category === 'per-match' &&
        t.type === 'income'
    ).reduce((sum, t) => sum + (t.amount || 0), 0);
};

// Check attendance helper
const getAttendance = (match, memberId) => {
    if (!match?.attendance) return null;
    return match.attendance[memberId] || null;
};

const memberStats = computed(() => {
    if (!selectedMatch.value) return [];
    const fee = selectedMatch.value.perMatchFee || 50000;

    return (members.value || []).map(member => {
        const att = getAttendance(selectedMatch.value, member.id);
        const attended = att && att.status !== 'ABSENT';
        const memberFee = attended ? fee : 0;
        const paid = getMatchPayments(selectedMatch.value.id, member.id);
        const missing = Math.max(0, memberFee - paid);
        const isPaid = attended && missing <= 0;

        return {
            id: member.id,
            name: member.name,
            attended,
            attendanceStatus: att?.status || null,
            fee: memberFee,
            paid,
            missing,
            isPaid
        };
    }).sort((a, b) => {
        // Sort: missing first, then paid, then absent
        if (a.missing > 0 && b.missing <= 0) return -1;
        if (b.missing > 0 && a.missing <= 0) return 1;
        return a.name.localeCompare(b.name);
    });
});

const matchSummary = computed(() => {
    if (!memberStats.value.length) return { totalRevenue: 0, totalCollected: 0, totalMissing: 0, presentCount: 0 };
    const presentCount = memberStats.value.filter(s => s.attended).length;
    const totalRevenue = memberStats.value.reduce((s, m) => s + m.fee, 0);
    const totalCollected = memberStats.value.reduce((s, m) => s + m.paid, 0);
    const totalMissing = memberStats.value.reduce((s, m) => s + m.missing, 0);
    return { totalRevenue, totalCollected, totalMissing, presentCount };
});

const getAttendanceLabel = (status) => {
    if (status === 'PRESENT') return '✅ Có mặt';
    if (status === 'LATE') return '⏰ Đi muộn';
    if (status === 'ABSENT') return '❌ Vắng';
    return '—';
};

const openSetFeeModal = () => {
    feeForm.perMatchFee = selectedMatch.value?.perMatchFee || 50000;
    showFeeModal.value = true;
};

const saveFee = async () => {
    if (!selectedMatch.value) return;
    await updateMatch(selectedMatch.value.id, { perMatchFee: feeForm.perMatchFee });
    showFeeModal.value = false;
};

const selectMatch = (memberStat) => {
    payTarget.value = memberStat;
    payForm.amount = memberStat.missing;
    payForm.note = `${memberStat.name} đóng tiền theo trận ${formatDate(selectedMatch.value?.date)}`;
    showPayModal.value = true;
};

const confirmPay = () => {
    if (!payTarget.value || !selectedMatch.value) return;
    addTransaction({
        type: 'income',
        category: 'per-match',
        amount: payForm.amount,
        description: payForm.note || `${payTarget.value.name} đóng tiền trận`,
        date: new Date().toISOString().split('T')[0],
        memberId: payTarget.value.id,
        matchId: selectedMatch.value.id
    });
    showPayModal.value = false;
    payTarget.value = null;
};

const formatCurrency = (val) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);

const formatDate = (str) => {
    if (!str) return '';
    return new Date(str).toLocaleDateString('vi-VN');
};
</script>

<style scoped>
.card-subtitle {
    color: var(--text-muted);
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.match-detail {
    margin-top: var(--spacing-lg);
}

.summary-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
}

.summary-badge.info {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
}

.row-paid {
    opacity: 0.7;
}

.row-missing {
    background: rgba(239, 68, 68, 0.05);
}

.tfoot-total td {
    border-top: 2px solid rgba(255, 255, 255, 0.15);
    padding-top: 0.75rem;
    font-weight: 600;
}

.text-success { color: #4ade80; }
.text-danger { color: #f87171; }
.text-muted { color: var(--text-muted); }
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

.stat-warning .stat-value {
    color: #fbbf24;
}

.empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.form-select {
    width: 100%;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    color: var(--text-primary);
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
}

.picker-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.picker-group label {
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 0.875rem;
}
</style>

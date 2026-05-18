<template>
    <div class="audit-log-container">
        <!-- Header & Filters -->
        <div class="audit-log-header">
            <h4 class="audit-log-title">📋 Lịch sử tài chính</h4>
            <div class="audit-log-filters">
                <input
                    id="audit-start-date"
                    v-model="filterStartDate"
                    type="date"
                    class="filter-input"
                    :max="filterEndDate || undefined"
                    @change="loadLog"
                />
                <span class="filter-sep">→</span>
                <input
                    id="audit-end-date"
                    v-model="filterEndDate"
                    type="date"
                    class="filter-input"
                    :min="filterStartDate || undefined"
                    @change="loadLog"
                />
                <button class="filter-reset-btn" @click="resetFilters" title="Xóa bộ lọc">✕</button>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="isLoading" class="audit-log-loading">
            <div class="skeleton-row" v-for="i in 4" :key="i"></div>
        </div>

        <!-- Empty state -->
        <div v-else-if="entries.length === 0" class="audit-log-empty">
            <span class="empty-icon">🗂️</span>
            <p>Không có giao dịch nào trong khoảng thời gian này</p>
        </div>

        <!-- Entries list -->
        <ul v-else class="audit-log-list">
            <li
                v-for="entry in entries"
                :key="entry.id"
                class="audit-entry"
                :class="getDeltaClass(entry.delta)"
            >
                <div class="entry-left">
                    <span class="entry-icon">{{ getChangeIcon(entry.changeType) }}</span>
                    <div class="entry-meta">
                        <span class="entry-type">{{ getChangeLabel(entry.changeType) }}</span>
                        <span class="entry-desc">{{ entry.description }}</span>
                        <span class="entry-time">{{ formatDate(entry.timestamp) }}</span>
                    </div>
                </div>
                <div class="entry-right">
                    <span class="entry-delta" :class="getDeltaClass(entry.delta)">
                        {{ formatDelta(entry.delta) }}
                    </span>
                    <div class="entry-balance">
                        <span class="balance-label">Quỹ:</span>
                        <span class="balance-after">{{ formatVND(entry.after?.fundPaid ?? entry.after?.totalAmount) }}</span>
                    </div>
                </div>
            </li>
        </ul>

        <!-- Load more -->
        <div v-if="entries.length >= limitSize && !isLoading" class="audit-log-more">
            <button class="load-more-btn" @click="loadMore">Tải thêm</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useFinancialSync } from '../composables/useFinancialSync';

const props = defineProps({
    memberId: {
        type: [Number, String],
        required: true,
    },
});

const { getMemberAuditLog } = useFinancialSync();

const entries = ref([]);
const isLoading = ref(false);
const filterStartDate = ref('');
const filterEndDate = ref('');
const limitSize = ref(50);

const loadLog = async () => {
    if (!props.memberId) return;
    isLoading.value = true;
    try {
        entries.value = await getMemberAuditLog(props.memberId, {
            startDate: filterStartDate.value || undefined,
            endDate: filterEndDate.value ? filterEndDate.value + 'T23:59:59' : undefined,
            limit: limitSize.value,
        });
    } finally {
        isLoading.value = false;
    }
};

const loadMore = async () => {
    limitSize.value += 50;
    await loadLog();
};

const resetFilters = () => {
    filterStartDate.value = '';
    filterEndDate.value = '';
    loadLog();
};

// Reload whenever memberId changes
watch(() => props.memberId, loadLog);
onMounted(loadLog);

// --- Formatting helpers ---
const changeLabels = {
    fund_approved: 'Duyệt đóng quỹ',
    fine_posted: 'Ghi nhận tiền phạt',
    attendance_edit: 'Cập nhật điểm danh',
    match_cancelled: 'Hủy trận đấu',
    reconciliation: 'Đồng bộ lại số dư',
};

const changeIcons = {
    fund_approved: '✅',
    fine_posted: '⚠️',
    attendance_edit: '📋',
    match_cancelled: '🗑️',
    reconciliation: '🔄',
};

const getChangeLabel = (type) => changeLabels[type] || type;
const getChangeIcon = (type) => changeIcons[type] || '📌';

const getDeltaClass = (delta) => {
    if (!delta || delta === 0) return '';
    return delta > 0 ? 'positive' : 'negative';
};

const formatDelta = (delta) => {
    if (!delta && delta !== 0) return '—';
    const sign = delta > 0 ? '+' : '';
    return sign + formatVND(delta);
};

const formatVND = (val) => {
    if (val === undefined || val === null) return '—';
    return Number(val).toLocaleString('vi-VN') + 'đ';
};

const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
};
</script>

<style scoped>
.audit-log-container {
    background: var(--bg-secondary, #1a1f2e);
    border-radius: 12px;
    padding: 16px;
    margin-top: 12px;
}

.audit-log-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
}

.audit-log-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary, #e2e8f0);
    margin: 0;
}

.audit-log-filters {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
}

.filter-input {
    background: var(--bg-primary, #0f1117);
    border: 1px solid var(--border-color, #2d3748);
    border-radius: 8px;
    color: var(--text-primary, #e2e8f0);
    font-size: 12px;
    padding: 5px 8px;
}

.filter-sep {
    color: var(--text-muted, #718096);
    font-size: 12px;
}

.filter-reset-btn {
    background: transparent;
    border: 1px solid var(--border-color, #2d3748);
    border-radius: 6px;
    color: var(--text-muted, #718096);
    cursor: pointer;
    font-size: 11px;
    padding: 4px 8px;
    transition: all 0.2s;
}
.filter-reset-btn:hover {
    background: var(--danger-bg, rgba(239, 68, 68, 0.15));
    color: #ef4444;
    border-color: #ef4444;
}

/* Loading skeletons */
.skeleton-row {
    background: linear-gradient(90deg, var(--bg-primary, #0f1117) 25%, var(--bg-tertiary, #252d3d) 50%, var(--bg-primary, #0f1117) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
    height: 52px;
    margin-bottom: 8px;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* Empty state */
.audit-log-empty {
    text-align: center;
    padding: 32px 16px;
    color: var(--text-muted, #718096);
}
.empty-icon { font-size: 32px; display: block; margin-bottom: 8px; }

/* Entry list */
.audit-log-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.audit-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-primary, #0f1117);
    border-radius: 10px;
    border-left: 3px solid var(--border-color, #2d3748);
    padding: 10px 12px;
    gap: 8px;
    transition: background 0.2s;
}
.audit-entry.positive { border-left-color: #10b981; }
.audit-entry.negative { border-left-color: #ef4444; }

.entry-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
}

.entry-icon { font-size: 18px; flex-shrink: 0; }

.entry-meta {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.entry-type {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary, #e2e8f0);
}

.entry-desc {
    font-size: 11px;
    color: var(--text-muted, #718096);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.entry-time {
    font-size: 10px;
    color: var(--text-muted, #718096);
    margin-top: 2px;
}

.entry-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-shrink: 0;
    gap: 2px;
}

.entry-delta {
    font-size: 14px;
    font-weight: 700;
}
.entry-delta.positive { color: #10b981; }
.entry-delta.negative { color: #ef4444; }

.entry-balance {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
}
.balance-label { color: var(--text-muted, #718096); }
.balance-after { color: var(--text-secondary, #a0aec0); font-weight: 500; }

/* Load more */
.audit-log-more {
    text-align: center;
    margin-top: 12px;
}
.load-more-btn {
    background: transparent;
    border: 1px solid var(--border-color, #2d3748);
    border-radius: 8px;
    color: var(--accent-color, #6366f1);
    cursor: pointer;
    font-size: 13px;
    padding: 7px 20px;
    transition: all 0.2s;
}
.load-more-btn:hover {
    background: rgba(99, 102, 241, 0.12);
    border-color: var(--accent-color, #6366f1);
}
</style>

<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h1>⏳ Điểm Danh Chờ Duyệt</h1>
                <p class="card-subtitle">Duyệt các yêu cầu điểm danh từ thành viên</p>
            </div>
            <div class="card-content">
                <!-- Empty state -->
                <div v-if="!pendingAttendances.length" class="empty-state">
                    <div class="empty-icon">✅</div>
                    <p>Không có điểm danh nào cần duyệt</p>
                </div>

                <!-- Pending List -->
                <div v-else class="pending-list">
                    <div
                        v-for="item in pendingAttendances"
                        :key="item.id"
                        class="pending-card"
                    >
                        <div class="pending-info">
                            <div class="pending-member">{{ getMemberName(item.memberId) }}</div>
                            <div class="pending-match">
                                Trận: {{ formatDate(item.matchDate) }}
                                <span v-if="item.opponent"> vs {{ item.opponent }}</span>
                            </div>
                            <div class="pending-status">
                                <span class="badge"
                                    :class="{
                                        'badge-success': item.status === 'PRESENT',
                                        'badge-warning': item.status === 'LATE',
                                        'badge-danger': item.status === 'ABSENT'
                                    }">
                                    {{ getStatusLabel(item.status) }}
                                    <span v-if="item.status === 'LATE' && item.lateMinutes">
                                        (⏰ {{ item.lateMinutes }} phút)
                                    </span>
                                </span>
                            </div>
                            <div class="pending-time">Gửi lúc: {{ formatDateTime(item.submittedAt) }}</div>
                        </div>
                        <div class="pending-actions" v-if="isAdmin">
                            <button class="btn btn-sm btn-success" @click="approveAttendance(item)" title="Phê duyệt">
                                ✅ Duyệt
                            </button>
                            <button class="btn btn-sm btn-danger" @click="rejectAttendance(item)" title="Từ chối">
                                ❌
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Approve All button -->
                <div v-if="pendingAttendances.length > 1 && isAdmin" class="bulk-actions">
                    <button class="btn btn-success" @click="approveAll">
                        ✅ Duyệt Tất Cả ({{ pendingAttendances.length }})
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppState } from '../composables/useAppState';

const { members, matches, pendingAttendances: pendingData, settings, approveAttendance: approve, rejectAttendance: reject } = useAppState();

const isAdmin = computed(() => {
    const role = settings.value?.currentRole;
    return role === 'admin';
});

const pendingAttendances = computed(() => {
    return (pendingData?.value || []).sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
});

const getMemberName = (id) => members.value?.find(m => m.id === id)?.name || 'Không rõ';

const getStatusLabel = (status) => {
    if (status === 'PRESENT') return '✅ Có mặt';
    if (status === 'LATE') return '⏰ Đi muộn';
    if (status === 'ABSENT') return '❌ Vắng';
    return status;
};

const approveAttendance = (item) => {
    if (confirm(`Phê duyệt điểm danh cho ${getMemberName(item.memberId)}?`)) {
        approve?.(item);
    }
};

const rejectAttendance = (item) => {
    if (confirm(`Từ chối điểm danh của ${getMemberName(item.memberId)}?`)) {
        reject?.(item);
    }
};

const approveAll = () => {
    if (confirm(`Phê duyệt tất cả ${pendingAttendances.value.length} yêu cầu điểm danh?`)) {
        pendingAttendances.value.forEach(item => approve?.(item));
    }
};

const formatDate = (str) => {
    if (!str) return '';
    return new Date(str).toLocaleDateString('vi-VN');
};

const formatDateTime = (str) => {
    if (!str) return '';
    return new Date(str).toLocaleString('vi-VN');
};
</script>

<style scoped>
.card-subtitle {
    color: var(--text-muted);
    font-size: 0.875rem;
    margin-top: 0.25rem;
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

.pending-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.pending-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    transition: background 0.2s;
}

.pending-card:hover {
    background: rgba(255, 255, 255, 0.07);
}

.pending-member {
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 0.25rem;
}

.pending-match {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
}

.pending-status {
    margin: 0.35rem 0;
}

.pending-time {
    color: var(--text-muted);
    font-size: 0.8rem;
}

.pending-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.bulk-actions {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: flex-end;
}
</style>

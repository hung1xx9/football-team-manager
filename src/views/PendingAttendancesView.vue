<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>📋 Duyệt Điểm Danh</h2>
                <div class="header-actions">
                    <span v-if="pendingRequests.length > 0" class="badge">{{ pendingRequests.length }} yêu cầu</span>
                </div>
            </div>
            <div class="card-content">
                <div v-if="pendingRequests.length > 0" class="filters">
                    <select v-model="filterMatchId" class="form-select">
                        <option value="">Tất cả trận đấu</option>
                        <option v-for="match in matchesWithRequests" :key="match.id" :value="match.id">
                            {{ match.opponent }} ({{ formatDate(match.date) }})
                        </option>
                    </select>
                </div>

                <div v-if="filteredRequests.length > 0" class="request-list">
                    <div v-for="req in filteredRequests" :key="req.id" class="request-item">
                        <div class="request-info">
                            <div class="request-meta">
                                <span class="request-time">{{ formatDateTime(req.submittedAt) }}</span>
                                <span class="match-name">{{ getMatchName(req.matchId) }}</span>
                            </div>
                            <div class="member-name">{{ getMemberName(req.memberId) }}</div>
                            <span v-if="req.isLate" class="badge badge-late">⏰ Đi muộn {{ req.lateMinutes }} phút</span>
                        </div>
                        <div class="request-actions">
                            <button class="btn btn-secondary btn-sm" @click="rejectRequest(req)" title="Từ chối">❌</button>
                            <button class="btn btn-success btn-sm" @click="approveRequest(req)" title="Phê duyệt">✅ Duyệt</button>
                        </div>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <p>Không có yêu cầu điểm danh nào cần duyệt</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const { members, matches, pendingAttendances, updateManualAttendanceRequest, updateMatchAttendance } = useAppState();
const { permissions, currentRole } = useAuth();
const router = useRouter();

const filterMatchId = ref('');

onMounted(() => {
    if (!permissions.value.canReviewAttendance) {
        router.push('/');
    }
});

const pendingRequests = computed(() => {
    return (pendingAttendances.value || [])
        .filter(r => r.status === 'pending')
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
});

const matchesWithRequests = computed(() => {
    const ids = [...new Set(pendingRequests.value.map(r => r.matchId))];
    return matches.value.filter(m => ids.includes(m.id));
});

const filteredRequests = computed(() => {
    if (!filterMatchId.value) return pendingRequests.value;
    return pendingRequests.value.filter(r => r.matchId === filterMatchId.value);
});

const getMemberName = (id) => members.value.find(m => m.id === id)?.name || 'Unknown Member';
const getMatchName = (id) => matches.value.find(m => m.id === id)?.opponent || 'Unknown Match';
const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : '';
const formatDateTime = (ts) => ts ? new Date(ts).toLocaleString('vi-VN') : '';

const approveRequest = async (req) => {
    if (!confirm(`Phê duyệt điểm danh cho ${getMemberName(req.memberId)}?`)) return;
    
    const match = matches.value.find(m => m.id === req.matchId);
    if (match) {
        const attList = Array.isArray(match.attendance) ? [...match.attendance] : Object.values(match.attendance || {});
        const mId = req.memberId;
        const idx = attList.findIndex(a => a.memberId === mId || a.memberId === String(mId) || a.memberId === Number(mId));
        
        const updObj = {
            memberId: mId,
            status: 'present',
            timestamp: new Date().toISOString(),
            method: 'manual_approved',
            isLate: req.isLate || false,
            lateMinutes: req.lateMinutes || 0,
            lateFine: req.lateFine || 0
        };
        
        if (idx !== -1) {
            attList[idx] = { ...attList[idx], ...updObj };
        } else {
            attList.push(updObj);
        }
        
        await updateMatchAttendance(match.id, attList);
    }

    await updateManualAttendanceRequest({
        ...req,
        status: 'approved',
        reviewedBy: currentRole.value,
        reviewedAt: new Date().toISOString()
    });
};

const rejectRequest = async (req) => {
    if (!confirm(`Từ chối điểm danh của ${getMemberName(req.memberId)}?`)) return;
    
    await updateManualAttendanceRequest({
        ...req,
        status: 'rejected',
        reviewedBy: currentRole.value,
        reviewedAt: new Date().toISOString()
    });
};
</script>

<style scoped>
.header-actions { display: flex; align-items: center; }
.filters { margin-bottom: 1.5rem; }
.form-select {
    width: 100%;
    max-width: 400px;
    height: 42px;
}


.request-list { display: flex; flex-direction: column; gap: 1rem; }
.request-item { background: var(--bg-secondary); border: 1px solid var(--border-primary); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; }
.request-info { display: flex; flex-direction: column; gap: 0.4rem; }
.request-meta { display: flex; gap: 1rem; font-size: 0.75rem; color: var(--text-muted); }
.member-name { font-weight: 700; font-size: 1.1rem; color: var(--text-primary); }
.badge-late { background: rgba(245, 158, 11, 0.1); color: var(--warning-400); font-weight: 600; padding: 0.2rem 0.5rem; }

.request-actions { display: flex; gap: 0.75rem; }
</style>

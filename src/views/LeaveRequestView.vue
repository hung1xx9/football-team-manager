<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Xin Nghỉ</h2>
            </div>
            <div class="card-content">
                <div class="page-actions">
                    <button class="btn btn-primary" @click="openModal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; margin-right: 8px;">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Gửi Đơn Xin Nghỉ
                    </button>
                </div>

                <div v-if="myRequests.length > 0">
                    <h3 style="margin: 2rem 0 1rem;">Đơn Xin Nghỉ Của Tôi</h3>
                    <div class="leave-requests-list">
                        <div v-for="req in myRequests" :key="req.id" class="leave-request-card">
                            <div class="leave-request-header">
                                <div class="req-main-info">
                                    <div class="leave-request-date">{{ formatDate(req.leaveDate) }}</div>
                                    <div class="leave-request-created">Gửi lúc: {{ formatDateTime(req.createdAt) }}</div>
                                    <div v-if="req.matchId" class="leave-request-match">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; display: inline-block; margin-right: 4px;">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 6v6l4 2"></path>
                                        </svg>
                                        Trận đấu: {{ getMatchInfo(req.matchId) }}
                                    </div>
                                </div>
                                <span class="badge" :class="getStatusBadgeClass(req.status)">{{ getStatusLabel(req.status) }}</span>
                            </div>
                            <div class="leave-request-body">
                                <p><strong>Lý do:</strong> {{ req.reason }}</p>
                                <p v-if="req.adminNote" style="margin-top: 0.5rem;">
                                    <strong>Phản hồi Admin:</strong> {{ req.adminNote }}
                                </p>
                                <p v-if="req.processedAt" style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">
                                    Xử lý lúc: {{ formatDateTime(req.processedAt) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <p>Chưa có đơn xin nghỉ nào</p>
                </div>
            </div>
        </div>

        <!-- Add Leave Request Modal -->
        <div v-if="showModal" class="modal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Gửi Đơn Xin Nghỉ</h2>
                    <button class="modal-close" @click="closeModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Chọn Trận Đấu (Tùy chọn)</label>
                        <select v-model="form.matchId" @change="onMatchChange">
                            <option :value="null">-- Không chọn trận cụ thể --</option>
                            <option v-for="match in upcomingMatches" :key="match.id" :value="match.id">
                                {{ formatDate(match.date) }} - {{ match.startTime }} - {{ match.location }}
                            </option>
                        </select>
                    </div>
                    
                    <div v-if="!form.matchId" class="form-group">
                        <label>Ngày Nghỉ</label>
                        <input type="date" v-model="form.leaveDate" :min="todayDate">
                    </div>

                    <div class="form-group">
                        <label>Lý Do</label>
                        <textarea v-model="form.reason" rows="4" placeholder="Nhập lý do xin nghỉ"></textarea>
                    </div>

                    <div class="form-actions">
                        <button class="btn btn-primary" @click="submitRequest">Gửi Đơn</button>
                        <button class="btn btn-secondary" @click="closeModal">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';

const { matches, members, createLeaveRequest, getMemberLeaveRequests } = useAppState();
const { guestMemberId } = useAuth();

const showModal = ref(false);
const form = ref({ matchId: null, leaveDate: '', reason: '' });

const todayDate = computed(() => new Date().toISOString().split('T')[0]);

const myRequests = computed(() => guestMemberId.value ? getMemberLeaveRequests(guestMemberId.value) : []);

const upcomingMatches = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return matches.value
        .filter(m => new Date(m.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
});

const openModal = () => {
    form.value = { matchId: null, leaveDate: '', reason: '' };
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const onMatchChange = () => {
    if (form.value.matchId) {
        const match = matches.value.find(m => m.id === form.value.matchId);
        if (match) form.value.leaveDate = match.date;
    }
};

const submitRequest = async () => {
    if (!form.value.leaveDate) {
        alert('Vui lòng chọn ngày nghỉ hoặc trận đấu');
        return;
    }
    if (!form.value.reason?.trim()) {
        alert('Vui lòng nhập lý do');
        return;
    }
    if (!guestMemberId.value) {
        alert('Không tìm thấy thông tin thành viên');
        return;
    }

    const member = members.value.find(m => m.id === guestMemberId.value);
    
    await createLeaveRequest({
        memberId: guestMemberId.value,
        memberName: member?.name || 'Unknown',
        leaveDate: form.value.leaveDate,
        matchId: form.value.matchId,
        reason: form.value.reason
    });

    alert('✅ Đã gửi đơn xin nghỉ thành công!');
    closeModal();
};

const getMatchInfo = (id) => {
    const m = matches.value.find(match => match.id === id);
    return m ? `${formatDate(m.date)} - ${m.startTime} - ${m.location}` : 'N/A';
};

const getStatusBadgeClass = (status) => ({
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-danger'
})[status] || 'badge-info';

const getStatusLabel = (status) => ({
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối'
})[status] || status;

const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : '';
const formatDateTime = (ts) => ts ? new Date(ts).toLocaleString('vi-VN') : '';
</script>

<style scoped>
.page-actions { margin-bottom: 2rem; }
.leave-requests-list { display: flex; flex-direction: column; gap: 1rem; }
.leave-request-card { background: var(--bg-secondary); border: 1px solid var(--border-primary); border-radius: var(--radius-lg); padding: 1.5rem; }
.leave-request-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.leave-request-date { font-weight: 700; font-size: 1.1rem; color: var(--text-primary); }
.leave-request-created { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem; }
.leave-request-match { font-size: 0.85rem; color: var(--primary-400); margin-top: 0.25rem; }
.leave-request-body { font-size: 0.95rem; line-height: 1.5; color: var(--text-primary); }
</style>

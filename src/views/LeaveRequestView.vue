<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Xin Nghỉ/ Muộn</h2>
            </div>
            <div class="card-content">
                <div class="page-header-fancy">
                    <div class="header-action-btns">
                        <button class="btn btn-hero btn-hero-primary" @click="openModal">
                            <div class="btn-hero-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </div>
                            <span class="btn-hero-text">Gửi Đơn Xin Nghỉ/ Muộn</span>
                        </button>
                    </div>
                </div>

                <div v-if="myRequests.length > 0">
                    <h3 style="margin: 2rem 0 1rem;">Lịch Sử Đơn Gửi</h3>
                    <div class="leave-requests-list">
                        <div v-for="req in myRequests" :key="req.id" class="leave-request-card">
                            <div class="leave-request-header">
                                <div class="req-main-info">
                                    <div class="leave-request-date">
                                        {{ formatDate(req.leaveDate) }}
                                        <span class="type-tag" :class="req.type || 'leave'">
                                            {{ (req.type === 'late' ? 'Đi Muộn' : 'Xin Nghỉ') }}
                                            <template v-if="req.type === 'late'"> ({{ req.lateMinutes }} phút)</template>
                                        </span>
                                    </div>
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
                    <p>Chưa có đơn Xin Nghỉ/ Muộn nào</p>
                </div>
            </div>
        </div>

        <!-- Add Leave/Late Request Modal -->
        <div v-if="showModal" class="modal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Gửi Đơn Xin Nghỉ/ Muộn</h2>
                    <button class="modal-close" @click="closeModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Loại Đơn</label>
                        <div class="type-selector">
                            <button 
                                class="btn-type" 
                                :class="{ active: form.type === 'leave' }"
                                @click="form.type = 'leave'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; margin-right: 6px;">
                                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                    <line x1="12" y1="2" x2="12" y2="12"></line>
                                </svg>
                                Xin Nghỉ
                            </button>
                            <button 
                                class="btn-type" 
                                :class="{ active: form.type === 'late' }"
                                @click="form.type = 'late'">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; margin-right: 6px;">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                Đi Muộn
                            </button>
                        </div>
                    </div>

                    <div v-if="form.type === 'late'" class="form-group animate-in">
                        <label>Số Phút Đi Muộn</label>
                        <div class="input-with-suffix">
                            <input type="number" v-model="form.lateMinutes" min="1" placeholder="Ví dụ: 30">
                            <span class="suffix">phút</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Chọn Trận Đấu (Tùy chọn)</label>
                        <BaseSelect 
                            v-model="form.matchId"
                            :options="[
                                { value: null, label: '-- Không chọn trận cụ thể --' },
                                ...upcomingMatches.map(match => ({
                                    value: match.id,
                                    label: `${formatDate(match.date)} - ${match.startTime} - ${match.location}`
                                }))
                            ]"
                            @change="onMatchChange"
                        />
                    </div>
                    
                    <div v-if="!form.matchId" class="form-group">
                        <label>Ngày {{ form.type === 'late' ? 'Đi Muộn' : 'Nghỉ' }}</label>
                        <input type="date" v-model="form.leaveDate" :min="todayDate">
                    </div>

                    <div class="form-group">
                        <label>Lý Do</label>
                        <textarea v-model="form.reason" rows="4" :placeholder="'Nhập lý do ' + (form.type === 'late' ? 'đi muộn' : 'xin nghỉ')"></textarea>
                    </div>

                    <div class="form-actions" style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button class="btn btn-hero btn-hero-primary" @click="submitRequest">
                            <div class="btn-hero-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <polyline points="22 2 15 22 11 13 2 9 22 2"></polyline>
                                </svg>
                            </div>
                            <span class="btn-hero-text">Gửi Đơn Ngay</span>
                        </button>
                        <button class="btn btn-secondary" @click="closeModal" style="height: 60px; border-radius: 1.25rem; flex: 1;">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import BaseSelect from '../components/BaseSelect.vue';
import { useAuth } from '../composables/useAuth';

const { matches, members, createLeaveRequest, getMemberLeaveRequests } = useAppState();
const { guestMemberId } = useAuth();

const showModal = ref(false);
const form = ref({ matchId: null, leaveDate: '', reason: '', type: 'leave', lateMinutes: 15 });

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
    form.value = { matchId: null, leaveDate: '', reason: '', type: 'leave', lateMinutes: 15 };
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
        alert(`Vui lòng chọn ngày ${form.value.type === 'late' ? 'đi muộn' : 'xin nghỉ'} hoặc trận đấu`);
        return;
    }
    if (form.value.type === 'late' && (!form.value.lateMinutes || form.value.lateMinutes <= 0)) {
        alert('Vui lòng nhập số phút đi muộn');
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
        reason: form.value.reason,
        type: form.value.type,
        lateMinutes: form.value.type === 'late' ? form.value.lateMinutes : 0
    });

    alert(`✅ Đã gửi đơn ${form.value.type === 'late' ? 'xin đi muộn' : 'xin nghỉ'} thành công!`);
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
.leave-request-date { font-weight: 700; font-size: 1.1rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.75rem; }
.leave-request-created { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem; }
.leave-request-match { font-size: 0.85rem; color: var(--primary-400); margin-top: 0.25rem; }
.leave-request-body { font-size: 0.95rem; line-height: 1.5; color: var(--text-primary); }

.type-tag { font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; font-weight: 600; }
.type-tag.leave { background: rgba(239, 68, 68, 0.1); color: var(--danger-400); }
.type-tag.late { background: rgba(245, 158, 11, 0.1); color: var(--warning-400); }

.type-selector { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
.btn-type { flex: 1; display: flex; align-items: center; justify-content: center; padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-primary); background: var(--bg-secondary); color: var(--text-secondary); cursor: pointer; transition: all 0.2s; font-weight: 600; }
.btn-type:hover { border-color: var(--primary-500); color: var(--text-primary); }
.btn-type.active { background: var(--primary-500); color: white; border-color: var(--primary-500); }

.input-with-suffix { position: relative; display: flex; align-items: center; }
.input-with-suffix input { padding-right: 3rem; }
.suffix { position: absolute; right: 1rem; color: var(--text-muted); font-size: 0.875rem; }

.animate-in { animation: slideDown 0.3s ease-out; }
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
</style>

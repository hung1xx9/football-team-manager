<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Xin Nghỉ</h2>
            </div>
            <div class="card-content">
                <div class="page-actions">
                    <button class="btn btn-primary" @click="openModal()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Gửi Đơn Xin Nghỉ
                    </button>
                </div>

                <!-- Leave Requests List -->
                <div v-if="myLeaveRequests.length > 0">
                    <h3 style="margin: 2rem 0 1rem;">Đơn Xin Nghỉ Của Tôi</h3>
                    <div class="leave-requests-list">
                        <div class="leave-request-card" v-for="request in myLeaveRequests" :key="request.id">
                            <div class="leave-request-header">
                                <div>
                                    <div class="leave-request-date">{{ formatDate(request.leaveDate) }}</div>
                                    <div class="leave-request-created">Gửi lúc: {{ formatDateTime(request.createdAt) }}</div>
                                </div>
                                <span class="badge" :class="getStatusBadge(request.status)">
                                    {{ getStatusText(request.status) }}
                                </span>
                            </div>
                            <div class="leave-request-body">
                                <p><strong>Lý do:</strong> {{ request.reason }}</p>
                                <p v-if="request.adminNote" style="margin-top: 0.5rem;">
                                    <strong>Phản hồi Admin:</strong> {{ request.adminNote }}
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

        <!-- Leave Request Modal -->
        <div class="modal" v-if="showModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Gửi Đơn Xin Nghỉ</h2>
                    <button class="modal-close" @click="closeModal">x</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Ngày Nghỉ</label>
                        <input type="date" v-model="form.leaveDate" :min="minDate">
                    </div>
                    <div class="form-group">
                        <label>Lý Do</label>
                        <textarea v-model="form.reason" rows="4" placeholder="Nhập lý do xin nghỉ"></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary" @click="submitRequest">Gửi Đơn</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuth } from '../composables/useAuth';

const { guestMemberId } = useAuth();

const showModal = ref(false);
const leaveRequests = ref([]);
const form = reactive({
    leaveDate: '',
    reason: ''
});

// Min date is today
const minDate = computed(() => {
    return new Date().toISOString().split('T')[0];
});

onMounted(() => {
    loadLeaveRequests();
});

const loadLeaveRequests = () => {
    const stored = localStorage.getItem('leaveRequests');
    leaveRequests.value = stored ? JSON.parse(stored) : [];
};

const saveLeaveRequests = () => {
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value));
};

// Get my leave requests
const myLeaveRequests = computed(() => {
    if (!guestMemberId.value) return [];
    return leaveRequests.value
        .filter(r => r.memberId === guestMemberId.value)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const openModal = () => {
    form.leaveDate = '';
    form.reason = '';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const submitRequest = () => {
    if (!form.leaveDate) {
        alert('Vui lòng chọn ngày nghỉ');
        return;
    }

    if (!form.reason || form.reason.trim() === '') {
        alert('Vui lòng nhập lý do');
        return;
    }

    if (!guestMemberId.value) {
        alert('Không tìm thấy thông tin thành viên');
        return;
    }

    // Add leave request
    const newRequest = {
        id: Date.now(),
        memberId: guestMemberId.value,
        leaveDate: form.leaveDate,
        reason: form.reason.trim(),
        status: 'pending', // pending, approved, rejected
        createdAt: new Date().toISOString(),
        adminNote: null
    };

    leaveRequests.value.push(newRequest);
    saveLeaveRequests();

    alert('✅ Đã gửi đơn xin nghỉ thành công!');
    closeModal();
};

const getStatusBadge = (status) => {
    const badges = {
        pending: 'badge-warning',
        approved: 'badge-success',
        rejected: 'badge-danger'
    };
    return badges[status] || 'badge-info';
};

const getStatusText = (status) => {
    const texts = {
        pending: 'Chờ duyệt',
        approved: 'Đã duyệt',
        rejected: 'Từ chối'
    };
    return texts[status] || status;
};

const formatDate = (str) => {
    if (!str) return '';
    const d = new Date(str);
    return d.toLocaleDateString('vi-VN');
};

const formatDateTime = (str) => {
    if (!str) return '';
    const d = new Date(str);
    return d.toLocaleString('vi-VN');
};
</script>

<style scoped>
.leave-requests-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.leave-request-card {
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(20px);
    border-radius: var(--radius-xl);
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
    transition: all var(--transition-base);
}

.leave-request-card:hover {
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: var(--shadow-lg);
}

.leave-request-header {
    padding: var(--spacing-lg) var(--spacing-xl);
    background: rgba(15, 23, 42, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: start;
}

.leave-request-date {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: var(--spacing-xs);
}

.leave-request-created {
    font-size: 0.875rem;
    color: var(--text-muted);
}

.leave-request-body {
    padding: var(--spacing-xl);
}

.leave-request-body p {
    margin: 0;
    color: var(--text-secondary);
}
</style>

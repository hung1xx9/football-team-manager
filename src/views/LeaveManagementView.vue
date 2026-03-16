<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Quản Lý Nghỉ/Muộn</h2>
            </div>
            <div class="card-content">
                <div class="filters">
                    <div class="form-group" style="margin: 0;">
                        <label>Lọc theo trạng thái</label>
                        <select v-model="statusFilter" class="form-control">
                            <option value="all">Tất cả</option>
                            <option value="pending">Chờ duyệt</option>
                            <option value="approved">Đã duyệt</option>
                            <option value="rejected">Từ chối</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin: 0;">
                        <label>Tìm kiếm thành viên</label>
                        <input type="text" v-model="searchQuery" placeholder="Nhập tên..." class="form-control">
                    </div>
                </div>

                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); margin: 2rem 0;">
                    <div class="stat-card stat-warning">
                        <div class="stat-content">
                            <div class="stat-label">Chờ duyệt</div>
                            <div class="stat-value">{{ stats.pending }}</div>
                        </div>
                    </div>
                    <div class="stat-card stat-success">
                        <div class="stat-content">
                            <div class="stat-label">Đã duyệt</div>
                            <div class="stat-value">{{ stats.approved }}</div>
                        </div>
                    </div>
                    <div class="stat-card stat-danger">
                        <div class="stat-content">
                            <div class="stat-label">Từ chối</div>
                            <div class="stat-value">{{ stats.rejected }}</div>
                        </div>
                    </div>
                    <div class="stat-card stat-info">
                        <div class="stat-content">
                            <div class="stat-label">Tổng cộng</div>
                            <div class="stat-value">{{ stats.total }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="filteredRequests.length > 0" class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Thành Viên</th>
                                <th>Loại Đơn</th>
                                <th>Ngày</th>
                                <th>Trận Đấu</th>
                                <th>Lý Do</th>
                                <th>Ngày Gửi</th>
                                <th>Trạng Thái</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="req in filteredRequests" :key="req.id">
                                <td>
                                    <strong>{{ req.memberName || getMemberName(req.memberId) }}</strong>
                                </td>
                                <td>
                                    <span class="type-badge" :class="req.type || 'leave'">
                                        {{ req.type === 'late' ? 'Đi Muộn' : 'Xin Nghỉ' }}
                                        <div v-if="req.type === 'late'" class="late-minutes">{{ req.lateMinutes }} phút</div>
                                    </span>
                                </td>
                                <td>{{ formatDate(req.leaveDate) }}</td>
                                <td>
                                    <span v-if="req.matchId" class="match-badge">{{ getMatchInfo(req.matchId) }}</span>
                                    <span v-else style="color: var(--text-muted);">--</span>
                                </td>
                                <td style="max-width: 250px;">{{ req.reason }}</td>
                                <td>{{ formatFullDate(req.createdAt) }}</td>
                                <td>
                                    <span class="badge" :class="getStatusBadgeClass(req.status)">
                                        {{ getStatusText(req.status) }}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; gap: 0.5rem;">
                                        <button v-if="req.status === 'pending'" class="btn btn-sm btn-success" @click="openConfirmModal(req, 'approve')" title="Duyệt đơn"> ✓ </button>
                                        <button v-if="req.status === 'pending'" class="btn btn-sm btn-danger" @click="openConfirmModal(req, 'reject')" title="Từ chối đơn"> ✕ </button>
                                        <button class="btn btn-sm btn-secondary" @click="openDetailsModal(req)" title="Xem chi tiết"> 👁 </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="empty-state">
                    <p>Không có đơn xin nghỉ/muộn nào</p>
                </div>
            </div>
        </div>

        <!-- Confirm Approval/Rejection Modal -->
        <div v-if="showConfirmModal" class="modal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ confirmType === 'approve' ? 'Duyệt Đơn' : 'Từ Chối Đơn' }}</h2>
                    <button class="modal-close" @click="closeConfirmModal">×</button>
                </div>
                <div class="modal-body">
                    <div v-if="selectedReq">
                        <p><strong>Thành viên:</strong> {{ selectedReq.memberName || getMemberName(selectedReq.memberId) }}</p>
                        <p><strong>Loại đơn:</strong> {{ selectedReq.type === 'late' ? 'Đi Muộn' : 'Xin Nghỉ' }} <span v-if="selectedReq.type === 'late'">({{ selectedReq.lateMinutes }} phút)</span></p>
                        <p><strong>Ngày:</strong> {{ formatDate(selectedReq.leaveDate) }}</p>
                        <p v-if="selectedReq.matchId"><strong>Trận đấu:</strong> {{ getMatchInfo(selectedReq.matchId) }}</p>
                        <p><strong>Lý do:</strong> {{ selectedReq.reason }}</p>
                    </div>
                    <div class="form-group" style="margin-top: 1rem;">
                        <label>Ghi chú (tùy chọn)</label>
                        <textarea v-model="adminNote" rows="3" placeholder="Nhập ghi chú cho thành viên..." class="form-control"></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="btn" :class="confirmType === 'approve' ? 'btn-success' : 'btn-danger'" @click="handleConfirm">
                            {{ confirmType === 'approve' ? 'Xác Nhận Duyệt' : 'Xác Nhận Từ Chối' }}
                        </button>
                        <button class="btn btn-secondary" @click="closeConfirmModal">Hủy</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="showDetailsModal" class="modal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Chi Tiết Đơn Gửi</h2>
                    <button class="modal-close" @click="showDetailsModal = false">×</button>
                </div>
                <div v-if="selectedReq" class="modal-body">
                    <div class="detail-row">
                        <strong>Thành viên:</strong>
                        <span>{{ selectedReq.memberName || getMemberName(selectedReq.memberId) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Loại đơn:</strong>
                        <span>{{ selectedReq.type === 'late' ? 'Đi Muộn' : 'Xin Nghỉ' }} {{ selectedReq.type === 'late' ? `(${selectedReq.lateMinutes} phút)` : '' }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Ngày:</strong>
                        <span>{{ formatDate(selectedReq.leaveDate) }}</span>
                    </div>
                    <div v-if="selectedReq.matchId" class="detail-row">
                        <strong>Trận đấu:</strong>
                        <span>{{ getMatchInfo(selectedReq.matchId) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Lý do:</strong>
                        <span>{{ selectedReq.reason }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Ngày gửi:</strong>
                        <span>{{ formatFullDate(selectedReq.createdAt) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Trạng thái:</strong>
                        <span class="badge" :class="getStatusBadgeClass(selectedReq.status)">
                            {{ getStatusText(selectedReq.status) }}
                        </span>
                    </div>
                    <div v-if="selectedReq.processedAt" class="detail-row">
                        <strong>Ngày xử lý:</strong>
                        <span>{{ formatFullDate(selectedReq.processedAt) }}</span>
                    </div>
                    <div v-if="selectedReq.adminNote" class="detail-row">
                        <strong>Ghi chú Admin:</strong>
                        <span>{{ selectedReq.adminNote }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppState } from '../composables/useAppState';

const { leaveRequests, matches, getMemberName, approveLeaveRequest, rejectLeaveRequest } = useAppState();

const statusFilter = ref('all');
const searchQuery = ref('');
const showConfirmModal = ref(false);
const showDetailsModal = ref(false);
const selectedReq = ref(null);
const confirmType = ref('approve'); // 'approve' or 'reject'
const adminNote = ref('');

const stats = computed(() => ({
    total: leaveRequests.value.length,
    pending: leaveRequests.value.filter(r => r.status === 'pending').length,
    approved: leaveRequests.value.filter(r => r.status === 'approved').length,
    rejected: leaveRequests.value.filter(r => r.status === 'rejected').length
}));

const filteredRequests = computed(() => {
    let list = leaveRequests.value;
    
    if (statusFilter.value !== 'all') {
        list = list.filter(r => r.status === statusFilter.value);
    }
    
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        list = list.filter(r => {
            const name = r.memberName || getMemberName(r.memberId);
            return name && name.toLowerCase().includes(query);
        });
    }
    
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const openConfirmModal = (req, type) => {
    selectedReq.value = req;
    confirmType.value = type;
    adminNote.value = '';
    showConfirmModal.value = true;
};

const closeConfirmModal = () => {
    showConfirmModal.value = false;
    selectedReq.value = null;
    adminNote.value = '';
};

const handleConfirm = () => {
    if (!selectedReq.value) return;
    
    if (confirmType.value === 'approve') {
        approveLeaveRequest(selectedReq.value.id, adminNote.value);
    } else {
        rejectLeaveRequest(selectedReq.value.id, adminNote.value);
    }
    
    closeConfirmModal();
};

const openDetailsModal = (req) => {
    selectedReq.value = req;
    showDetailsModal.value = true;
};

const getMatchInfo = (matchId) => {
    const match = matches.value.find(m => m.id === matchId);
    return match ? `${formatDate(match.date)} - ${match.startTime}` : 'N/A';
};

const getStatusBadgeClass = (status) => ({
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-danger'
})[status] || 'badge-info';

const getStatusText = (status) => ({
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối'
})[status] || status;

const formatDate = (date) => (date ? new Date(date).toLocaleDateString('vi-VN') : '');
const formatFullDate = (date) => (date ? new Date(date).toLocaleString('vi-VN', { hour12: false }) : '');
</script>

<style scoped>
.page-content { padding: var(--spacing-xl); }
.filters { display: flex; gap: var(--spacing-xl); margin-bottom: var(--spacing-xl); }
.match-badge { background: rgba(59, 130, 246, 0.1); color: var(--primary-500); padding: 0.25rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600; }
.detail-row { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border-primary); }
.detail-row:last-child { border-bottom: none; }
.detail-row strong { color: var(--text-secondary); }

.type-badge { display: flex; flex-direction: column; font-size: 0.85rem; font-weight: 600; }
.type-badge.leave { color: var(--danger-400); }
.type-badge.late { color: var(--warning-400); }
.late-minutes { font-size: 0.7rem; opacity: 0.8; }
</style>


<template>
    <div class="page-content">
        <div class="card">
            <div class="card-header">
                <h2>Quản Lý Đơn Xin Nghỉ</h2>
            </div>
            <div class="card-content">
                <!-- Filters -->
                <div class="filters">
                    <div class="form-group" style="margin: 0;">
                        <label>Lọc theo trạng thái</label>
                        <select v-model="filterStatus">
                            <option value="all">Tất cả</option>
                            <option value="pending">Chờ duyệt</option>
                            <option value="approved">Đã duyệt</option>
                            <option value="rejected">Từ chối</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin: 0;">
                        <label>Tìm kiếm thành viên</label>
                        <input type="text" v-model="searchMember" placeholder="Nhập tên...">
                    </div>
                </div>

                <!-- Stats -->
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
                </div>

                <!-- Leave Requests List -->
                <div v-if="filteredRequests.length > 0">
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Thành Viên</th>
                                    <th>Ngày Nghỉ</th>
                                    <th>Lý Do</th>
                                    <th>Ngày Gửi</th>
                                    <th>Trạng Thái</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="request in filteredRequests" :key="request.id">
                                    <td><strong>{{ getMemberName(request.memberId) }}</strong></td>
                                    <td>{{ formatDate(request.leaveDate) }}</td>
                                    <td style="max-width: 300px;">{{ request.reason }}</td>
                                    <td>{{ formatDateTime(request.createdAt) }}</td>
                                    <td>
                                        <span class="badge" :class="getStatusBadge(request.status)">
                                            {{ getStatusText(request.status) }}
                                        </span>
                                    </td>
                                    <td>
                                        <div style="display: flex; gap: 0.5rem;">
                                            <button 
                                                v-if="request.status === 'pending'" 
                                                class="btn btn-sm btn-success" 
                                                @click="openApproveModal(request)">
                                                Duyệt
                                            </button>
                                            <button 
                                                v-if="request.status === 'pending'" 
                                                class="btn btn-sm btn-danger" 
                                                @click="openRejectModal(request)">
                                                Từ chối
                                            </button>
                                            <button 
                                                v-if="request.status !== 'pending'" 
                                                class="btn btn-sm btn-secondary" 
                                                @click="viewDetails(request)">
                                                Xem
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <p>Không có đơn xin nghỉ nào</p>
                </div>
            </div>
        </div>

        <!-- Approve/Reject Modal -->
        <div class="modal" v-if="showActionModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ actionType === 'approve' ? 'Duyệt Đơn' : 'Từ Chối Đơn' }}</h2>
                    <button class="modal-close" @click="closeActionModal">x</button>
                </div>
                <div class="modal-body">
                    <div v-if="selectedRequest">
                        <p><strong>Thành viên:</strong> {{ getMemberName(selectedRequest.memberId) }}</p>
                        <p><strong>Ngày nghỉ:</strong> {{ formatDate(selectedRequest.leaveDate) }}</p>
                        <p><strong>Lý do:</strong> {{ selectedRequest.reason }}</p>
                    </div>
                    <div class="form-group" style="margin-top: 1rem;">
                        <label>Ghi chú (tùy chọn)</label>
                        <textarea v-model="adminNote" rows="3" placeholder="Nhập ghi chú cho thành viên..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button 
                            class="btn" 
                            :class="actionType === 'approve' ? 'btn-success' : 'btn-danger'" 
                            @click="confirmAction">
                            {{ actionType === 'approve' ? 'Xác Nhận Duyệt' : 'Xác Nhận Từ Chối' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- View Details Modal -->
        <div class="modal" v-if="showDetailsModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Chi Tiết Đơn Xin Nghỉ</h2>
                    <button class="modal-close" @click="showDetailsModal = false">x</button>
                </div>
                <div class="modal-body" v-if="selectedRequest">
                    <div class="detail-row">
                        <strong>Thành viên:</strong>
                        <span>{{ getMemberName(selectedRequest.memberId) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Ngày nghỉ:</strong>
                        <span>{{ formatDate(selectedRequest.leaveDate) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Lý do:</strong>
                        <span>{{ selectedRequest.reason }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Ngày gửi:</strong>
                        <span>{{ formatDateTime(selectedRequest.createdAt) }}</span>
                    </div>
                    <div class="detail-row">
                        <strong>Trạng thái:</strong>
                        <span class="badge" :class="getStatusBadge(selectedRequest.status)">
                            {{ getStatusText(selectedRequest.status) }}
                        </span>
                    </div>
                    <div class="detail-row" v-if="selectedRequest.adminNote">
                        <strong>Ghi chú Admin:</strong>
                        <span>{{ selectedRequest.adminNote }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppState } from '../composables/useAppState';

const { members, getMemberName } = useAppState();

const leaveRequests = ref([]);
const filterStatus = ref('all');
const searchMember = ref('');
const showActionModal = ref(false);
const showDetailsModal = ref(false);
const selectedRequest = ref(null);
const actionType = ref('approve');
const adminNote = ref('');

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

// Stats
const stats = computed(() => {
    return {
        pending: leaveRequests.value.filter(r => r.status === 'pending').length,
        approved: leaveRequests.value.filter(r => r.status === 'approved').length,
        rejected: leaveRequests.value.filter(r => r.status === 'rejected').length
    };
});

// Filtered requests
const filteredRequests = computed(() => {
    let filtered = leaveRequests.value;

    // Filter by status
    if (filterStatus.value !== 'all') {
        filtered = filtered.filter(r => r.status === filterStatus.value);
    }

    // Filter by member name
    if (searchMember.value) {
        const search = searchMember.value.toLowerCase();
        filtered = filtered.filter(r => {
            const memberName = getMemberName(r.memberId);
            return memberName && memberName.toLowerCase().includes(search);
        });
    }

    // Sort by created date (newest first)
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const openApproveModal = (request) => {
    selectedRequest.value = request;
    actionType.value = 'approve';
    adminNote.value = '';
    showActionModal.value = true;
};

const openRejectModal = (request) => {
    selectedRequest.value = request;
    actionType.value = 'reject';
    adminNote.value = '';
    showActionModal.value = true;
};

const closeActionModal = () => {
    showActionModal.value = false;
    selectedRequest.value = null;
    adminNote.value = '';
};

const confirmAction = () => {
    if (!selectedRequest.value) return;

    const request = leaveRequests.value.find(r => r.id === selectedRequest.value.id);
    if (request) {
        request.status = actionType.value === 'approve' ? 'approved' : 'rejected';
        request.adminNote = adminNote.value.trim() || null;
        request.processedAt = new Date().toISOString();
        
        saveLeaveRequests();
        
        const message = actionType.value === 'approve' 
            ? '✅ Đã duyệt đơn xin nghỉ' 
            : '❌ Đã từ chối đơn xin nghỉ';
        alert(message);
    }

    closeActionModal();
};

const viewDetails = (request) => {
    selectedRequest.value = request;
    showDetailsModal.value = true;
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
.filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-lg);
    background: rgba(15, 23, 42, 0.5);
    border-radius: var(--radius-lg);
}

.detail-row {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-md) 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-row:last-child {
    border-bottom: none;
}

.detail-row strong {
    color: var(--text-secondary);
}

.detail-row span {
    color: var(--text-primary);
    text-align: right;
}

@media (max-width: 768px) {
    .filters {
        grid-template-columns: 1fr;
    }

    .data-table {
        font-size: 0.875rem;
    }

    .data-table td {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>

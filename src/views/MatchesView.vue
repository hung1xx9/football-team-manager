<template>
    <div class="page-content">
        <div class="page-actions">
            <button class="btn btn-primary" @click="openModal()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Thêm Trận Đấu
            </button>
        </div>
        <div class="matches-list">
            <div class="match-card" v-for="match in sortedMatches" :key="match.id">
                <div class="match-card-header">
                    <div>
                        <div class="match-card-title">{{ getMatchTitle(match) }}</div>
                        <div class="match-card-date">
                            <span class="badge" :class="getMatchTypeBadge(match.matchType)">
                                {{ match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối' }}
                            </span>
                            {{ match.opponent || 'Chưa có đối thủ' }}
                        </div>
                        <div class="match-card-date">{{ match.location || 'Chưa có địa điểm' }}</div>
                    </div>
                    <div>
                        <div class="match-card-date">{{ formatDate(match.date) }}</div>
                        <div v-if="match.startTime" class="match-card-date" style="font-size: 0.875rem; color: var(--text-secondary);">
                            🕐 {{ match.startTime }}
                        </div>
                        <div style="text-align: right; margin-top: 4px;">
                            <span class="badge badge-success">{{ countAttendance(match, 'present') }} có mặt</span>
                            <span class="badge badge-danger">{{ countAttendance(match, 'absent') }} vắng</span>
                            <span v-if="getTotalFines(match) > 0" class="badge badge-warning" style="background: var(--warning-500);">
                                💰 {{ formatCurrency(getTotalFines(match)) }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="match-card-body">
                    <div class="attendance-grid">
                        <template v-for="att in match.attendance" :key="att.memberId">
                            <div class="attendance-item" v-if="getMemberName(att.memberId)">
                                <div class="attendance-status" :class="att.status"></div>
                                <div class="attendance-name">
                                    {{ getMemberName(att.memberId) }}
                                    <div v-if="att.status === 'present' && att.timestamp" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
                                        {{ formatTimestamp(att.timestamp) }}
                                        <span v-if="att.isLate !== undefined" :style="{ color: att.isLate ? 'var(--warning-500)' : 'var(--success-500)', fontWeight: '600' }">
                                            {{ att.isLate ? `⏰ Muộn ${att.lateMinutes || 0} phút` : '✓ Đúng giờ' }}
                                        </span>
                                        <span v-if="att.lateFine > 0" style="color: var(--danger-500); font-weight: 600; margin-left: 4px;">
                                            💰 {{ formatCurrency(att.lateFine) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: flex-end; flex-wrap: wrap;">
                        <button class="btn btn-sm btn-info" @click="showQRCode(match)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <path d="M3 9h18"></path>
                                <path d="M9 21V9"></path>
                            </svg>
                            Mã QR
                        </button>
                        <button class="btn btn-sm btn-primary" @click="openModal(match)">
                            Sửa/Điểm danh
                        </button>
                        <button class="btn btn-sm btn-danger" @click="handleDelete(match.id)">Xóa</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Match Modal -->
        <div class="modal" v-if="showModal" style="display: flex;">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>{{ form.id ? 'Sửa' : 'Thêm' }} Trận Đấu</h2>
                    <button class="modal-close" @click="closeModal">x</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Loại Trận Đấu</label>
                        <select v-model="form.matchType">
                            <option value="friendly">Đấu tập</option>
                            <option value="competitive">Đấu đối</option>
                        </select>
                    </div>
                    <div class="form-group"><label>Ngày</label><input type="date" v-model="form.date"></div>
                    <div class="form-group"><label>Giờ Bắt Đầu</label><input type="time" v-model="form.startTime" placeholder="HH:MM"></div>
                    <div class="form-group"><label>Đối Thủ</label><input type="text" v-model="form.opponent" placeholder="Tên đội đối thủ"></div>
                    <div class="form-group"><label>Địa Điểm</label><input type="text" v-model="form.location" placeholder="Sân vận động"></div>
                    <div class="form-group">
                        <label>Điểm Danh</label>
                        <div class="attendance-list">
                            <div class="attendance-checkbox" v-for="m in members" :key="m.id">
                                <input type="checkbox" :id="'att-' + m.id" :value="m.id" v-model="form.attendanceIds">
                                <label :for="'att-' + m.id">{{ m.name }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions"><button class="btn btn-primary" @click="save">Lưu</button></div>
                </div>
            </div>
        </div>

        <!-- QR Code Modal -->
        <div class="modal" v-if="showQRModal" style="display: flex;">
            <div class="modal-content" style="max-width: 450px; text-align: center;">
                <div class="modal-header">
                    <h2>Mã QR Điểm Danh</h2>
                    <button class="modal-close" @click="closeQRModal">x</button>
                </div>
                <div class="modal-body">
                    <div v-if="currentQRCode">
                        <p style="margin-bottom: 1rem; color: var(--text-secondary);">
                            {{ getMatchTitle(selectedMatch) }}
                        </p>
                        <img :src="currentQRCode" alt="QR Code" style="width: 100%; max-width: 300px; border-radius: var(--radius-lg); margin: 0 auto;">
                        <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-muted);">
                            Thành viên quét mã này để điểm danh
                        </p>
                    </div>
                    <div v-else style="padding: 2rem;">
                        <div class="spinner"></div>
                        <p>Đang tạo mã QR...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useQRAttendance } from '../composables/useQRAttendance';

const { sortedMatches, members, getMemberName, saveMatch, deleteMatch } = useAppState();
const { generateQR } = useQRAttendance();

const showModal = ref(false);
const showQRModal = ref(false);
const currentQRCode = ref(null);
const selectedMatch = ref(null);
const form = reactive({ id: null, date: '', startTime: '', matchType: 'friendly', opponent: '', location: '', attendanceIds: [] });

const openModal = (match = null) => {
    if (match) {
        form.id = match.id;
        form.date = match.date;
        form.startTime = match.startTime || '';
        form.matchType = match.matchType || 'friendly';
        form.opponent = match.opponent;
        form.location = match.location;
        form.attendanceIds = match.attendance.filter(a => a.status === 'present').map(a => a.memberId);
    } else {
        form.id = null;
        form.date = new Date().toISOString().split('T')[0];
        form.startTime = '';
        form.matchType = 'friendly';
        form.opponent = '';
        form.location = '';
        form.attendanceIds = [];
    }
    showModal.value = true;
};

const closeModal = () => showModal.value = false;

const save = () => {
    saveMatch({ ...form });
    closeModal();
};

const handleDelete = (id) => {
    if(confirm('Xóa trận này?')) deleteMatch(id);
};

const showQRCode = async (match) => {
    selectedMatch.value = match;
    showQRModal.value = true;
    currentQRCode.value = null;
    
    // Generate QR code
    const qrCode = await generateQR(match.id, match.date);
    currentQRCode.value = qrCode;
};

const closeQRModal = () => {
    showQRModal.value = false;
    currentQRCode.value = null;
    selectedMatch.value = null;
};

// Utils
const formatDate = (str) => { 
    if(!str) return ''; 
    const d = new Date(str); 
    return d.toLocaleDateString('vi-VN'); 
};

const getMatchTitle = (match) => {
    if (!match) return '';
    const type = match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối';
    const date = formatDate(match.date);
    return `Trận ${type} ${date}`;
};

const getMatchTypeBadge = (type) => {
    return type === 'friendly' ? 'badge-info' : 'badge-warning';
};

const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return d.toLocaleString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit'
    });
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(amount);
};

const getTotalFines = (match) => {
    return match.attendance.reduce((total, att) => {
        return total + (att.lateFine || 0);
    }, 0);
};

const countAttendance = (match, status) => match.attendance.filter(a => a.status === status).length;
</script>

<style scoped>
.spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 4px solid rgba(59, 130, 246, 0.1);
    border-top-color: var(--primary-500);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>

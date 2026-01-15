<template>
    <div class="page-content">
        <div class="page-actions">
            <button class="btn btn-primary" @click="openEditModal()">
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
                                        <span v-if="att.attendanceMethod" class="attendance-method-badge" :class="'method-' + att.attendanceMethod">
                                            {{ att.attendanceMethod === 'qr' ? '📱' : '✋' }}
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
                        <button class="btn btn-sm btn-success" @click="openAttendanceModal(match)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11l3 3L22 4"></path>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                            Điểm danh
                        </button>
                        <button class="btn btn-sm btn-primary" @click="openEditModal(match)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Sửa
                        </button>
                        <button class="btn btn-sm btn-danger" @click="handleDelete(match.id)">Xóa</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Match Modal -->
        <div class="modal" v-if="showEditModal" style="display: flex;">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>{{ editForm.id ? 'Sửa' : 'Thêm' }} Trận Đấu</h2>
                    <button class="modal-close" @click="closeEditModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Loại Trận Đấu</label>
                        <select v-model="editForm.matchType">
                            <option value="friendly">Đấu tập</option>
                            <option value="competitive">Đấu đối</option>
                        </select>
                    </div>
                    <div class="form-group"><label>Ngày</label><input type="date" v-model="editForm.date"></div>
                    <div class="form-group"><label>Giờ Bắt Đầu</label><input type="time" v-model="editForm.startTime" placeholder="HH:MM"></div>
                    <div class="form-group"><label>Đối Thủ</label><input type="text" v-model="editForm.opponent" placeholder="Tên đội đối thủ"></div>
                    <div class="form-group"><label>Địa Điểm</label><input type="text" v-model="editForm.location" placeholder="Sân vận động"></div>
                    <div class="form-actions"><button class="btn btn-primary" @click="saveEdit">Lưu</button></div>
                </div>
            </div>
        </div>

        <!-- Attendance Modal -->
        <div class="modal" v-if="showAttendanceModal" style="display: flex;">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>Điểm Danh Thủ Công</h2>
                    <button class="modal-close" @click="closeAttendanceModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="match-info-banner">
                        <h3>{{ getMatchTitle(attendanceForm.match) }}</h3>
                        <p>{{ attendanceForm.match?.opponent || 'Chưa có đối thủ' }} • {{ attendanceForm.match?.location || 'Chưa có địa điểm' }}</p>
                    </div>
                    <div class="form-group">
                        <label>Chọn thành viên có mặt</label>
                        <div class="attendance-list-enhanced">
                            <div class="attendance-item-enhanced" v-for="m in members" :key="m.id">
                                <div class="attendance-checkbox-wrapper">
                                    <input 
                                        type="checkbox" 
                                        :id="'att-' + m.id" 
                                        :value="m.id" 
                                        v-model="attendanceForm.attendanceIds"
                                        @change="onAttendanceChange(m.id)">
                                    <label :for="'att-' + m.id" class="attendance-label">
                                        <span class="member-name">{{ m.name }}</span>
                                        <span 
                                            v-if="getAttendanceInfo(m.id)" 
                                            class="attendance-info">
                                            <span class="attendance-time">
                                                {{ formatAttendanceTime(getAttendanceInfo(m.id).timestamp) }}
                                            </span>
                                            <span 
                                                class="attendance-method" 
                                                :class="getAttendanceInfo(m.id).method === 'qr' ? 'method-qr' : 'method-manual'">
                                                {{ getAttendanceInfo(m.id).method === 'qr' ? '📱 QR' : '✋ Thủ công' }}
                                            </span>
                                            <span 
                                                v-if="getAttendanceInfo(m.id).isLate !== undefined" 
                                                class="late-status"
                                                :class="getAttendanceInfo(m.id).isLate ? 'is-late' : 'on-time'">
                                                {{ getAttendanceInfo(m.id).isLate ? `⏰ Muộn ${getAttendanceInfo(m.id).lateMinutes}p` : '✓ Đúng giờ' }}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions"><button class="btn btn-primary" @click="saveAttendance">Lưu Điểm Danh</button></div>
                </div>
            </div>
        </div>

        <!-- QR Code Modal -->
        <div class="modal" v-if="showQRModal" style="display: flex;">
            <div class="modal-content" style="max-width: 450px; text-align: center;">
                <div class="modal-header">
                    <h2>Mã QR Điểm Danh</h2>
                    <button class="modal-close" @click="closeQRModal">×</button>
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

// Edit Modal State
const showEditModal = ref(false);
const editForm = reactive({ 
    id: null, 
    date: '', 
    startTime: '', 
    matchType: 'friendly', 
    opponent: '', 
    location: ''
});

// Attendance Modal State
const showAttendanceModal = ref(false);
const attendanceForm = reactive({ 
    match: null,
    attendanceIds: [], 
    originalAttendance: [] 
});

// QR Modal State
const showQRModal = ref(false);
const currentQRCode = ref(null);
const selectedMatch = ref(null);

// Edit Modal Functions
const openEditModal = (match = null) => {
    if (match) {
        editForm.id = match.id;
        editForm.date = match.date;
        editForm.startTime = match.startTime || '';
        editForm.matchType = match.matchType || 'friendly';
        editForm.opponent = match.opponent;
        editForm.location = match.location;
    } else {
        editForm.id = null;
        editForm.date = new Date().toISOString().split('T')[0];
        editForm.startTime = '';
        editForm.matchType = 'friendly';
        editForm.opponent = '';
        editForm.location = '';
    }
    showEditModal.value = true;
};

const closeEditModal = () => showEditModal.value = false;

const saveEdit = () => {
    // When editing, we only save match info, not attendance
    const matchData = { ...editForm };
    
    if (editForm.id) {
        // For existing match, preserve attendance
        const existingMatch = sortedMatches.value.find(m => m.id === editForm.id);
        if (existingMatch) {
            matchData.attendance = existingMatch.attendance;
        }
    } else {
        // For new match, create default attendance (all absent)
        matchData.attendanceIds = [];
    }
    
    saveMatch(matchData);
    closeEditModal();
};

// Attendance Modal Functions
const openAttendanceModal = (match) => {
    attendanceForm.match = match;
    attendanceForm.attendanceIds = match.attendance.filter(a => a.status === 'present').map(a => a.memberId);
    attendanceForm.originalAttendance = JSON.parse(JSON.stringify(match.attendance));
    showAttendanceModal.value = true;
};

const closeAttendanceModal = () => {
    showAttendanceModal.value = false;
    attendanceForm.match = null;
    attendanceForm.attendanceIds = [];
    attendanceForm.originalAttendance = [];
};

const saveAttendance = () => {
    const matchData = {
        id: attendanceForm.match.id,
        date: attendanceForm.match.date,
        startTime: attendanceForm.match.startTime,
        matchType: attendanceForm.match.matchType,
        opponent: attendanceForm.match.opponent,
        location: attendanceForm.match.location,
        attendanceIds: attendanceForm.attendanceIds,
        preserveAttendanceData: true,
        originalAttendance: attendanceForm.originalAttendance
    };
    
    saveMatch(matchData);
    closeAttendanceModal();
};

// Get attendance info for a member in the attendance form
const getAttendanceInfo = (memberId) => {
    if (!attendanceForm.match) return null;
    
    const attendance = attendanceForm.originalAttendance.find(a => a.memberId === memberId);
    if (!attendance || attendance.status !== 'present') return null;
    
    return {
        timestamp: attendance.timestamp,
        method: attendance.attendanceMethod || 'manual',
        isLate: attendance.isLate,
        lateMinutes: attendance.lateMinutes,
        lateFine: attendance.lateFine
    };
};

// Format attendance time
const formatAttendanceTime = (timestamp) => {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return d.toLocaleString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit'
    });
};

// Handle attendance change
const onAttendanceChange = (memberId) => {
    console.log('Attendance changed for member:', memberId, 'Checked:', attendanceForm.attendanceIds.includes(memberId));
};

// QR Modal Functions
const showQRCode = async (match) => {
    selectedMatch.value = match;
    showQRModal.value = true;
    currentQRCode.value = null;
    
    const qrCode = await generateQR(match.id, match.date);
    currentQRCode.value = qrCode;
};

const closeQRModal = () => {
    showQRModal.value = false;
    currentQRCode.value = null;
    selectedMatch.value = null;
};

// Delete Function
const handleDelete = (id) => {
    if(confirm('Xóa trận này?')) deleteMatch(id);
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

/* Match Info Banner */
.match-info-banner {
    background: var(--gradient-primary);
    color: white;
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    margin-bottom: 1.5rem;
    text-align: center;
}

.match-info-banner h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: white;
}

.match-info-banner p {
    margin: 0;
    opacity: 0.9;
    font-size: 0.875rem;
}

/* Enhanced Attendance List Styles */
.attendance-list-enhanced {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 400px;
    overflow-y: auto;
    padding: 0.5rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
}

.attendance-item-enhanced {
    background: var(--bg-primary);
    border-radius: var(--radius-sm);
    padding: 0.5rem;
    transition: all 0.2s ease;
}

.attendance-item-enhanced:hover {
    background: var(--bg-hover);
}

.attendance-checkbox-wrapper {
    display: flex;
    align-items: flex-start;
}

.attendance-checkbox-wrapper input[type="checkbox"] {
    margin-top: 0.25rem;
    margin-right: 0.75rem;
    cursor: pointer;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}

.attendance-label {
    flex: 1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.member-name {
    font-weight: 600;
    color: var(--text-primary);
}

.attendance-info {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

.attendance-time {
    color: var(--text-muted);
}

.attendance-method {
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.7rem;
}

.method-qr {
    background: rgba(59, 130, 246, 0.1);
    color: var(--primary-500);
}

.method-manual {
    background: rgba(168, 85, 247, 0.1);
    color: var(--purple-500);
}

.late-status {
    padding: 0.125rem 0.5rem;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.7rem;
}

.is-late {
    background: rgba(251, 191, 36, 0.1);
    color: var(--warning-500);
}

.on-time {
    background: rgba(34, 197, 94, 0.1);
    color: var(--success-500);
}

.attendance-method-badge {
    display: inline-block;
    margin-left: 0.5rem;
    font-size: 0.875rem;
}
</style>

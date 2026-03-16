<template>
    <div class="page-content">
        <div class="page-actions">
            <button class="btn btn-primary" @click="openAddModal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Thêm Trận Đấu
            </button>
        </div>

        <div class="matches-list">
            <div v-for="match in sortedMatches" :key="match.id" class="match-card">
                <div class="match-card-header">
                    <div>
                        <div class="match-card-title">{{ getMatchDisplayTitle(match) }}</div>
                        <div class="match-card-date">
                            <span class="badge" :class="getMatchBadgeClass(match.matchType)">
                                {{ match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối' }}
                            </span>
                            {{ match.opponent || 'Chưa có đối thủ' }}
                        </div>
                        <div class="match-card-date">{{ match.location || 'Chưa có địa điểm' }}</div>
                    </div>
                    <div style="text-align: right;">
                        <div class="match-card-date">{{ formatDate(match.date) }}</div>
                        <div v-if="match.startTime" class="match-card-date" style="font-size: 0.875rem; color: var(--text-secondary);">
                            🕐 {{ match.startTime }}
                        </div>
                        <div style="text-align: right; margin-top: 4px;">
                            <span class="badge badge-success">{{ getAttendanceCount(match, 'present') }} có mặt</span>
                            <span class="badge badge-danger">{{ getAttendanceCount(match, 'absent') }} vắng</span>
                        </div>
                    </div>
                </div>

                <div class="match-card-body">
                    <div class="attendance-grid">
                        <template v-for="att in match.attendance" :key="att.memberId">
                            <div v-if="getMemberName(att.memberId)" class="attendance-item">
                                <div class="attendance-status" :class="att.status"></div>
                                <div class="attendance-content">
                                    <div class="attendance-name">{{ getMemberName(att.memberId) }}</div>
                                    <div v-if="att.status === 'present' && att.timestamp" class="attendance-detail">
                                        <span>{{ formatTimeOnly(att.timestamp) }} {{ formatDateOnly(att.timestamp) }} ✓</span>
                                        <span :style="{ color: att.isLate ? 'var(--warning-400)' : 'var(--success-400)', fontWeight: '600' }">
                                            {{ att.isLate ? `Muộn ${att.lateMinutes || 0} phút` : 'Đúng giờ' }}
                                        </span>
                                        <span v-if="att.lateFine > 0" style="color: var(--danger-400); font-weight: 700;">
                                            {{ formatCurrency(att.lateFine) }} 💰
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="match-card-actions">
                        <button class="btn-action btn-qr" @click="generateAndShowQR(match)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <path d="M3 9h18"></path><path d="M9 21V9"></path>
                            </svg>
                            Mã QR
                        </button>
                        <button class="btn-action btn-attendance" @click="openAttendanceModal(match)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Điểm danh
                        </button>
                        <button class="btn-action btn-edit" @click="openEditModal(match)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Sửa
                        </button>
                        <button class="btn-action btn-delete" @click="handleDeleteMatch(match.id)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Match Form Modal -->
        <div v-if="showMatchModal" class="modal" style="display: flex;">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>{{ matchForm.id ? 'Sửa' : 'Thêm' }} Trận Đấu</h2>
                    <button class="modal-close" @click="closeMatchModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Loại Trận Đấu</label>
                        <select v-model="matchForm.matchType" class="form-control">
                            <option value="friendly">Đấu tập</option>
                            <option value="competitive">Đấu đối</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Ngày</label>
                        <input type="date" v-model="matchForm.date" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Giờ Bắt Đầu</label>
                        <input type="time" v-model="matchForm.startTime" class="form-control" placeholder="HH:MM">
                    </div>
                    <div class="form-group">
                        <label>Đối Thủ</label>
                        <input type="text" v-model="matchForm.opponent" class="form-control" placeholder="Tên đội đối thủ">
                    </div>
                    <div class="form-group">
                        <label>Địa Điểm</label>
                        <input type="text" v-model="matchForm.location" class="form-control" placeholder="Sân vận động">
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary" @click="handleSaveMatch">Lưu</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Manual Attendance Modal -->
        <div v-if="showAttendanceModal" class="modal" style="display: flex;">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>Điểm Danh Thủ Công</h2>
                    <button class="modal-close" @click="closeAttendanceModal">×</button>
                </div>
                <div class="modal-body">
                    <div v-if="selectedMatchForAttendance" class="match-info-banner">
                        <h3>{{ getMatchDisplayTitle(selectedMatchForAttendance) }}</h3>
                        <p>{{ selectedMatchForAttendance.opponent || 'Chưa có đối thủ' }} • {{ selectedMatchForAttendance.location || 'Chưa có địa điểm' }}</p>
                    </div>
                    <div class="form-group">
                        <label>Chọn thành viên có mặt</label>
                        <div class="attendance-list-enhanced">
                            <div v-for="member in members" :key="member.id" class="attendance-item-enhanced">
                                <div class="attendance-checkbox-wrapper">
                                    <input type="checkbox" :id="'att-' + member.id" :value="member.id" v-model="attendanceState.attendanceIds">
                                    <label :for="'att-' + member.id" class="attendance-label">
                                        <span class="member-name">{{ member.name }}</span>
                                        <span v-if="getManualAttendanceInfo(member.id)" class="attendance-info">
                                            <span class="attendance-time">{{ formatManualTime(getManualAttendanceInfo(member.id).timestamp) }}</span>
                                            <span class="attendance-method" :class="getManualAttendanceInfo(member.id).method === 'qr' ? 'method-qr' : 'method-manual'">
                                                {{ getManualAttendanceInfo(member.id).method === 'qr' ? '📱 QR' : '✋ Thủ công' }}
                                            </span>
                                            <span v-if="getManualAttendanceInfo(member.id).isLate !== undefined" class="late-status" :class="getManualAttendanceInfo(member.id).isLate ? 'is-late' : 'on-time'">
                                                {{ getManualAttendanceInfo(member.id).isLate ? `⏰ Muộn ${getManualAttendanceInfo(member.id).lateMinutes}p` : '✓ Đúng giờ' }}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button class="btn btn-primary" @click="handleSaveAttendance">Lưu Điểm Danh</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- QR Code Modal -->
        <div v-if="showQRModal" class="modal" style="display: flex;">
            <div class="modal-content" style="max-width: 450px; text-align: center;">
                <div class="modal-header">
                    <h2>Quét Mã Điểm Danh</h2>
                    <button class="modal-close" @click="closeQRModal">×</button>
                </div>
                <div class="modal-body">
                    <div v-if="qrCodeData">
                        <div style="margin-bottom: 1rem; color: var(--text-secondary);">
                            {{ getMatchDisplayTitle(matchForQR) }}
                        </div>
                        <img :src="qrCodeData" alt="Attendance QR Code" style="width: 100%; max-width: 300px; margin: 0 auto; border: 8px solid white; border-radius: var(--radius-lg);">
                        <p style="margin-top: 1.5rem; font-weight: 500;">Thành viên quét mã này để ghi nhận điểm danh.</p>
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
import { ref, reactive, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useQRAttendance as useQR } from '../composables/useQRAttendance';

const { sortedMatches, members, getMemberName, saveMatch, deleteMatch } = useAppState();
const { generateQR } = useQR();

const showMatchModal = ref(false);
const matchForm = reactive({
    id: null,
    date: '',
    startTime: '',
    matchType: 'friendly',
    opponent: '',
    location: ''
});

const showAttendanceModal = ref(false);
const selectedMatchForAttendance = ref(null);
const attendanceState = reactive({
    attendanceIds: [],
    originalAttendance: []
});

const showQRModal = ref(false);
const qrCodeData = ref(null);
const matchForQR = ref(null);

const openAddModal = () => {
    matchForm.id = null;
    matchForm.date = new Date().toISOString().split('T')[0];
    matchForm.startTime = '';
    matchForm.matchType = 'friendly';
    matchForm.opponent = '';
    matchForm.location = '';
    showMatchModal.value = true;
};

const openEditModal = (match) => {
    matchForm.id = match.id;
    matchForm.date = match.date;
    matchForm.startTime = match.startTime || '';
    matchForm.matchType = match.matchType || 'friendly';
    matchForm.opponent = match.opponent;
    matchForm.location = match.location;
    showMatchModal.value = true;
};

const closeMatchModal = () => {
    showMatchModal.value = false;
};

const handleSaveMatch = () => {
    const data = { ...matchForm };
    if (matchForm.id) {
        const existing = sortedMatches.value.find(m => m.id === matchForm.id);
        if (existing) data.attendance = existing.attendance;
    } else {
        data.attendanceIds = [];
    }
    saveMatch(data);
    closeMatchModal();
};

const openAttendanceModal = (match) => {
    selectedMatchForAttendance.value = match;
    const attList = Array.isArray(match.attendance) ? match.attendance : Object.values(match.attendance || {});
    attendanceState.attendanceIds = attList
        .filter(a => a.status === 'present')
        .map(a => a.memberId);
    attendanceState.originalAttendance = JSON.parse(JSON.stringify(attList));
    showAttendanceModal.value = true;
};

const closeAttendanceModal = () => {
    showAttendanceModal.value = false;
    selectedMatchForAttendance.value = null;
    attendanceState.attendanceIds = [];
    attendanceState.originalAttendance = [];
};

const handleSaveAttendance = () => {
    const match = selectedMatchForAttendance.value;
    const data = {
        id: match.id,
        date: match.date,
        startTime: match.startTime,
        matchType: match.matchType,
        opponent: match.opponent,
        location: match.location,
        attendanceIds: attendanceState.attendanceIds,
        preserveAttendanceData: true,
        originalAttendance: attendanceState.originalAttendance
    };
    saveMatch(data);
    closeAttendanceModal();
};

const getManualAttendanceInfo = (memberId) => {
    if (!selectedMatchForAttendance.value) return null;
    const att = attendanceState.originalAttendance.find(a => a.memberId === memberId);
    if (!att || att.status !== 'present') return null;
    return {
        timestamp: att.timestamp,
        method: att.attendanceMethod || 'manual',
        isLate: att.isLate,
        lateMinutes: att.lateMinutes,
        lateFine: att.lateFine
    };
};

const formatManualTime = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', hour12: false });
};

const generateAndShowQR = async (match) => {
    matchForQR.value = match;
    showQRModal.value = true;
    qrCodeData.value = null;
    const qr = await generateQR(match.id, match.date);
    qrCodeData.value = qr;
};

const closeQRModal = () => {
    showQRModal.value = false;
    qrCodeData.value = null;
    matchForQR.value = null;
};

const handleDeleteMatch = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa trận đấu này?')) {
        deleteMatch(id);
    }
};

const formatDate = (date) => (date ? new Date(date).toLocaleDateString('vi-VN') : '');

const getMatchDisplayTitle = (match) => {
    if (!match) return '';
    const type = match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối';
    return `Trận ${type} ${formatDate(match.date)}`;
};

const getMatchBadgeClass = (type) => (type === 'friendly' ? 'badge-info' : 'badge-warning');

const formatDateTime = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', hour12: false });
};

const formatTimeOnly = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const formatDateOnly = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const getAttendanceCount = (match, status) => {
    if (!match.attendance) return 0;
    const attList = Array.isArray(match.attendance) ? match.attendance : Object.values(match.attendance);
    return attList.filter(a => a.status === status).length;
};
</script>

<style scoped>
.page-content { padding: var(--spacing-xl); }
.page-actions { margin-bottom: var(--spacing-xl); }
.matches-list { display: flex; flex-direction: column; gap: var(--spacing-xl); }
.match-card { background: var(--bg-tertiary); border: 1px solid var(--border-primary); border-radius: var(--radius-xl); overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, box-shadow 0.2s; }
.match-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-xl); }
.match-card-header { padding: var(--spacing-lg); background: rgba(255, 255, 255, 0.05); border-bottom: 1px solid var(--border-primary); display: flex; justify-content: space-between; align-items: center; }
.match-card-title { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; }
.match-card-date { font-size: 0.875rem; color: var(--text-secondary); }
.match-card-body { padding: var(--spacing-lg); flex: 1; }
.attendance-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); 
    gap: 0.75rem; 
    margin-bottom: var(--spacing-lg); 
}
.attendance-item { 
    display: flex; 
    align-items: center; 
    gap: 0.6rem; 
    padding: 0.75rem; 
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-md); 
    transition: all 0.2s;
}
.attendance-item:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
}
.attendance-status { 
    width: 6px; 
    height: 6px; 
    border-radius: 50%; 
    margin-top: 0; 
    flex-shrink: 0; 
}
.attendance-status.present { background: var(--success-500); box-shadow: 0 0 10px var(--success-500); }
.attendance-status.absent { background: var(--danger-500); box-shadow: 0 0 10px var(--danger-500); }
.attendance-name { 
    font-size: 0.8rem; 
    color: var(--text-primary); 
    font-weight: 600;
    line-height: 1.3;
}
.attendance-detail {
    font-size: 0.7rem;
    color: var(--text-muted);
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.match-card-actions { 
    margin-top: 1rem; 
    display: flex; 
    gap: 0.75rem; 
    justify-content: flex-end; 
    flex-wrap: wrap; 
    border-top: 1px solid var(--border-primary); 
    padding-top: 1.25rem; 
}
.btn-action {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    font-weight: 600;
    font-size: 0.85rem;
    border-radius: var(--radius-full);
    transition: all 0.3s;
}
.btn-qr { background: #0891b2; color: white; }
.btn-attendance { background: #16a34a; color: white; }
.btn-edit { background: #7c3aed; color: white; }
.btn-delete { background: #dc2626; color: white; }
.btn-action:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    filter: brightness(1.1);
}
.btn-action svg {
    width: 16px;
    height: 16px;
}
.match-info-banner { background: var(--bg-secondary); border-radius: var(--radius-lg); padding: var(--spacing-lg); margin-bottom: var(--spacing-xl); border: 1px solid var(--border-primary); }
.attendance-list-enhanced { max-height: 400px; overflow-y: auto; background: var(--bg-secondary); border: 1px solid var(--border-primary); border-radius: var(--radius-lg); padding: 0.5rem; }
.attendance-item-enhanced { padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border-primary); transition: all 0.2s; border-radius: var(--radius-md); }
.attendance-item-enhanced:hover { background: rgba(255, 255, 255, 0.05); }
.attendance-item-enhanced:last-child { border-bottom: none; }
.attendance-checkbox-wrapper { display: flex; align-items: center; gap: 1rem; width: 100%; }
.attendance-checkbox-wrapper input[type="checkbox"] { width: 22px !important; height: 22px !important; flex-shrink: 0; cursor: pointer; accent-color: var(--primary-500); margin: 0; padding: 0; border-radius: 4px; }
.attendance-label { flex: 1; display: flex; align-items: center; justify-content: space-between; cursor: pointer; margin: 0; min-height: 40px; }
.member-name { font-weight: 600; font-size: 1rem; display: flex; align-items: center; text-transform: none; color: var(--text-primary); }
.attendance-info { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; flex-wrap: wrap; justify-content: flex-end; }
.attendance-time { font-family: monospace; font-size: 0.85rem; color: var(--text-secondary); background: rgba(255,255,255,0.05); padding: 0.2rem 0.4rem; border-radius: var(--radius-sm); }
.attendance-method { padding: 0.2rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.method-qr { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
.method-manual { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }
.late-status { font-weight: 600; padding: 0.2rem 0.6rem; border-radius: var(--radius-sm); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
.late-status.is-late { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
.late-status.on-time { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }

.attendance-method-badge { margin-left: 4px; padding: 0 4px; border-radius: 4px; font-size: 0.7rem; }
.attendance-method-badge.method-qr { background: rgba(59, 130, 246, 0.1); }
.attendance-method-badge.method-manual { background: rgba(52, 211, 153, 0.1); }
</style>

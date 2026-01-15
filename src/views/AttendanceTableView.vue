<template>
    <div class="page-content">
        <!-- Header Controls -->
        <div class="table-controls">
            <div class="month-selector">
                <button class="btn btn-sm btn-secondary" @click="previousMonth">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <div class="current-month">
                    <h2>{{ currentMonthDisplay }}</h2>
                    <p>Năm {{ currentYear }}</p>
                </div>
                <button class="btn btn-sm btn-secondary" @click="nextMonth">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            
            <div class="legend">
                <div class="legend-item">
                    <div class="legend-color status-present"></div>
                    <span>Có mặt</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color status-late"></div>
                    <span>Muộn</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color status-absent-cp"></div>
                    <span>Vắng (CP)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color status-absent"></div>
                    <span>Vắng</span>
                </div>
            </div>
        </div>

        <!-- Attendance Table -->
        <div class="table-wrapper">
            <table class="attendance-table">
                <thead>
                    <tr>
                        <th class="sticky-col header-cell">STT</th>
                        <th class="sticky-col-name header-cell">Tên<br/>Thành viên</th>
                        <th class="header-cell month-header" colspan="5">
                            Tháng {{ currentMonth }}
                        </th>
                    </tr>
                    <tr>
                        <th class="sticky-col sub-header"></th>
                        <th class="sticky-col-name sub-header"></th>
                        <th class="date-header" v-for="col in 5" :key="col">
                            <template v-if="getColumnMatch(col)">
                                Trận<br/>{{ formatDateShort(getColumnMatch(col)) }}
                            </template>
                            <template v-else>
                                <span class="no-match">-</span>
                            </template>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(member, index) in sortedMembers" :key="member.id">
                        <td class="sticky-col stt-cell">{{ index + 1 }}</td>
                        <td class="sticky-col-name name-cell">{{ member.name }}</td>
                        <td 
                            v-for="col in 5" 
                            :key="col"
                            class="status-cell"
                            :class="getColumnStatusClass(member.id, col)"
                            @click="showColumnAttendanceDetail(member, col)">
                            <div class="status-content">
                                {{ getColumnStatusText(member.id, col) }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Detail Modal -->
        <div class="modal" v-if="showDetailModal" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Chi Tiết Điểm Danh</h2>
                    <button class="modal-close" @click="closeDetailModal">×</button>
                </div>
                <div class="modal-body">
                    <div v-if="selectedDetail">
                        <div class="detail-info">
                            <p><strong>Thành viên:</strong> {{ selectedDetail.memberName }}</p>
                            <p><strong>Ngày:</strong> {{ formatDate(selectedDetail.date) }}</p>
                            <p><strong>Trận đấu:</strong> {{ selectedDetail.matchInfo }}</p>
                            <p><strong>Trạng thái:</strong> 
                                <span class="badge" :class="getStatusBadgeClass(selectedDetail.status)">
                                    {{ getStatusDisplayText(selectedDetail.status) }}
                                </span>
                            </p>
                            <div v-if="selectedDetail.timestamp">
                                <p><strong>Thời gian điểm danh:</strong> {{ formatTimestamp(selectedDetail.timestamp) }}</p>
                                <p v-if="selectedDetail.isLate !== undefined">
                                    <strong>Đúng giờ:</strong> 
                                    <span :style="{ color: selectedDetail.isLate ? 'var(--warning-500)' : 'var(--success-500)' }">
                                        {{ selectedDetail.isLate ? `⏰ Muộn ${selectedDetail.lateMinutes} phút` : '✓ Đúng giờ' }}
                                    </span>
                                </p>
                                <p v-if="selectedDetail.lateFine > 0">
                                    <strong>Phạt muộn:</strong> 
                                    <span style="color: var(--danger-500);">{{ formatCurrency(selectedDetail.lateFine) }}</span>
                                </p>
                                <p v-if="selectedDetail.attendanceMethod">
                                    <strong>Phương thức:</strong> 
                                    {{ selectedDetail.attendanceMethod === 'qr' ? '📱 QR Code' : '✋ Thủ công' }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-else class="empty-state">
                        <p>Không có dữ liệu điểm danh</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAppState } from '../composables/useAppState';

const { members, matches } = useAppState();

// Current month/year state
const currentMonth = ref(new Date().getMonth() + 1); // 1-12
const currentYear = ref(new Date().getFullYear());

// Detail modal state
const showDetailModal = ref(false);
const selectedDetail = ref(null);

// Month names in Vietnamese
const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

// Computed: Current month display
const currentMonthDisplay = computed(() => {
    return monthNames[currentMonth.value - 1];
});

// Computed: Sorted members by name
const sortedMembers = computed(() => {
    return [...members.value].sort((a, b) => a.name.localeCompare(b.name, 'vi'));
});

// Computed: Get all match dates in current month (sorted chronologically)
const monthMatchDates = computed(() => {
    const dates = matches.value
        .filter(match => {
            const matchDate = new Date(match.date);
            return matchDate.getMonth() + 1 === currentMonth.value && 
                   matchDate.getFullYear() === currentYear.value;
        })
        .map(match => match.date)
        .sort((a, b) => new Date(a) - new Date(b));
    
    // Remove duplicates
    return [...new Set(dates)];
});

// Get match date for a specific column (1-5)
// Column 1 = first match, Column 2 = second match, etc.
const getColumnMatch = (columnNumber) => {
    const index = columnNumber - 1; // Convert to 0-indexed
    return monthMatchDates.value[index] || null;
};

// Format date in short format (dd/mm)
const formatDateShort = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
};

// Get attendance status for a member on a specific date
const getAttendanceStatus = (memberId, date) => {
    const match = matches.value.find(m => m.date === date);
    if (!match) return null;
    
    const attendance = match.attendance.find(a => a.memberId === memberId);
    return attendance || null;
};

// Get status class for a column
const getColumnStatusClass = (memberId, columnNumber) => {
    const matchDate = getColumnMatch(columnNumber);
    if (!matchDate) return 'status-no-data';
    
    const attendance = getAttendanceStatus(memberId, matchDate);
    if (!attendance) return 'status-no-data';
    
    if (attendance.status === 'present') {
        if (attendance.isLate) {
            return 'status-late';
        }
        return 'status-present';
    } else if (attendance.status === 'absent') {
        return 'status-absent';
    }
    
    return 'status-no-data';
};

// Get status text for a column
const getColumnStatusText = (memberId, columnNumber) => {
    const matchDate = getColumnMatch(columnNumber);
    if (!matchDate) return '';
    
    const attendance = getAttendanceStatus(memberId, matchDate);
    if (!attendance) return '';
    
    if (attendance.status === 'present') {
        if (attendance.isLate) {
            return 'muộn';
        }
        return 'có mặt';
    } else if (attendance.status === 'absent') {
        return 'vắng';
    }
    
    return '';
};

// Show attendance detail for a column
const showColumnAttendanceDetail = (member, columnNumber) => {
    const matchDate = getColumnMatch(columnNumber);
    if (!matchDate) return;
    
    const attendance = getAttendanceStatus(member.id, matchDate);
    const match = matches.value.find(m => m.date === matchDate);
    
    if (!match) return;
    
    selectedDetail.value = {
        memberName: member.name,
        date: matchDate,
        matchInfo: `${match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối'} - ${match.opponent || 'Chưa có đối thủ'}`,
        status: attendance ? attendance.status : 'absent',
        timestamp: attendance?.timestamp,
        isLate: attendance?.isLate,
        lateMinutes: attendance?.lateMinutes || 0,
        lateFine: attendance?.lateFine || 0,
        attendanceMethod: attendance?.attendanceMethod
    };
    
    showDetailModal.value = true;
};

// Close detail modal
const closeDetailModal = () => {
    showDetailModal.value = false;
    selectedDetail.value = null;
};

// Navigation functions
const previousMonth = () => {
    if (currentMonth.value === 1) {
        currentMonth.value = 12;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
};

const nextMonth = () => {
    if (currentMonth.value === 12) {
        currentMonth.value = 1;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
};

// Format full date
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
};

// Format timestamp
const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return d.toLocaleString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(amount);
};

// Get status badge class
const getStatusBadgeClass = (status) => {
    if (status === 'present') return 'badge-success';
    if (status === 'absent') return 'badge-danger';
    return 'badge-secondary';
};

// Get status display text
const getStatusDisplayText = (status) => {
    if (status === 'present') return 'Có mặt';
    if (status === 'absent') return 'Vắng';
    return 'Không rõ';
};

onMounted(() => {
    // Initialize with current month
    const now = new Date();
    currentMonth.value = now.getMonth() + 1;
    currentYear.value = now.getFullYear();
});
</script>

<style scoped>
.table-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0 0.5rem;
}

.month-selector {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.month-selector .btn {
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
}

.month-selector .btn svg {
    width: 20px;
    height: 20px;
}

.current-month {
    text-align: center;
    min-width: 150px;
}

.current-month h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);
}

.current-month p {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.legend {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
    white-space: nowrap;
}

.legend-color {
    width: 20px;
    height: 20px;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;
}

.status-present {
    background-color: #4ade80;
}

.status-late {
    background-color: #f472b6;
}

.status-absent-cp {
    background-color: #fbbf24;
}

.status-absent {
    background-color: #ef4444;
}

/* Table Styles */
.table-wrapper {
    overflow-x: auto;
    overflow-y: auto;
    max-height: calc(100vh - 280px);
    border-radius: var(--radius-lg);
    background: var(--bg-secondary);
    box-shadow: var(--shadow-lg);
    -webkit-overflow-scrolling: touch;
}

.attendance-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.875rem;
}

.attendance-table thead {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--bg-primary);
}

.header-cell {
    background: var(--gradient-primary);
    color: white;
    padding: 1rem;
    text-align: center;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.month-header {
    font-size: 1rem;
}

.sub-header {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    padding: 0.75rem;
    font-weight: 600;
    border: 1px solid var(--border-color);
}

.date-header {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    padding: 0.75rem 0.5rem;
    text-align: center;
    font-weight: 500;
    min-width: 80px;
    border: 1px solid var(--border-color);
    font-size: 0.75rem;
    line-height: 1.4;
}

.match-date-item {
    padding: 0.25rem 0;
    font-weight: 600;
    color: var(--text-primary);
}

.match-date-item:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 0.25rem;
    padding-bottom: 0.5rem;
}

.no-match {
    color: var(--text-muted);
    font-size: 1.2rem;
    opacity: 0.3;
}

/* Sticky columns */
.sticky-col {
    position: sticky;
    left: 0;
    z-index: 5;
    background: var(--bg-primary);
    min-width: 50px;
    text-align: center;
    border-right: 2px solid var(--border-color);
}

.sticky-col-name {
    position: sticky;
    left: 50px;
    z-index: 5;
    background: var(--bg-primary);
    min-width: 150px;
    max-width: 200px;
    text-align: left;
    border-right: 2px solid var(--border-color);
}

.attendance-table thead .sticky-col,
.attendance-table thead .sticky-col-name {
    z-index: 15;
}

/* Table cells */
.stt-cell {
    padding: 0.75rem 0.5rem;
    font-weight: 600;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
}

.name-cell {
    padding: 0.75rem 1rem;
    font-weight: 500;
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.status-cell {
    padding: 0.5rem;
    text-align: center;
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 80px;
    -webkit-tap-highlight-color: transparent;
}

.status-cell:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0 2px var(--primary-500);
    z-index: 1;
}

.status-cell:active {
    transform: scale(0.98);
}

.status-content {
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.status-cell.status-present .status-content {
    background-color: #4ade80;
}

.status-cell.status-late .status-content {
    background-color: #f472b6;
}

.status-cell.status-absent-cp .status-content {
    background-color: #fbbf24;
}

.status-cell.status-absent .status-content {
    background-color: #ef4444;
}

.status-cell.status-no-data .status-content {
    background-color: transparent;
    color: var(--text-muted);
}

/* Zebra striping for rows */
.attendance-table tbody tr:nth-child(even) .sticky-col,
.attendance-table tbody tr:nth-child(even) .sticky-col-name {
    background: var(--bg-secondary);
}

/* Detail Modal */
.detail-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.detail-info p {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
}

.detail-info strong {
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 0.875rem;
}

.match-detail-card {
    background: var(--bg-tertiary);
    border-radius: var(--radius-md);
    padding: 1rem;
    margin-bottom: 1rem;
    border-left: 3px solid var(--primary-500);
}

.match-detail-card:last-child {
    margin-bottom: 0;
}

.match-detail-card p {
    background: transparent;
    padding: 0.25rem 0;
}

.week-dates {
    font-size: 0.7rem;
    font-weight: 400;
    opacity: 0.9;
}

/* Responsive - Tablet */
@media (max-width: 1024px) {
    .table-controls {
        gap: 1rem;
    }
    
    .legend {
        gap: 0.75rem;
    }
    
    .legend-item {
        font-size: 0.8rem;
    }
    
    .legend-color {
        width: 18px;
        height: 18px;
    }
}

/* Responsive - Mobile */
@media (max-width: 768px) {
    .page-content {
        padding: 1rem 0.5rem;
    }
    
    .table-controls {
        flex-direction: column;
        align-items: stretch;
        margin-bottom: 1rem;
        gap: 1rem;
        padding: 0;
    }
    
    .month-selector {
        justify-content: center;
        order: 1;
    }
    
    .month-selector .btn {
        min-width: 48px;
        min-height: 48px;
        padding: 1rem;
    }
    
    .current-month {
        min-width: 140px;
    }
    
    .current-month h2 {
        font-size: 1.25rem;
    }
    
    .current-month p {
        font-size: 0.8rem;
    }
    
    .legend {
        order: 2;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem;
        background: var(--bg-secondary);
        border-radius: var(--radius-md);
    }
    
    .legend-item {
        font-size: 0.75rem;
    }
    
    .legend-color {
        width: 16px;
        height: 16px;
    }
    
    /* Table adjustments for mobile */
    .table-wrapper {
        max-height: calc(100vh - 320px);
        border-radius: var(--radius-md);
    }
    
    .attendance-table {
        font-size: 0.75rem;
    }
    
    .header-cell {
        padding: 0.75rem 0.5rem;
        font-size: 0.875rem;
    }
    
    .month-header {
        font-size: 0.875rem;
    }
    
    .sub-header {
        padding: 0.5rem 0.25rem;
        font-size: 0.75rem;
    }
    
    .date-header {
        min-width: 65px;
        padding: 0.5rem 0.25rem;
        font-size: 0.65rem;
        line-height: 1.3;
    }
    
    /* Sticky columns mobile */
    .sticky-col {
        min-width: 40px;
    }
    
    .sticky-col-name {
        left: 40px;
        min-width: 100px;
        max-width: 120px;
        font-size: 0.75rem;
    }
    
    .stt-cell {
        padding: 0.5rem 0.25rem;
        font-size: 0.75rem;
    }
    
    .name-cell {
        padding: 0.5rem 0.5rem;
        font-size: 0.75rem;
        line-height: 1.3;
    }
    
    .status-cell {
        min-width: 65px;
        padding: 0.35rem;
    }
    
    .status-content {
        padding: 0.4rem 0.25rem;
        font-size: 0.65rem;
        border-radius: 4px;
    }
    
    /* Better touch targets on mobile */
    .status-cell:active {
        transform: scale(0.95);
        background: var(--bg-hover);
    }
    
    /* Modal adjustments for mobile */
    .detail-info p {
        padding: 0.5rem;
        font-size: 0.875rem;
    }
    
    .detail-info strong {
        font-size: 0.8rem;
    }
}

/* Responsive - Small Mobile */
@media (max-width: 480px) {
    .current-month h2 {
        font-size: 1.1rem;
    }
    
    .legend {
        gap: 0.4rem;
        padding: 0.5rem;
    }
    
    .legend-item {
        font-size: 0.7rem;
    }
    
    .legend-item span {
        display: none;
    }
    
    .legend-item::after {
        content: attr(data-label);
        font-size: 0.7rem;
    }
    
    .sticky-col {
        min-width: 35px;
    }
    
    .sticky-col-name {
        left: 35px;
        min-width: 90px;
        max-width: 100px;
    }
    
    .date-header {
        min-width: 55px;
        font-size: 0.6rem;
    }
    
    .status-cell {
        min-width: 55px;
    }
    
    .status-content {
        font-size: 0.6rem;
        padding: 0.3rem 0.2rem;
    }
}

/* Smooth scrolling for touch devices */
@media (hover: none) and (pointer: coarse) {
    .table-wrapper {
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
    }
    
    .status-cell:hover {
        transform: none;
        box-shadow: none;
    }
}
</style>

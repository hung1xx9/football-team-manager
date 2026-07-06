<template>
    <div class="page-content animate-fade">
            <div class="page-header-fancy">
            <div class="header-action-btns">
                <button v-if="permissions.canAddMatch" class="btn btn-lg btn-primary" @click="openAddModal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 20px; height: 20px;">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Thêm Trận Đấu</span>
                </button>
            </div>
        </div>

        <div class="matches-list">
            <div v-for="(match, index) in displayedMatches" :key="match.id" v-memo="[match, match.attendance, isMobile]" class="match-card list-item-animate" :style="{ animationDelay: (0.1 + index * 0.05) + 's' }">
                <div class="match-card-header" :class="{ 'mobile-header': isMobile }">
                    <div class="match-info-main">
                        <div class="match-card-title">{{ getMatchDisplayTitle(match) }}</div>
                        <div class="match-details-row">
                            <span class="badge" :class="getMatchBadgeClass(match.matchType)">
                                {{ match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối' }}
                            </span>
                            <span class="opponent-name">{{ match.opponent || 'Chưa có đối thủ' }}</span>
                        </div>
                        <div class="match-location">📍 {{ match.location || 'Chưa có địa điểm' }}</div>
                    </div>
                    <div class="match-info-stats">
                        <div class="match-date-time">
                            <span class="date">{{ formatDate(match.date) }}</span>
                            <span v-if="match.startTime" class="time">🕐 {{ match.startTime }}</span>
                        </div>
                        <div class="attendance-summary">
                            <span class="badge badge-success">{{ getAttendanceCount(match, 'present') }} có mặt</span>
                            <span class="badge badge-danger">{{ getAttendanceCount(match, 'absent') }} vắng</span>
                        </div>
                        <div v-if="getRsvpSummary(match).total > 0" class="rsvp-summary-admin">
                            <span class="rsvp-badge rsvp-confirmed" :title="getRsvpConfirmedNames(match)">✅ {{ getRsvpSummary(match).confirmed }}</span>
                            <span class="rsvp-badge rsvp-declined">❌ {{ getRsvpSummary(match).declined }}</span>
                            <span class="rsvp-badge rsvp-pending">⏳ {{ getRsvpSummary(match).notResponded }}</span>
                        </div>
                    </div>
                </div>

                <div class="match-card-body">
                    <div class="attendance-grid">
                        <template v-for="att in match.attendance" :key="att.memberId">
                            <div v-if="getMemberName(att.memberId)" class="attendance-item" :class="att.status" v-memo="[att]">
                                <div class="attendance-status" :class="att.status"></div>
                                <div class="attendance-content">
                                    <div class="attendance-name">
                                        {{ getMemberName(att.memberId) }}
                                        <span v-if="getMemberRsvpStatus(match, att.memberId) === 'confirmed'" title="Đã xác nhận tham gia" class="rsvp-indicator">✅</span>
                                        <span v-else-if="getMemberRsvpStatus(match, att.memberId) === 'declined'" title="Không tham gia" class="rsvp-indicator">❌</span>
                                    </div>
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


                        <button v-if="permissions.canAddMatch" class="btn btn-action btn-messenger-action" @click="handleSendMessenger(match)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.3 8.38 8.38 0 0 1 3.9 1L21 3z"></path>
                            </svg>
                            Gửi TB
                        </button>

                        <button class="btn btn-action btn-edit-action" @click="openEditModal(match)">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Sửa
                        </button>
                        <button class="btn btn-action btn-delete-action" @click="handleDeleteMatch(match.id)">
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
        
        <div v-if="hasMoreMatches" style="text-align: center; margin-top: 16px; margin-bottom: 24px; color: var(--text-muted); font-size: 14px; font-weight: 500;">
            <div class="spinner" style="width: 20px; height: 20px; display: inline-block; margin-right: 8px; vertical-align: middle;"></div>
            Đang tải thêm trận đấu...
        </div>
        <div v-else-if="sortedMatches.length > 0" style="text-align: center; margin-top: 16px; margin-bottom: 16px; color: var(--text-muted); font-size: 13px;">
            Đã hiển thị tất cả các trận đấu
        </div>
        <div ref="bottomSentinel" style="height: 1px;"></div>
        <!-- Match Form Modal -->
        <Transition name="premium-modal">
        <div v-if="showMatchModal" class="modal" style="display: flex;" @click.self="closeMatchModal">
            <div class="modal-content modal-large">

                <div class="modal-header">
                    <h2>{{ matchForm.id ? 'Sửa' : 'Thêm' }} Trận Đấu</h2>
                    <button class="modal-close" @click="closeMatchModal">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Loại Trận Đấu</label>
                        <BaseSelect 
                            v-model="matchForm.matchType"
                            :options="[
                                { value: 'friendly', label: 'Đấu tập' },
                                { value: 'competitive', label: 'Đấu đối' }
                            ]"
                        />
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
        </Transition>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useBreakpoints } from '../composables/useBreakpoints';
import { useAppState } from '../composables/useAppState';
import BaseSelect from '../components/BaseSelect.vue';
import { useAuth } from '../composables/useAuth';
import { useEscapeClose } from '../composables/useEscapeClose';

const { isMobile } = useBreakpoints();

const { 
    sortedMatches, members, fixedMatches, getMemberName, 
    saveMatch, deleteMatch, sendMessengerNotification,
    showConfirm, showAlert, updateFromFirebase 
} = useAppState();

const { permissions } = useAuth();

const displayCount = ref(3);

const displayedMatches = computed(() => {
    return sortedMatches.value.slice(0, displayCount.value);
});

const hasMoreMatches = computed(() => {
    return displayCount.value < sortedMatches.value.length;
});

const loadMore = () => {
    displayCount.value += 3;
};

const bottomSentinel = ref(null);

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreMatches.value) {
            loadMore();
        }
    }, { rootMargin: '200px' });

    if (bottomSentinel.value) {
        observer.observe(bottomSentinel.value);
    }

    onUnmounted(() => {
        if (bottomSentinel.value) {
            observer.unobserve(bottomSentinel.value);
        }
        observer.disconnect();
    });
});

const showMatchModal = ref(false);

const matchForm = reactive({
    id: null,
    date: '',
    startTime: '',
    matchType: 'friendly',
    opponent: '',
    location: ''
});



const openAddModal = () => {
    matchForm.id = null;
    
    // Smart Defaults: Check if there's a suggested next match from fixedMatches
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentDay = today.getDay();
    
    let suggestedMatch = null;
    if (fixedMatches.value.length > 0) {
        // Find the next fixed match day
        const sortedFixed = [...fixedMatches.value].sort((a, b) => {
            let diffA = Number(a.dayOfWeek) - currentDay;
            if (diffA < 0) diffA += 7;
            let diffB = Number(b.dayOfWeek) - currentDay;
            if (diffB < 0) diffB += 7;
            return diffA - diffB;
        });
        
        const nextFixed = sortedFixed[0];
        let daysUntil = Number(nextFixed.dayOfWeek) - currentDay;
        if (daysUntil < 0) daysUntil += 7;
        
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + daysUntil);
        
        suggestedMatch = {
            date: nextDate.toISOString().split('T')[0],
            startTime: nextFixed.startTime || '',
            matchType: nextFixed.matchType || 'friendly',
            opponent: nextFixed.opponent || '',
            location: nextFixed.location || ''
        };
    }

    matchForm.date = suggestedMatch?.date || new Date().toISOString().split('T')[0];
    matchForm.startTime = suggestedMatch?.startTime || '';
    matchForm.matchType = suggestedMatch?.matchType || 'friendly';
    matchForm.opponent = suggestedMatch?.opponent || '';
    matchForm.location = suggestedMatch?.location || '';
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







const handleDeleteMatch = async (id) => {
    if (await showConfirm('Bạn có chắc chắn muốn xóa trận đấu này?')) {
        deleteMatch(id);
    }
};

const handleSendMessenger = async (match) => {
    const result = await sendMessengerNotification(match);
    if (result && result.success) {
        await showAlert('✅ Đã gửi thông báo Messenger thành công!');
    } else {
        await showAlert('❌ Gửi thông báo thất bại: ' + (result?.message || 'Lỗi không xác định'));
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

// Register Escape key to close modals
useEscapeClose(() => closeMatchModal(), showMatchModal);

// RSVP Summary for Admin
const getRsvpSummary = (match) => {
    const rsvp = match.rsvp || [];
    const confirmed = rsvp.filter(r => r.status === 'confirmed').length;
    const declined = rsvp.filter(r => r.status === 'declined').length;
    const total = confirmed + declined;
    const notResponded = members.value.length - confirmed - declined;
    return { confirmed, declined, notResponded, total };
};

const getRsvpConfirmedNames = (match) => {
    if (!match.rsvp) return '';
    const confirmed = match.rsvp
        .filter(r => r.status === 'confirmed')
        .map(r => getMemberName(r.memberId) || 'Unknown')
        .join(', ');
    return confirmed ? `Tham gia: ${confirmed}` : '';
};

const getMemberRsvpStatus = (match, memberId) => {
    if (!match.rsvp) return null;
    const rsvp = match.rsvp.find(r => String(r.memberId) === String(memberId));
    return rsvp ? rsvp.status : null;
};
</script>

<style scoped>
.page-content { padding: var(--container-padding); }

.matches-list { display: flex; flex-direction: column; gap: var(--spacing-6); }

.match-card { 
    background: var(--bg-secondary); 
    border: 1px solid var(--border-color); 
    border-radius: var(--radius-lg); 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
    transition: all 0.2s; 
    box-shadow: var(--shadow-sm);
}

.match-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--primary-300); }

.match-card-header { 
    padding: 16px var(--container-padding); 
    background: var(--bg-tertiary); 
    border-bottom: 1px solid var(--border-color); 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
}

.match-card-title { font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }

.match-card-body { padding: var(--container-padding); flex: 1; }

.attendance-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); 
    gap: 12px; 
    margin-bottom: 20px; 
}

.attendance-item { 
    display: flex; 
    align-items: flex-start; 
    gap: 12px; 
    padding: 12px; 
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md); 
    transition: all 0.2s;
}

.attendance-item.present { border-left: 3px solid var(--success); }
.attendance-item.absent { border-left: 3px solid var(--danger); }

.attendance-item:hover {
    background: var(--bg-tertiary);
    border-color: var(--primary-200);
    box-shadow: var(--shadow-sm);
}

.attendance-status { 
    width: 6px; 
    height: 6px; 
    border-radius: 50%; 
    margin-top: 6px; 
    flex-shrink: 0; 
}

.attendance-status.present { background: var(--success); }
.attendance-status.absent { background: var(--danger); }

.attendance-name { 
    font-size: 13px; 
    color: var(--text-primary); 
    font-weight: 700;
    line-height: 1.4;
}

.attendance-detail {
    font-size: 11px;
    color: var(--text-secondary);
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-weight: 500;
}

.btn-messenger-action { color: #0084ff; }
.btn-messenger-action:hover { background: rgba(0, 132, 255, 0.1); border-color: #0084ff; }

.match-card-actions { 
    margin-top: 8px; 
    display: flex; 
    gap: 8px; 
    justify-content: flex-end; 
    flex-wrap: wrap; 
    border-top: 1px solid var(--border-color); 
    padding-top: 16px; 
}

/* Mobile Optimizations */
.mobile-header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px;
    padding: 16px !important;
}

.mobile-header .match-info-stats {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid var(--border-color);
    padding-top: 12px;
}

.match-details-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
}

.opponent-name { font-weight: 700; color: var(--text-primary); font-size: 14px; }
.match-location { font-size: 12px; color: var(--text-secondary); font-weight: 500;}

.match-date-time { display: flex; flex-direction: column; gap: 2px; }
.match-date-time .date { font-weight: 700; color: var(--primary-700); font-size: 14px; }
.match-date-time .time { font-size: 12px; color: var(--text-secondary); font-weight: 500;}

@media (max-width: 600px) {
    .attendance-grid { grid-template-columns: 1fr; }
    .match-card-actions { justify-content: stretch; }
}

/* RSVP Admin Summary */
.rsvp-summary-admin {
    display: flex;
    gap: 6px;
    margin-top: 4px;
}

.rsvp-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    cursor: default;
}

.rsvp-confirmed {
    background: rgba(34, 197, 94, 0.12);
    color: var(--success);
}

.rsvp-declined {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
}

.rsvp-pending {
    background: var(--bg-tertiary);
    color: var(--text-muted);
}

.rsvp-indicator {
    font-size: 0.85em;
    margin-left: 4px;
    vertical-align: text-top;
}
</style>

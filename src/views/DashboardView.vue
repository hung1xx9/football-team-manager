<template>
    <div class="page-content">
        <!-- Stats Overview -->
        <div class="stats-grid">
            <div class="stat-card stat-primary animate-spring animate-stagger-1">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    </svg>
                </div>
                <div class="stat-content" :class="{ 'skeleton': stats.totalMembers === 0 }">
                    <div class="stat-label">Tổng Thành Viên</div>
                    <div class="stat-value">{{ stats.totalMembers }}</div>
                </div>
            </div>
            <div class="stat-card stat-success animate-spring animate-stagger-2">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                </div>
                <div class="stat-content" :class="{ 'skeleton': stats.totalMembers === 0 }">
                    <div class="stat-label">Tỷ Lệ Tham Gia</div>
                    <div class="stat-value">{{ stats.attendanceRate }}%</div>
                </div>
            </div>
            <div class="stat-card stat-warning animate-spring animate-stagger-3">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2 L12 22"></path>
                        <path d="M2 12 L22 12"></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-label">Trận Đã Đá</div>
                    <div class="stat-value">{{ stats.totalMatches }}</div>
                </div>
            </div>
            <div class="stat-card stat-info animate-spring animate-stagger-4">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <div class="stat-content" :class="{ 'skeleton': stats.totalMembers === 0 }">
                    <div class="stat-label">Quỹ Đội</div>
                    <div class="stat-value">{{ formatCurrency(stats.balance) }}</div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="page-header-fancy" v-if="isAdmin">
            <div class="header-action-btns">
                <button class="btn btn-hero btn-hero-primary" @click="$router.push('/attendance-table')">
                    <div class="btn-hero-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <polyline points="16 11 18 13 22 9"></polyline>
                        </svg>
                    </div>
                    <span class="btn-hero-text">Ghi Điểm Danh</span>
                </button>
                <button class="btn btn-hero btn-hero-income" @click="$router.push('/finance')">
                    <div class="btn-hero-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                    <span class="btn-hero-text">Ghi Thu Chi</span>
                </button>
                <button class="btn btn-hero btn-hero-secondary" @click="$router.push('/members')">
                    <div class="btn-hero-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <span class="btn-hero-text">Quản Lý Thành Viên</span>
                </button>
            </div>
        </div>

        <div class="dashboard-grid">
            <!-- Recent Matches -->
            <div class="card animate-spring animate-stagger-1">
                <div class="card-header">
                    <h2>Trận Đấu Gần Đây</h2>
                </div>
                <div class="card-content">
                    <div v-if="recentMatches.length > 0" class="recent-matches-list">
                        <div v-for="(match, index) in recentMatches" :key="match.id" v-memo="[match, match.attendance, isMobile, pendingAttendances.length]" class="match-item list-item-animate" :class="{ 'mobile-match-item': isMobile }" :style="{ animationDelay: (0.1 + index * 0.05) + 's' }">
                            <div class="match-info">
                                <div class="match-date">{{ formatDate(match.date) }} {{ match.startTime ? `- ${match.startTime}` : '' }}</div>
                                <div class="match-opponent">
                                    <span class="badge" :class="match.matchType === 'friendly' ? 'badge-info' : 'badge-warning'" style="margin-right: 8px;">
                                        {{ match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối' }}
                                    </span>
                                    {{ match.opponent || 'Chưa có đối thủ' }}
                                </div>
                                <div class="match-stats">📍 {{ match.location || 'Chưa có địa điểm' }}</div>
                            </div>
                            <div class="match-actions">
                                <div class="match-attendance">
                                    <span class="attendance-present">{{ getPresentCount(match) }}</span>
                                    <span class="attendance-separator">/</span>
                                    <span class="attendance-absent">{{ getAbsentCount(match) }}</span>
                                </div>
                                <div v-if="!isPending(match.id) && getLastRejectedRequest(match.id)" class="rejection-msg">
                                    {{ getLastRejectedRequest(match.id).rejectionReason }}
                                </div>
                                <button 
                                    v-if="canCheckin(match) && !isRejected(match.id)" 
                                    class="btn" 
                                    :class="[
                                        isMobile ? 'btn-md' : 'btn-sm',
                                        isPending(match.id) ? 'btn-secondary' : 'btn-primary'
                                    ]" 
                                    @click="handleCheckin(match)" 
                                    :disabled="isCheckingIn || isPending(match.id)"
                                >
                                    <template v-if="isCheckingIn">...</template>
                                    <template v-else-if="isPending(match.id)">Đã gửi yêu cầu</template>
                                    <template v-else>Điểm Danh</template>
                                </button>
                                <div v-else-if="isRejected(match.id)" class="rejected-badge">
                                    🚫 Đã bị từ chối
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="empty-state">
                        <p>Chưa có trận đấu nào</p>
                    </div>
                </div>
            </div>

            <!-- Board of Gold (Hall of Fame Compact) -->
            <div class="card animate-spring animate-stagger-2">
                <div class="card-header">
                    <h2>🏆 Bảng Vàng</h2>
                </div>
                <div class="card-content">
                    <div v-if="hasAwards" class="awards-compact">
                        <div v-for="(award, key, index) in activeAwards" :key="key" v-memo="[award]" class="award-compact-item list-item-animate" :style="{ animationDelay: (0.1 + index * 0.05) + 's' }">
                            <span class="award-icon">{{ awardIcons[key] }}</span>
                            <div class="award-info">
                                <div class="award-title">{{ awardLabels[key] }}</div>
                                <div class="award-winner">{{ award.memberName }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="empty-state">
                        <p>Chưa có dữ liệu Bảng Vàng</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Attendance Result Modal -->
        <Transition name="premium-modal">
        <div v-if="attendanceResult" class="attendance-modal" @click="closeResult">
            <div class="attendance-modal-content" :class="attendanceResult.success ? 'success' : 'error'" @click.stop>
                <svg v-if="attendanceResult.success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 64px; height: 64px; margin: 0 auto">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 64px; height: 64px; margin: 0 auto">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <h3>{{ attendanceResult.message }}</h3>
                <p v-if="attendanceResult.details">{{ attendanceResult.details }}</p>
                <button class="btn btn-secondary" @click="closeResult">Đóng</button>
            </div>
        </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBreakpoints } from '../composables/useBreakpoints';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import { usePenalties } from '../composables/usePenalties';

const { isMobile } = useBreakpoints();
const { stats: appStats, sortedMatches, members, settings, saveMatch, updateManualAttendanceRequest, pendingAttendances } = useAppState();
const { isAdmin, isGuest, guestMemberId } = useAuth();
const { getLatePenalty } = usePenalties();

const isCheckingIn = ref(false);
const attendanceResult = ref(null);

// Use stats from useAppState (Array-based attendance format)
const stats = computed(() => appStats.value);

const recentMatches = computed(() => sortedMatches.value.slice(0, 5));

const hallOfFame = computed(() => {
    const hof = settings.value.hallOfFame;
    if (!hof || !hof.awards) return { awards: {} };

    const getName = (memberId) => {
        const m = members.value.find(x => x.id === memberId);
        return m ? m.name : '';
    };

    return {
        awards: {
            bestAttendance: hof.awards.bestAttendance?.memberId
                ? { ...hof.awards.bestAttendance, name: getName(hof.awards.bestAttendance.memberId) }
                : null,
            bestContributor: hof.awards.bestContributor?.memberId
                ? { ...hof.awards.bestContributor, name: getName(hof.awards.bestContributor.memberId) }
                : null,
            topSponsor: hof.awards.topSponsor?.memberId
                ? { ...hof.awards.topSponsor, name: getName(hof.awards.topSponsor.memberId) }
                : null,
            noPenalty: hof.awards.noPenalty?.memberId
                ? { ...hof.awards.noPenalty, name: getName(hof.awards.noPenalty.memberId) }
                : null,
            mostImproved: hof.awards.mostImproved?.memberId
                ? { ...hof.awards.mostImproved, name: getName(hof.awards.mostImproved.memberId) }
                : null,
            mvp: hof.awards.mvp?.memberId
                ? { ...hof.awards.mvp, name: getName(hof.awards.mvp.memberId) }
                : null,
        }
    };
});

const hasAwards = computed(() => {
    const awards = hallOfFame.value.awards;
    return awards.bestAttendance || awards.bestContributor || awards.topSponsor
        || awards.noPenalty || awards.mostImproved || awards.mvp;
});

const awardIcons = {
    bestAttendance: '⭐',
    bestContributor: '💰',
    topSponsor: '💎',
    noPenalty: '🛡️',
    mostImproved: '📈',
    mvp: '🌟'
};

const awardLabels = {
    bestAttendance: 'Chuyên Cần Nhất',
    bestContributor: 'Đóng Góp Xuất Sắc',
    topSponsor: 'Mạnh Thường Quân',
    noPenalty: 'Kỷ Luật Cao',
    mostImproved: 'Tiến Bộ Nhất',
    mvp: 'MVP'
};

const activeAwards = computed(() => {
    const awards = {};
    const awardData = hallOfFame.value.awards || {};
    Object.keys(awardData).forEach(key => {
        const award = awardData[key];
        if (award && (award.memberId || award.name)) {
            awards[key] = { ...award, memberName: award.name || '' };
        }
    });
    return awards;
});

const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);
const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN') : '';
const isPending = (matchId) => {
    if (!guestMemberId.value) return false;
    return (pendingAttendances.value || []).some(p => 
        String(p.matchId) === String(matchId) && 
        String(p.memberId) === String(guestMemberId.value) &&
        p.status === 'pending'
    );
};

const getLastRejectedRequest = (matchId) => {
    if (!guestMemberId.value) return null;
    const reqs = (pendingAttendances.value || [])
        .filter(p => 
            String(p.matchId) === String(matchId) && 
            String(p.memberId) === String(guestMemberId.value) &&
            p.status === 'rejected'
        )
        .sort((a, b) => new Date(b.reviewedAt) - new Date(a.reviewedAt));
    return reqs.length > 0 ? reqs[0] : null;
};

const isRejected = (matchId) => {
    if (!guestMemberId.value) return false;
    const reqs = (pendingAttendances.value || [])
        .filter(p => 
            String(p.matchId) === String(matchId) && 
            String(p.memberId) === String(guestMemberId.value)
        )
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    return reqs.length > 0 && reqs[0].status === 'rejected';
};

const getPresentCount = (match, status) => {
    const att = match.attendance;
    if (!att) return 0;
    const list = Array.isArray(att) ? att : Object.values(att);
    return list.filter(a => a && a.status === (status || 'present')).length;
};

const getAbsentCount = (match) => {
    const att = match.attendance;
    if (!att) return 0;
    const list = Array.isArray(att) ? att : Object.values(att);
    return list.filter(a => a && a.status === 'absent').length;
};

const canCheckin = (match) => {
    if (!isGuest.value || !guestMemberId.value || !match.startTime || !match.date) return false;
    const [h, m] = match.startTime.split(':').map(Number);
    const matchStart = new Date(match.date);
    matchStart.setHours(h, m, 0, 0);
    const diffMinutes = (matchStart - new Date()) / (1000 * 60);
    if (diffMinutes > 15 || diffMinutes < -120) return false;
    const att = match.attendance;
    if (!att) return false;
    const list = Array.isArray(att) ? att : Object.values(att);
    const myAtt = list.find(a => String(a.memberId) === String(guestMemberId.value));
    if (myAtt && myAtt.status === 'present') return false;
    return list.some(a => String(a.memberId) === String(guestMemberId.value));
};

const handleCheckin = async (match) => {
    if (isCheckingIn.value) return;
    isCheckingIn.value = true;
    try {
        const att = Array.isArray(match.attendance) ? match.attendance : Object.values(match.attendance || {});
        const memberIdx = att.findIndex(a => String(a.memberId) === String(guestMemberId.value));
        if (memberIdx === -1) {
            showResult(false, 'Bạn không có trong danh sách trận này');
            return;
        }
        const now = new Date();
        let isLate = false;
        let lateMinutes = 0;
        let lateFine = 0;
        if (match.startTime) {
            const [h, m] = match.startTime.split(':').map(Number);
            const matchStart = new Date(match.date);
            matchStart.setHours(h, m, 0, 0);
            const nowMinutes = Math.floor(now.getTime() / 60000);
            const startMinutes = Math.floor(matchStart.getTime() / 60000);
            isLate = (nowMinutes - startMinutes) > 1;
            if (isLate) {
                lateMinutes = nowMinutes - startMinutes;
                lateFine = getLatePenalty(lateMinutes);
            }
        }
        // Create pending attendance request instead of direct update
        await updateManualAttendanceRequest({
            id: Date.now(),
            matchId: match.id,
            memberId: guestMemberId.value,
            status: 'pending',
            submittedAt: now.toISOString(),
            method: 'dashboard',
            isLate: isLate || false,
            lateMinutes: lateMinutes || 0,
            lateFine: lateFine || 0
        });

        let details = isLate ? `Đi muộn ${lateMinutes} phút` : 'Đúng giờ';
        showResult(true, '✅ Gửi yêu cầu điểm danh thành công!', 
            `${details}\n Vui lòng chờ admin hoặc kế toán phê duyệt.`);
    } catch (e) {
        showResult(false, 'Có lỗi xảy ra khi điểm danh');
    } finally {
        isCheckingIn.value = false;
    }
};

const showResult = (success, message, details = null) => {
    attendanceResult.value = { success, message, details };
};

const closeResult = () => {
    attendanceResult.value = null;
};
</script>

<style scoped>
.stats-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
    gap: var(--spacing-4); 
    margin-bottom: var(--spacing-6); 
}

.dashboard-grid { 
    display: grid; 
    grid-template-columns: 2fr 1fr; 
    gap: var(--spacing-6); 
}

@media (max-width: 1024px) { 
    .dashboard-grid { grid-template-columns: 1fr; } 
}

.recent-matches-list { 
    display: flex; 
    flex-direction: column; 
    gap: var(--spacing-3); 
}

.match-item { 
    background: var(--bg-tertiary); 
    border: 1px solid var(--border-color); 
    border-radius: var(--radius-md); 
    padding: var(--spacing-4); 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    transition: all var(--transition-base); 
}

.match-item:hover { 
    border-color: var(--primary-400); 
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.match-date { 
    font-size: 11px; 
    color: var(--text-muted); 
    margin-bottom: 2px; 
}

.match-opponent { 
    font-weight: 700; 
    color: var(--text-primary); 
    font-size: 15px; 
    display: flex; 
    align-items: center; 
}

.match-stats { 
    font-size: 12px; 
    color: var(--text-secondary); 
    margin-top: 2px; 
}

.match-actions { 
    text-align: right; 
    display: flex; 
    flex-direction: column; 
    gap: var(--spacing-2); 
    align-items: flex-end; 
}

.match-attendance { 
    font-weight: 700; 
    font-size: 12px; 
    background: var(--bg-secondary); 
    padding: 2px 10px; 
    border-radius: var(--radius-full); 
    border: 1px solid var(--border-color);
}

.attendance-present { color: var(--success); }
.attendance-absent { color: var(--danger); }

.rejection-msg {
    font-size: 10px;
    color: var(--danger);
    background: rgba(239, 68, 68, 0.1);
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    margin-top: 4px;
    font-weight: 600;
    max-width: 150px;
    text-align: right;
    line-height: 1.2;
}

.rejected-badge {
    font-size: 11px;
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
    padding: 6px 12px;
    border-radius: var(--radius-full);
    font-weight: 700;
    border: 1px solid rgba(239, 68, 68, 0.2);
}

.awards-compact { 
    display: flex; 
    flex-direction: column; 
    gap: var(--spacing-3); 
}

.award-compact-item { 
    background: var(--bg-tertiary); 
    border: 1px solid var(--border-color); 
    border-radius: var(--radius-md); 
    padding: 12px; 
    display: flex; 
    align-items: center; 
    gap: 12px; 
}

.award-icon { 
    font-size: 18px; 
    width: 36px; 
    height: 36px; 
    background: var(--bg-secondary); 
    border-radius: var(--radius-sm); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    border: 1px solid var(--border-color);
}

.award-title { 
    font-size: 10px; 
    color: var(--text-muted); 
    text-transform: uppercase; 
    font-weight: 700;
}

.award-winner { 
    font-weight: 700; 
    color: var(--primary-600); 
    font-size: 14px;
}

.attendance-modal { 
    position: fixed; 
    inset: 0; 
    background: rgba(0,0,0,0.4); 
    backdrop-filter: blur(2px); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    z-index: 1000; 
    padding: var(--spacing-4); 
}

.attendance-modal-content { 
    background: var(--bg-secondary); 
    padding: 32px; 
    border-radius: var(--radius-lg); 
    text-align: center; 
    max-width: 360px; 
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    gap: 16px; 
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-lg);
}

.attendance-modal-content.success { border-top: 4px solid var(--success); }
.attendance-modal-content.error { border-top: 4px solid var(--danger); }

/* Mobile Dash Optimizations */
@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-3);
    }
}

.mobile-match-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
}

.mobile-match-item .match-actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border-color);
    padding-top: 12px;
}

.attendance-separator {
    margin: 0 4px;
    color: var(--text-muted);
}
</style>

<template>
    <div class="page-content">
        <!-- Stats Overview -->
        <div class="stats-grid">
            <div class="stat-card stat-primary">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-label">Tổng Thành Viên</div>
                    <div class="stat-value">{{ stats.totalMembers }}</div>
                </div>
            </div>
            <div class="stat-card stat-success">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-label">Tỷ Lệ Tham Gia</div>
                    <div class="stat-value">{{ stats.attendanceRate }}%</div>
                </div>
            </div>
            <div class="stat-card stat-warning">
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
            <div class="stat-card stat-info">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-label">Quỹ Đội</div>
                    <div class="stat-value">{{ formatCurrency(stats.balance) }}</div>
                </div>
            </div>
        </div>

        <div class="dashboard-grid">
            <!-- Recent Matches -->
            <div class="card">
                <div class="card-header">
                    <h2>Trận Đấu Gần Đây</h2>
                </div>
                <div class="card-content">
                    <div v-if="recentMatches.length > 0" class="recent-matches-list">
                        <div v-for="match in recentMatches" :key="match.id" class="match-item">
                            <div class="match-info">
                                <div class="match-date">{{ formatDate(match.date) }} {{ match.startTime ? `- ${match.startTime}` : '' }}</div>
                                <div class="match-opponent">
                                    <span class="badge" :class="match.matchType === 'friendly' ? 'badge-info' : 'badge-warning'" style="margin-right: 8px;">
                                        {{ match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối' }}
                                    </span>
                                    {{ match.opponent || 'Chưa có đối thủ' }}
                                </div>
                                <div class="match-stats">{{ match.location || 'Chưa có địa điểm' }}</div>
                            </div>
                            <div class="match-actions">
                                <div class="match-attendance">
                                    <span class="attendance-present">{{ getPresentCount(match) }}</span>
                                    /
                                    <span class="attendance-absent">{{ getAbsentCount(match) }}</span>
                                </div>
                                <button v-if="canCheckin(match)" class="btn btn-primary btn-sm" @click="handleCheckin(match)" :disabled="isCheckingIn">
                                    {{ isCheckingIn ? 'Đang xử lý...' : 'Điểm Danh' }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="empty-state">
                        <p>Chưa có trận đấu nào</p>
                    </div>
                </div>
            </div>

            <!-- Board of Gold (Hall of Fame Compact) -->
            <div class="card">
                <div class="card-header">
                    <h2>🏆 Bảng Vàng</h2>
                </div>
                <div class="card-content">
                    <div v-if="hasAwards" class="awards-compact">
                        <div v-for="(award, key) in activeAwards" :key="key" class="award-compact-item">
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
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppState } from '../composables/useAppState';
import { useAuth } from '../composables/useAuth';
import { usePenalties } from '../composables/usePenalties';

const { stats: appStats, sortedMatches, members, settings, saveMatch } = useAppState();
const { isGuest, guestMemberId } = useAuth();
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

// Attendance counting — supports Array format (website standard)
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

// canCheckin — matches website logic:
// Guest only, needs startTime + date, window: 15 min before ~ 120 min after, member not already present
const canCheckin = (match) => {
    if (!isGuest.value || !guestMemberId.value || !match.startTime || !match.date) return false;

    // Time window check
    const [h, m] = match.startTime.split(':').map(Number);
    const matchStart = new Date(match.date);
    matchStart.setHours(h, m, 0, 0);

    const diffMinutes = (matchStart - new Date()) / (1000 * 60);
    // Show button from 15 min before to 120 min after match start
    if (diffMinutes > 15 || diffMinutes < -120) return false;

    // Check if member is already present (flexible ID matching)
    const att = match.attendance;
    if (!att) return false;
    const list = Array.isArray(att) ? att : Object.values(att);

    const myAtt = list.find(a =>
        a.memberId === guestMemberId.value
        || String(a.memberId) === String(guestMemberId.value)
        || Number(a.memberId) === Number(guestMemberId.value)
    );

    if (myAtt && myAtt.status === 'present') return false;

    // Check member exists in the match roster  
    const inRoster = list.some(a =>
        a.memberId === guestMemberId.value
        || String(a.memberId) === String(guestMemberId.value)
        || Number(a.memberId) === Number(guestMemberId.value)
    );

    return inRoster;
};

// handleCheckin — matches website logic:
// Uses saveMatch, Array attendance, status:'present' with isLate, calculates lateFine via usePenalties
const handleCheckin = async (match) => {
    if (isCheckingIn.value) return;
    isCheckingIn.value = true;

    try {
        const att = Array.isArray(match.attendance) ? match.attendance : Object.values(match.attendance || {});

        // Find member index in attendance array
        const memberIdx = att.findIndex(a =>
            a.memberId === guestMemberId.value
            || String(a.memberId) === String(guestMemberId.value)
            || Number(a.memberId) === Number(guestMemberId.value)
        );

        if (memberIdx === -1) {
            showResult(false, 'Bạn không có trong danh sách trận này');
            return;
        }

        if (att[memberIdx].status === 'present') {
            showResult(false, 'Bạn đã điểm danh trận này rồi');
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

            isLate = (nowMinutes - startMinutes) > 1; // 1-minute grace period
            if (isLate) {
                lateMinutes = nowMinutes - startMinutes;
                lateFine = getLatePenalty(lateMinutes);
            }
        }

        // Build updated attendance record
        const updatedRecord = {
            memberId: att[memberIdx].memberId,
            status: 'present',
            timestamp: now.toISOString(),
            attendanceMethod: 'dashboard',
            isLate: isLate || false,
            lateMinutes: lateMinutes || 0,
            lateFine: lateFine || 0
        };

        const newAttendance = [...att];
        newAttendance[memberIdx] = updatedRecord;

        // Use saveMatch to persist (same as website)
        const matchToSave = { ...match, attendance: newAttendance };
        await saveMatch(matchToSave);

        // Build result message
        let message = '✅ Điểm danh thành công!';
        let details = isLate ? `Đi muộn ${lateMinutes} phút` : 'Đúng giờ';

        if (lateFine > 0) {
            const fineFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(lateFine);
            details += ` 💰 Phạt: ${fineFormatted}`;
        }

        showResult(true, message, details);
    } catch (e) {
        console.error('Attendance error:', e);
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
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.stat-card { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-primary); }
.stat-card.stat-primary { background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent); }
.stat-card.stat-success { background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), transparent); }
.stat-card.stat-warning { background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), transparent); }
.stat-card.stat-info { background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), transparent); }

.stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--bg-secondary); border: 1px solid var(--border-primary); color: var(--primary-400); }
.stat-icon svg { width: 24px; height: 24px; }
.stat-value { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); }
.stat-label { font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }

.dashboard-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
@media (max-width: 1024px) { .dashboard-grid { grid-template-columns: 1fr; } }

.recent-matches-list { display: flex; flex-direction: column; gap: 1rem; }
.match-item { background: var(--bg-tertiary); border: 1px solid var(--border-primary); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; transition: transform 0.2s; }
.match-item:hover { transform: translateY(-2px); border-color: var(--primary-500); }
.match-date { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem; }
.match-opponent { font-weight: 700; color: var(--text-primary); font-size: 1.1rem; display: flex; align-items: center; }
.match-stats { font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem; }

.match-actions { text-align: right; display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-end; }
.match-attendance { font-weight: 700; font-size: 0.9rem; background: var(--bg-secondary); padding: 0.25rem 0.75rem; border-radius: 99px; }
.attendance-present { color: var(--success-400); }
.attendance-absent { color: var(--danger-400); }

.awards-compact { display: flex; flex-direction: column; gap: 1rem; }
.award-compact-item { background: var(--bg-tertiary); border: 1px solid var(--border-primary); border-radius: var(--radius-lg); padding: 1rem; display: flex; align-items: center; gap: 1rem; }
.award-icon { font-size: 1.5rem; width: 40px; height: 40px; background: var(--bg-secondary); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.award-title { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; }
.award-winner { font-weight: 700; color: var(--primary-400); }

.attendance-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.attendance-modal-content { background: var(--bg-secondary); padding: 3rem; border-radius: var(--radius-2xl); text-align: center; max-width: 400px; width: 100%; display: flex; flex-direction: column; gap: 1.5rem; border: 1px solid var(--border-primary); }
.attendance-modal-content.success { border-top: 4px solid var(--success-500); }
.attendance-modal-content.error { border-top: 4px solid var(--danger-500); }
</style>

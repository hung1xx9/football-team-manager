<template>
    <div class="page-content">
        <div class="stats-grid">
            <div class="stat-card stat-primary">
                <div class="stat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
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
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2 L12 22" />
                        <path d="M2 12 L22 12" />
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
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                </div>
                <div class="stat-content">
                    <div class="stat-label">Quỹ Đội</div>
                    <div class="stat-value">{{ formatCurrency(stats.balance) }}</div>
                </div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <div class="card-header">
                    <h2>Trận Đấu Gần Đây</h2>
                </div>
                <div class="card-content">
                    <div class="recent-matches-list" v-if="recentMatches.length > 0">
                        <div class="match-item" v-for="match in recentMatches" :key="match.id">
                            <div class="match-info">
                                <div class="match-date">{{ formatDate(match.date) }}</div>
                                <div class="match-opponent">
                                    <span class="badge" :class="getMatchTypeBadge(match.matchType)" style="margin-right: 8px;">
                                        {{ match.matchType === 'friendly' ? 'Đấu tập' : 'Đấu đối' }}
                                    </span>
                                    {{ match.opponent || 'Chưa có đối thủ' }}
                                </div>
                                <div class="match-stats">{{ match.location || 'Chưa có địa điểm' }}</div>
                            </div>
                            <div class="match-attendance">
                                <span class="attendance-present">{{ countAttendance(match, 'present') }}</span> /
                                <span class="attendance-absent">{{ countAttendance(match, 'absent') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="empty-state" v-else>
                        <p>Chưa có trận đấu nào</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2>Top Cầu Thủ</h2>
                </div>
                <div class="card-content">
                    <div class="top-players-list" v-if="topPlayers.length > 0">
                        <div class="player-item" v-for="(player, index) in topPlayers" :key="player.id">
                            <div class="player-rank">{{ index + 1 }}</div>
                            <div class="player-info">
                                <div class="player-name">{{ player.name }}</div>
                            </div>
                            <div class="player-attendance-rate">{{ player.attendanceRate }}%</div>
                        </div>
                    </div>
                    <div class="empty-state" v-else>
                        <p>Chưa có dữ liệu</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppState } from '../composables/useAppState';

const { stats, sortedMatches, members, getMemberStats } = useAppState();

const recentMatches = computed(() => sortedMatches.value.slice(0, 5));

const topPlayers = computed(() => {
    return members.value.map(m => ({
        ...m,
        ...getMemberStats(m.id)
    })).sort((a, b) => b.attendanceRate - a.attendanceRate).slice(0, 5);
});

// Utilities local to this component or imported
const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
const formatDate = (str) => { if (!str) return ''; const d = new Date(str); return d.toLocaleDateString('vi-VN'); };
const countAttendance = (match, status) => match.attendance.filter(a => a.status === status).length;
const getMatchTypeBadge = (type) => {
    return type === 'friendly' ? 'badge-info' : 'badge-warning';
};
</script>

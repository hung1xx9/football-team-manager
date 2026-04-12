<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <img src="../assets/logo.png" alt="Tinh Hoa FC" class="logo-image">
                <span class="logo-text">Tinh Hoa FC</span>
            </div>
        </div>

        <nav class="sidebar-nav">
            <!-- Dashboard - Always visible -->
            <router-link to="/dashboard" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Dashboard</span>
            </router-link>

            <!-- Members - Admin only -->
            <router-link v-if="permissions.canViewMembers" to="/members" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Thành Viên</span>
            </router-link>

            <!-- Matches - Admin only -->
            <router-link v-if="permissions.canViewMatches" to="/matches" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2 L12 22" />
                    <path d="M2 12 L22 12" />
                </svg>
                <span>Trận Đấu</span>
            </router-link>



            <!-- Attendance Table - Guest can see -->
            <router-link v-if="permissions.canViewAttendance" to="/attendance-table" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="3" y1="15" x2="21" y2="15"></line>
                    <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
                <span>Bảng Điểm Danh</span>
            </router-link>

            <!-- Finance Management (Admin) -->
            <router-link v-if="permissions.canViewFinance" to="/finance" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>Đóng Quỹ/Phạt</span>
            </router-link>

            <!-- My Payments (Guest) -->
            <router-link v-else-if="permissions.canViewMyPayments" to="/my-payments" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                </svg>
                <span>Đóng Quỹ/Phạt</span>
            </router-link>

            <!-- Leave Request - Guest can see -->
            <router-link v-if="permissions.canViewLeaveRequest" to="/leave-request" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Xin Nghỉ/ Muộn</span>
            </router-link>

            <!-- Leave Management - Admin only -->
            <router-link v-if="permissions.canViewLeaveManagement" to="/leave-management" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>Quản Lý Nghỉ/Muộn</span>
            </router-link>

            <!-- Pending Attendances - Admin only -->
            <router-link v-if="permissions.canReviewAttendance" to="/pending-attendances" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 14l2 2 4-4"></path>
                </svg>
                <span>Duyệt Điểm Danh</span>
            </router-link>



            <!-- Hall of Fame - Everyone -->
            <router-link to="/hall-of-fame" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                <span>Bảng Vàng</span>
            </router-link>

            <!-- Settings - Admin only -->
            <router-link v-if="permissions.canViewSettings" to="/settings" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>Cài Đặt</span>
            </router-link>
        </nav>

        <div class="sidebar-footer">
            <div class="version-tag">
                <svg class="version-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                <span>Phiên bản v{{ appVersion }}</span>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { useAuth } from '../composables/useAuth';

const { permissions } = useAuth();
const appVersion = __APP_VERSION__;
</script>

<style scoped>
.sidebar {
    width: var(--sidebar-width);
    background: var(--sidebar-bg);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 100;
    box-shadow: var(--shadow-lg);
    transition: background-color 0.3s ease;
}

.sidebar-header {
    padding: var(--spacing-md);
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    background: var(--header-bg);
    min-height: var(--header-height);
}

.logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.logo-image {
    width: 32px;
    height: 32px;
    object-fit: contain;
    filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.logo:hover .logo-image {
    transform: scale(1.1) rotate(-5deg);
}

.logo-text {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text-primary);
}

.sidebar-nav {
    flex: 1;
    padding: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    padding-bottom: var(--spacing-xl);
}

.sidebar-footer {
    padding: var(--spacing-md);
    border-top: 1px solid var(--border-color);
    background: var(--sidebar-bg);
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem var(--spacing-md);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover {
    background: var(--bg-hover);
    color: var(--text-primary);
    transform: translateX(3px);
}

.nav-item:active {
    transform: scale(0.97);
}

.nav-item.active,
.nav-item.router-link-active {
    background: var(--primary-600);
    color: #fff;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.nav-icon {
    width: 20px;
    height: 20px;
    stroke-width: 2;
    opacity: 0.8;
}

.nav-item.active .nav-icon,
.nav-item.router-link-active .nav-icon {
    opacity: 1;
}

/* Custom Scrollbar for Sidebar */
.sidebar-nav::-webkit-scrollbar {
    width: 4px;
}
.sidebar-nav::-webkit-scrollbar-thumb {
    background: var(--bg-hover);
}


</style>

<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <img src="/src/assets/logo.png" alt="Tinh Hoa FC" class="logo-image">
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

            <!-- Attendance - Guest can see -->
            <router-link v-if="permissions.canViewAttendance" to="/attendance" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <path d="M3 9h18"></path>
                    <path d="M9 21V9"></path>
                </svg>
                <span>Điểm Danh</span>
            </router-link>

            <!-- My Payments - Guest can see -->
            <router-link v-if="permissions.canViewMyPayments" to="/my-payments" class="nav-item" active-class="active">
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
                <span>Xin Nghỉ</span>
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
                <span>Quản Lý Xin Nghỉ</span>
            </router-link>

            <!-- Finance - Admin only -->
            <router-link v-if="permissions.canViewFinance" to="/finance" class="nav-item" active-class="active">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>Tài Chính</span>
            </router-link>
        </nav>
    </aside>
</template>

<script setup>
import { useAuth } from '../composables/useAuth';

const { permissions } = useAuth();
</script>

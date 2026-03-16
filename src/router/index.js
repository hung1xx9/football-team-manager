import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/DashboardView.vue')
    },
    {
        path: '/members',
        name: 'Members',
        component: () => import('../views/MembersView.vue')
    },
    {
        path: '/matches',
        name: 'Matches',
        component: () => import('../views/MatchesView.vue')
    },
    {
        path: '/finance',
        name: 'Finance',
        component: () => import('../views/FinanceView.vue')
    },
    {
        path: '/attendance',
        name: 'Attendance',
        component: () => import('../views/AttendanceView.vue')
    },
    {
        path: '/my-payments',
        name: 'My Payments',
        component: () => import('../views/MyPaymentsView.vue')
    },
    {
        path: '/leave-request',
        name: 'Leave Request',
        component: () => import('../views/LeaveRequestView.vue')
    },
    {
        path: '/leave-management',
        name: 'Leave Management',
        component: () => import('../views/LeaveManagementView.vue')
    },
    {
        path: '/pending-attendances',
        name: 'Pending Attendances',
        component: () => import('../views/PendingAttendancesView.vue')
    },
    {
        path: '/attendance-table',
        name: 'Attendance Table',
        component: () => import('../views/AttendanceTableView.vue')
    },

    {
        path: '/hall-of-fame',
        name: 'Hall of Fame',
        component: () => import('../views/HallOfFameView.vue')
    },

    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/SettingsView.vue')
    },
    {
        path: '/pending-transactions',
        name: 'Pending Transactions',
        component: () => import('../views/FinanceView.vue'),
        props: { initialTab: 'pending' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

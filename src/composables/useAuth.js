import { ref, computed } from 'vue';

// Role state
const currentRole = ref(localStorage.getItem('user_role') || null);
const guestMemberId = ref(localStorage.getItem('guest_member_id') ? parseInt(localStorage.getItem('guest_member_id')) : null);

// Role types
export const ROLES = {
    ADMIN: 'admin',
    GUEST: 'guest'
};

// Computed permissions
const isAdmin = computed(() => currentRole.value === ROLES.ADMIN);
const isGuest = computed(() => currentRole.value === ROLES.GUEST);
const isAuthenticated = computed(() => currentRole.value !== null);

// Permissions
const permissions = computed(() => {
    if (isAdmin.value) {
        return {
            canViewDashboard: true,
            canViewMembers: true,
            canViewMatches: true,
            canViewFinance: true,
            canViewAttendance: true,
            canViewMyPayments: true,
            canViewLeaveRequest: false,
            canViewLeaveManagement: true,
            canAddMember: true,
            canEditMember: true,
            canDeleteMember: true,
            canAddMatch: true,
            canEditMatch: true,
            canDeleteMatch: true,
            canAddTransaction: true,
            canDeleteTransaction: true,
            canManageFirebase: true,
            canExportData: true,
            canPayFund: true,
            canPayFine: true,
            canRequestLeave: false,
            canApproveLeave: true,
            canViewAllPayments: true,
            canManageQRCode: true
        };
    }

    if (isGuest.value) {
        return {
            canViewDashboard: true,
            canViewMembers: false,
            canViewMatches: false,
            canViewFinance: false,
            canViewAttendance: true,
            canViewMyPayments: true,
            canViewLeaveRequest: true,
            canAddMember: false,
            canEditMember: false,
            canDeleteMember: false,
            canAddMatch: false,
            canEditMatch: false,
            canDeleteMatch: false,
            canAddTransaction: false,
            canDeleteTransaction: false,
            canManageFirebase: false,
            canExportData: false,
            canPayFund: true,
            canPayFine: true,
            canRequestLeave: true
        };
    }

    return {};
});

// Actions
const setRole = (role, memberId = null) => {
    currentRole.value = role;
    localStorage.setItem('user_role', role);

    if (role === ROLES.GUEST && memberId) {
        guestMemberId.value = memberId;
        localStorage.setItem('guest_member_id', memberId);
    } else {
        guestMemberId.value = null;
        localStorage.removeItem('guest_member_id');
    }
};

const logout = () => {
    currentRole.value = null;
    guestMemberId.value = null;
    localStorage.removeItem('user_role');
    localStorage.removeItem('guest_member_id');
};

const checkPermission = (permission) => {
    return permissions.value[permission] || false;
};

export const useAuth = () => {
    return {
        // State
        currentRole,
        guestMemberId,

        // Computed
        isAdmin,
        isGuest,
        isAuthenticated,
        permissions,

        // Actions
        setRole,
        logout,
        checkPermission,

        // Constants
        ROLES
    };
};

import { ref, computed } from 'vue';

// Session duration: 12 hours
const SESSION_DURATION = 6 * 60 * 60 * 1000;

const checkExpiryAndLogoutIfNeeded = () => {
    const expiry = localStorage.getItem('session_expiry');

    if (currentRole.value && (!expiry || new Date().getTime() > parseInt(expiry, 10))) {
        currentRole.value = null;
        guestMemberId.value = null;
        localStorage.removeItem('user_role');
        localStorage.removeItem('guest_member_id');
        localStorage.removeItem('session_expiry');
        // Reload to clear any sensitive states in memory
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
};

const getStoredRoleAndCheckExpiry = () => {
    const role = localStorage.getItem('user_role');
    const expiry = localStorage.getItem('session_expiry');

    if (role) {
        if (!expiry || new Date().getTime() > parseInt(expiry, 10)) {
            localStorage.removeItem('user_role');
            localStorage.removeItem('guest_member_id');
            localStorage.removeItem('session_expiry');
            return null;
        }
        return role;
    }
    return null;
};

// Role state
const currentRole = ref(getStoredRoleAndCheckExpiry());
const guestMemberId = ref(currentRole.value && localStorage.getItem('guest_member_id') ? parseInt(localStorage.getItem('guest_member_id')) : null);

// Định kỳ kiểm tra hết hạn session (mỗi phút)
setInterval(checkExpiryAndLogoutIfNeeded, 60000);

// Role types
export const ROLES = {
    ADMIN: 'admin',
    ACCOUNTANT: 'ketoan',
    GUEST: 'guest'
};

// Computed permissions
const isAdmin = computed(() => currentRole.value === ROLES.ADMIN);
const isAccountant = computed(() => currentRole.value === ROLES.ACCOUNTANT);
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
            canManageQRCode: true,
            canReviewAttendance: true,
            canViewSettings: true,
            canEditAttendance: true
        };
    }

    if (isAccountant.value) {
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
            canDeleteMember: false,
            canAddMatch: true,
            canEditMatch: true,
            canDeleteMatch: false,
            canAddTransaction: true,
            canDeleteTransaction: true,
            canManageFirebase: false,
            canExportData: true,
            canPayFund: true,
            canPayFine: true,
            canRequestLeave: false,
            canApproveLeave: true,
            canViewAllPayments: true,
            canManageQRCode: false,
            canReviewAttendance: true,
            canViewSettings: true,
            canEditAttendance: true
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

    // Set session expiry
    const expiryTime = new Date().getTime() + SESSION_DURATION;
    localStorage.setItem('session_expiry', expiryTime.toString());

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
    localStorage.removeItem('session_expiry');
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
        isAccountant,
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

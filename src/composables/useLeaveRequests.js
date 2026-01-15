import { ref, computed } from 'vue';

// --- Global State ---
const leaveRequests = ref([]);
const isInitialized = ref(false);

// --- Actions ---

const loadLeaveRequests = () => {
    if (isInitialized.value) return;

    const stored = localStorage.getItem('leaveRequests');
    leaveRequests.value = stored ? JSON.parse(stored) : [];
    isInitialized.value = true;
};

const saveLeaveRequests = () => {
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value));
};

const updateFromFirebase = (data) => {
    if (data && data.leaveRequests) {
        leaveRequests.value = data.leaveRequests;
        saveLeaveRequests();
    }
};

// Create a new leave request
const createLeaveRequest = (requestData) => {
    const newRequest = {
        id: Date.now(),
        memberId: requestData.memberId,
        memberName: requestData.memberName,
        leaveDate: requestData.leaveDate,
        matchId: requestData.matchId || null, // Optional: link to specific match
        reason: requestData.reason.trim(),
        status: 'pending', // pending, approved, rejected
        createdAt: new Date().toISOString(),
        processedAt: null,
        adminNote: null
    };

    leaveRequests.value.push(newRequest);
    saveLeaveRequests();
    return newRequest;
};

// Approve a leave request
const approveLeaveRequest = (id, adminNote = '') => {
    const request = leaveRequests.value.find(r => r.id === id);
    if (!request) return false;

    request.status = 'approved';
    request.processedAt = new Date().toISOString();
    request.adminNote = adminNote.trim() || null;

    saveLeaveRequests();
    return true;
};

// Reject a leave request
const rejectLeaveRequest = (id, adminNote = '') => {
    const request = leaveRequests.value.find(r => r.id === id);
    if (!request) return false;

    request.status = 'rejected';
    request.processedAt = new Date().toISOString();
    request.adminNote = adminNote.trim() || null;

    saveLeaveRequests();
    return true;
};

// Delete a leave request
const deleteLeaveRequest = (id) => {
    leaveRequests.value = leaveRequests.value.filter(r => r.id !== id);
    saveLeaveRequests();
};

// Get leave requests for a specific member
const getMemberLeaveRequests = (memberId) => {
    return leaveRequests.value
        .filter(r => r.memberId === memberId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Get leave requests for a specific date
const getLeaveRequestsByDate = (date) => {
    return leaveRequests.value.filter(r => r.leaveDate === date);
};

// Get leave requests for a specific match
const getLeaveRequestsByMatch = (matchId) => {
    return leaveRequests.value.filter(r => r.matchId === matchId);
};

// Check if a member has an approved leave for a specific date
const hasApprovedLeave = (memberId, date) => {
    return leaveRequests.value.some(r =>
        r.memberId === memberId &&
        r.leaveDate === date &&
        r.status === 'approved'
    );
};

// --- Computed Stats ---
const stats = computed(() => {
    return {
        total: leaveRequests.value.length,
        pending: leaveRequests.value.filter(r => r.status === 'pending').length,
        approved: leaveRequests.value.filter(r => r.status === 'approved').length,
        rejected: leaveRequests.value.filter(r => r.status === 'rejected').length
    };
});

// Get filtered requests
const getFilteredRequests = (filters = {}) => {
    let filtered = [...leaveRequests.value];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
        filtered = filtered.filter(r => r.status === filters.status);
    }

    // Filter by member
    if (filters.memberId) {
        filtered = filtered.filter(r => r.memberId === filters.memberId);
    }

    // Filter by member name (search)
    if (filters.searchMember) {
        const search = filters.searchMember.toLowerCase();
        filtered = filtered.filter(r =>
            r.memberName && r.memberName.toLowerCase().includes(search)
        );
    }

    // Filter by date range
    if (filters.startDate) {
        filtered = filtered.filter(r => r.leaveDate >= filters.startDate);
    }

    if (filters.endDate) {
        filtered = filtered.filter(r => r.leaveDate <= filters.endDate);
    }

    // Sort by created date (newest first)
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const useLeaveRequests = () => {
    return {
        // State
        leaveRequests,
        stats,

        // Actions
        loadLeaveRequests,
        saveLeaveRequests,
        updateFromFirebase,
        createLeaveRequest,
        approveLeaveRequest,
        rejectLeaveRequest,
        deleteLeaveRequest,

        // Helpers
        getMemberLeaveRequests,
        getLeaveRequestsByDate,
        getLeaveRequestsByMatch,
        hasApprovedLeave,
        getFilteredRequests
    };
};

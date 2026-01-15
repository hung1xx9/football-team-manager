import { ref, computed } from 'vue';
import { useFirebase } from './useFirebase';

// --- Global State ---
const members = ref([]);
const matches = ref([]);
const transactions = ref([]);
const pendingTransactions = ref([]); // Giao dịch chờ phê duyệt
const leaveRequests = ref([]); // Đơn xin nghỉ
const contributionTiers = ref([]);
const settings = ref({ momoPhone: '' });
const isInitialized = ref(false);

// Firebase integration
const { uploadData, isSignedIn } = useFirebase();

// --- Computed Stats ---
const stats = computed(() => {
    const totalIncome = transactions.value.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.value.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    // Calc attendance rate
    let totalAtt = 0;
    let totalPossible = matches.value.length * members.value.length;
    if (matches.value.length > 0) {
        matches.value.forEach(m => {
            totalAtt += m.attendance.filter(a => a.status === 'present').length;
        });
    }

    return {
        totalMembers: members.value.length,
        totalMatches: matches.value.length,
        balance: totalIncome - totalExpense,
        totalIncome,
        totalExpense,
        attendanceRate: totalPossible > 0 ? Math.round((totalAtt / totalPossible) * 100) : 0
    };
});

const sortedMatches = computed(() => {
    return [...matches.value].sort((a, b) => new Date(b.date) - new Date(a.date));
});

const futureMatches = computed(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return matches.value.filter(m => new Date(m.date) >= now);
});

// --- Actions ---

const loadData = () => {
    if (isInitialized.value) return;

    const savedMembers = localStorage.getItem('members');
    const savedMatches = localStorage.getItem('matches');
    const savedTransactions = localStorage.getItem('transactions');
    const savedPendingTransactions = localStorage.getItem('pendingTransactions');
    const savedLeaveRequests = localStorage.getItem('leaveRequests');
    const savedTiers = localStorage.getItem('contributionTiers');
    const savedSettings = localStorage.getItem('settings');

    if (savedMembers) members.value = JSON.parse(savedMembers);
    if (savedMatches) matches.value = JSON.parse(savedMatches);
    if (savedTransactions) transactions.value = JSON.parse(savedTransactions);
    if (savedPendingTransactions) pendingTransactions.value = JSON.parse(savedPendingTransactions);
    if (savedLeaveRequests) leaveRequests.value = JSON.parse(savedLeaveRequests);
    if (savedTiers) contributionTiers.value = JSON.parse(savedTiers);
    if (savedSettings) settings.value = JSON.parse(savedSettings);

    // Seed data
    if (members.value.length === 0 && !localStorage.getItem('initialized')) {
        members.value = [
            { id: 1, name: 'Nguyễn Văn A', fundPaid: 0, fines: 0, contributionTierId: null },
            { id: 2, name: 'Trần Thị B', fundPaid: 0, fines: 0, contributionTierId: null },
            { id: 3, name: 'Lê Văn C', fundPaid: 0, fines: 0, contributionTierId: null },
            { id: 4, name: 'Phạm Thị D', fundPaid: 0, fines: 0, contributionTierId: null },
            { id: 5, name: 'Hoàng Văn E', fundPaid: 0, fines: 0, contributionTierId: null }
        ];
        saveData();
        localStorage.setItem('initialized', 'true');
    }

    // Seed contribution tiers
    if (contributionTiers.value.length === 0) {
        contributionTiers.value = [
            {
                id: 1,
                name: 'Học Sinh',
                monthlyFee: 30000,
                icon: '🎓',
                color: '#3b82f6',
                isDefault: true
            },
            {
                id: 2,
                name: 'Sinh Viên',
                monthlyFee: 50000,
                icon: '📚',
                color: '#10b981',
                isDefault: true
            },
            {
                id: 3,
                name: 'Đi Làm',
                monthlyFee: 100000,
                icon: '💼',
                color: '#f59e0b',
                isDefault: true
            }
        ];
        saveData();
    }

    isInitialized.value = true;
};

const saveData = () => {
    localStorage.setItem('members', JSON.stringify(members.value));
    localStorage.setItem('matches', JSON.stringify(matches.value));
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    localStorage.setItem('pendingTransactions', JSON.stringify(pendingTransactions.value));
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value));
    localStorage.setItem('contributionTiers', JSON.stringify(contributionTiers.value));
    localStorage.setItem('settings', JSON.stringify(settings.value));

    // Auto-upload to Firebase if signed in with retry mechanism
    if (isSignedIn && isSignedIn.value && uploadData) {
        const dataToUpload = {
            members: members.value,
            matches: matches.value,
            transactions: transactions.value,
            pendingTransactions: pendingTransactions.value,
            leaveRequests: leaveRequests.value,
            contributionTiers: contributionTiers.value,
            settings: settings.value
        };

        // Retry function with exponential backoff
        const retryUpload = async (attempt = 1, maxAttempts = 3) => {
            try {
                await uploadData(dataToUpload);
                console.log('✅ Auto-upload to Firebase successful');
            } catch (error) {
                console.warn(`⚠️ Auto-upload attempt ${attempt} failed:`, error.message);

                if (attempt < maxAttempts) {
                    // Exponential backoff: 1s, 2s, 4s
                    const delay = Math.pow(2, attempt - 1) * 1000;
                    console.log(`🔄 Retrying in ${delay}ms...`);

                    setTimeout(() => {
                        retryUpload(attempt + 1, maxAttempts);
                    }, delay);
                } else {
                    console.error('❌ Auto-upload to Firebase failed after', maxAttempts, 'attempts');
                    console.log('📱 Data is still saved locally');
                }
            }
        };

        // Start upload with retry
        retryUpload();
    }
};

const updateFromFirebase = (data) => {
    if (data.members) members.value = data.members;
    if (data.matches) matches.value = data.matches;
    if (data.transactions) transactions.value = data.transactions;
    if (data.pendingTransactions) pendingTransactions.value = data.pendingTransactions;
    if (data.leaveRequests) leaveRequests.value = data.leaveRequests;
    if (data.contributionTiers) contributionTiers.value = data.contributionTiers;
    if (data.settings) settings.value = data.settings;
    // Save to localStorage
    localStorage.setItem('members', JSON.stringify(members.value));
    localStorage.setItem('matches', JSON.stringify(matches.value));
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    localStorage.setItem('pendingTransactions', JSON.stringify(pendingTransactions.value));
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value));
    localStorage.setItem('contributionTiers', JSON.stringify(contributionTiers.value));
    localStorage.setItem('settings', JSON.stringify(settings.value));
};

// CRUD
const addMember = (name) => {
    members.value.push({ id: Date.now(), name, fundPaid: 0, fines: 0 });
    saveData();
};
const updateMember = (id, newName) => {
    const m = members.value.find(x => x.id === id);
    if (m) m.name = newName;
    saveData();
};
const deleteMember = (id) => {
    members.value = members.value.filter(m => m.id !== id);
    saveData();
};

const saveMatch = (matchData) => {
    let attendance;

    // Check if we need to preserve attendance data (when admin manually marks attendance)
    if (matchData.preserveAttendanceData && matchData.originalAttendance) {
        // Preserve existing attendance data and only update status based on checkbox
        attendance = members.value.map(m => {
            const isChecked = matchData.attendanceIds?.includes(m.id);
            const originalAtt = matchData.originalAttendance.find(a => a.memberId === m.id);

            if (isChecked) {
                // Member is marked as present
                if (originalAtt && originalAtt.status === 'present') {
                    // Already present - keep all original data (timestamp, method, late info)
                    return { ...originalAtt };
                } else {
                    // Newly marked as present by admin - create new attendance record
                    const attendanceTimestamp = new Date();

                    // Calculate if late or on-time based on match start time
                    let isLate = false;
                    let lateMinutes = 0;
                    let lateFine = 0;

                    if (matchData.startTime) {
                        // Parse match start time
                        const [hours, minutes] = matchData.startTime.split(':').map(Number);
                        const matchStartDateTime = new Date(matchData.date);
                        matchStartDateTime.setHours(hours, minutes, 0, 0);

                        // Check if attendance is after start time
                        isLate = attendanceTimestamp > matchStartDateTime;

                        if (isLate) {
                            // Calculate minutes late
                            lateMinutes = Math.floor((attendanceTimestamp - matchStartDateTime) / (1000 * 60));

                            // Calculate fine based on late minutes
                            if (lateMinutes < 10) {
                                lateFine = 10000;
                            } else if (lateMinutes < 20) {
                                lateFine = 20000;
                            } else {
                                lateFine = 50000;
                            }
                        }
                    }

                    return {
                        memberId: m.id,
                        status: 'present',
                        timestamp: attendanceTimestamp.toISOString(),
                        attendanceMethod: 'manual', // Mark as manual attendance
                        isLate,
                        lateMinutes,
                        lateFine
                    };
                }
            } else {
                // Member is not checked - mark as absent
                return {
                    memberId: m.id,
                    status: 'absent'
                };
            }
        });
    } else if (matchData.attendance) {
        // If matchData already has attendance (from QR scan), use it
        attendance = matchData.attendance;
    } else {
        // Generate from attendanceIds (from form) - for new matches
        attendance = members.value.map(m => ({
            memberId: m.id,
            status: matchData.attendanceIds?.includes(m.id) ? 'present' : 'absent'
        }));
    }

    if (matchData.id) {
        // Update existing match
        const idx = matches.value.findIndex(m => m.id === matchData.id);
        if (idx !== -1) {
            const originalId = matches.value[idx].id; // Preserve original ID
            matches.value[idx] = {
                ...matches.value[idx],
                ...matchData,
                id: originalId, // Ensure ID is not overwritten
                attendance, // Use the attendance from above
                // Remove helper fields
                preserveAttendanceData: undefined,
                originalAttendance: undefined,
                attendanceIds: undefined
            };
        }
    } else {
        // Create new match
        const { id, preserveAttendanceData, originalAttendance, ...dataWithoutHelpers } = matchData;
        matches.value.push({
            id: Date.now(), // Generate new ID
            ...dataWithoutHelpers,
            attendance
        });
    }
    saveData();
};
const deleteMatch = (id) => {
    // Clean up scan records for this match
    const { cleanupDeletedMatch } = require('./useQRAttendance');
    const cleanedCount = cleanupDeletedMatch(id);
    console.log(`🗑️ Deleted match ${id}, cleaned up ${cleanedCount} scan records`);

    matches.value = matches.value.filter(m => m.id !== id);
    saveData();
};

const addTransaction = (tData) => {
    transactions.value.push({
        id: Date.now(),
        ...tData
    });
    saveData();
};
const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter(t => t.id !== id);
    saveData();
};

// Pending Transactions Management
const addPendingTransaction = (tData) => {
    pendingTransactions.value.push({
        id: Date.now(),
        ...tData,
        status: 'pending', // pending, approved, rejected
        createdAt: new Date().toISOString(),
        approvedAt: null,
        approvedBy: null
    });
    saveData();
};

const approvePendingTransaction = (id) => {
    const pending = pendingTransactions.value.find(t => t.id === id);
    if (!pending) return false;

    // Move to transactions
    const transaction = {
        type: pending.type,
        category: pending.category,
        amount: pending.amount,
        description: pending.description,
        date: pending.date,
        memberId: pending.memberId,
        momoTransId: pending.momoTransId,
        source: pending.source,
        createdAt: new Date()
    };
    addTransaction(transaction);

    // Update member's fundPaid or fines
    const member = members.value.find(m => m.id === pending.memberId);
    if (member) {
        if (pending.category === 'fund') {
            // Add to fundPaid
            member.fundPaid = (member.fundPaid || 0) + pending.amount;
            console.log(`✅ Updated ${member.name}: fundPaid += ${pending.amount} = ${member.fundPaid}`);
        } else if (pending.category === 'fine') {
            // Add to fines
            member.fines = (member.fines || 0) + pending.amount;
            console.log(`✅ Updated ${member.name}: fines += ${pending.amount} = ${member.fines}`);
        }
    }

    // Remove from pending
    pendingTransactions.value = pendingTransactions.value.filter(t => t.id !== id);
    saveData();
    return true;
};

const rejectPendingTransaction = (id, reason = '') => {
    const pending = pendingTransactions.value.find(t => t.id === id);
    if (!pending) return false;

    // Update status to rejected
    pending.status = 'rejected';
    pending.rejectedAt = new Date().toISOString();
    pending.rejectionReason = reason;
    saveData();
    return true;
};

const deletePendingTransaction = (id) => {
    pendingTransactions.value = pendingTransactions.value.filter(t => t.id !== id);
    saveData();
};

// --- Helpers ---
const getMemberName = (id) => {
    const m = members.value.find(x => x.id === id);
    return m ? m.name : '';
};

const getMemberStats = (memberId) => {
    const total = matches.value.length;
    if (total === 0) return { attendanceRate: 0 };
    const attended = matches.value.filter(m =>
        m.attendance.some(a => a.memberId === memberId && a.status === 'present')
    ).length;
    return { attendanceRate: Math.round((attended / total) * 100) };
};

// Contribution Tiers CRUD
const addContributionTier = (tierData) => {
    contributionTiers.value.push({
        id: Date.now(),
        ...tierData,
        isDefault: false
    });
    saveData();
};

const updateContributionTier = (id, updates) => {
    const tier = contributionTiers.value.find(t => t.id === id);
    if (tier) {
        Object.assign(tier, updates);
        saveData();
    }
};

const deleteContributionTier = (id) => {
    contributionTiers.value = contributionTiers.value.filter(t => t.id !== id);
    saveData();
};

const getContributionTier = (id) => {
    return contributionTiers.value.find(t => t.id === id);
};

const updateSettings = (newSettings) => {
    settings.value = { ...settings.value, ...newSettings };
    saveData();
};

// Leave Requests Management
const createLeaveRequest = (requestData) => {
    const newRequest = {
        id: Date.now(),
        memberId: requestData.memberId,
        memberName: requestData.memberName,
        leaveDate: requestData.leaveDate,
        matchId: requestData.matchId || null,
        reason: requestData.reason.trim(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        processedAt: null,
        adminNote: null
    };

    leaveRequests.value.push(newRequest);
    saveData();
    return newRequest;
};

const approveLeaveRequest = (id, adminNote = '') => {
    const request = leaveRequests.value.find(r => r.id === id);
    if (!request) return false;

    request.status = 'approved';
    request.processedAt = new Date().toISOString();
    request.adminNote = adminNote.trim() || null;

    saveData();
    return true;
};

const rejectLeaveRequest = (id, adminNote = '') => {
    const request = leaveRequests.value.find(r => r.id === id);
    if (!request) return false;

    request.status = 'rejected';
    request.processedAt = new Date().toISOString();
    request.adminNote = adminNote.trim() || null;

    saveData();
    return true;
};

const deleteLeaveRequest = (id) => {
    leaveRequests.value = leaveRequests.value.filter(r => r.id !== id);
    saveData();
};

const getMemberLeaveRequests = (memberId) => {
    return leaveRequests.value
        .filter(r => r.memberId === memberId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const hasApprovedLeave = (memberId, date) => {
    return leaveRequests.value.some(r =>
        r.memberId === memberId &&
        r.leaveDate === date &&
        r.status === 'approved'
    );
};


export const useAppState = () => {
    return {
        // State
        members,
        matches,
        transactions,
        pendingTransactions,
        leaveRequests,
        contributionTiers,
        settings,
        stats,
        sortedMatches,
        futureMatches,

        // Actions
        loadData,
        updateFromFirebase,
        addMember,
        updateMember,
        deleteMember,
        saveMatch,
        deleteMatch,
        addTransaction,
        deleteTransaction,
        addPendingTransaction,
        approvePendingTransaction,
        rejectPendingTransaction,
        deletePendingTransaction,
        addContributionTier,
        updateContributionTier,
        deleteContributionTier,
        updateSettings,
        createLeaveRequest,
        approveLeaveRequest,
        rejectLeaveRequest,
        deleteLeaveRequest,

        // Helpers
        getMemberName,
        getMemberStats,
        getContributionTier,
        getMemberLeaveRequests,
        hasApprovedLeave
    };
};

import { ref, computed } from 'vue';
import { useFirebase } from './useFirebase';

// --- Global State ---
const members = ref([]);
const matches = ref([]);
const transactions = ref([]);
const contributionTiers = ref([]);
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
    const savedTiers = localStorage.getItem('contributionTiers');

    if (savedMembers) members.value = JSON.parse(savedMembers);
    if (savedMatches) matches.value = JSON.parse(savedMatches);
    if (savedTransactions) transactions.value = JSON.parse(savedTransactions);
    if (savedTiers) contributionTiers.value = JSON.parse(savedTiers);

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
    localStorage.setItem('contributionTiers', JSON.stringify(contributionTiers.value));

    // Auto-upload to Firebase if signed in
    if (isSignedIn && isSignedIn.value && uploadData) {
        uploadData({
            members: members.value,
            matches: matches.value,
            transactions: transactions.value,
            contributionTiers: contributionTiers.value
        }).catch(() => {
            // Silently fail - data is still saved locally
            console.log('Auto-upload to Firebase skipped');
        });
    }
};

const updateFromFirebase = (data) => {
    if (data.members) members.value = data.members;
    if (data.matches) matches.value = data.matches;
    if (data.transactions) transactions.value = data.transactions;
    if (data.contributionTiers) contributionTiers.value = data.contributionTiers;
    // Save to localStorage
    localStorage.setItem('members', JSON.stringify(members.value));
    localStorage.setItem('matches', JSON.stringify(matches.value));
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    localStorage.setItem('contributionTiers', JSON.stringify(contributionTiers.value));
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
    // If matchData already has attendance (from QR scan), use it
    // Otherwise, generate from attendanceIds (from form)
    const attendance = matchData.attendance || members.value.map(m => ({
        memberId: m.id,
        status: matchData.attendanceIds?.includes(m.id) ? 'present' : 'absent'
    }));

    if (matchData.id) {
        // Update existing match
        const idx = matches.value.findIndex(m => m.id === matchData.id);
        if (idx !== -1) {
            const originalId = matches.value[idx].id; // Preserve original ID
            matches.value[idx] = {
                ...matches.value[idx],
                ...matchData,
                id: originalId, // Ensure ID is not overwritten
                attendance // Use the attendance from above
            };
        }
    } else {
        // Create new match
        const { id, ...dataWithoutId } = matchData; // Remove null id from matchData
        matches.value.push({
            id: Date.now(), // Generate new ID
            ...dataWithoutId, // Spread without id field
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

export const useAppState = () => {
    return {
        // State
        members,
        matches,
        transactions,
        contributionTiers,
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
        addContributionTier,
        updateContributionTier,
        deleteContributionTier,

        // Helpers
        getMemberName,
        getMemberStats,
        getContributionTier
    };
};

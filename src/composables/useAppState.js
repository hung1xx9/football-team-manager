import { ref, computed } from 'vue';
import { useToast } from './useToast';
import { useFirebase } from './useFirebase';

import bcrypt from 'bcryptjs';

// --- Global State ---
const members = ref([]);
const matches = ref([]);
const transactions = ref([]);
const pendingTransactions = ref([]); // Giao dịch chờ phê duyệt
const leaveRequests = ref([]); // Đơn xin nghỉ/muộn
const pendingAttendances = ref([]); // Yêu cầu điểm danh thủ công
const jerseyPayments = ref([]); // Thanh toán áo đấu
const fixedMatches = ref([]); // Trận đấu cố định (lịch hẹn)
const receivables = ref([]); // Các khoản phải thu (phạt, quỹ, phí sân...)
const contributionTiers = ref([]);
const settings = ref({ 
    momoPhone: '',
    messengerWebhookUrl: '' 
});
const isInitialized = ref(false);
const isSyncingLocal = ref(false); // Guard against race conditions during local writes
// Detect if running as PWA (standalone app)
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || false;
// Nếu là PWA thì ép mặc định luôn là Mobile Mode, trừ khi user đã từng chủ động save false
const savedMobileView = localStorage.getItem('isMobileView');
const isMobileView = ref(savedMobileView !== null ? savedMobileView === 'true' : isStandalone);

// Dialog state
const dialog = ref({
    show: false,
    title: '',
    message: '',
    type: 'alert', // 'alert', 'confirm', 'prompt'
    resolve: null,
    inputValue: ''
});



let uploadDebounceTimer = null;

// Firebase integration
const { 
    uploadData, uploadSingleItem, deleteSingleItem, isSignedIn, 
    approvePendingTransactionAtomic, approveAttendanceAtomic 
} = useFirebase();

// --- Computed Stats ---
const stats = computed(() => {
    const totalIncome = transactions.value.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.value.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    // Calc attendance rate
    let totalAtt = 0;
    let totalPossible = matches.value.length * members.value.length;
    if (matches.value.length > 0) {
        matches.value.forEach(m => {
            if (m.attendance) {
                const attList = Array.isArray(m.attendance) ? m.attendance : Object.values(m.attendance);
                totalAtt += attList.filter(a => a && a.status === 'present').length;
            }
        });
    }

    const totalUnpaidReceivables = receivables.value
        .filter(r => r.status === 'unpaid')
        .reduce((sum, r) => sum + r.amount, 0);

    return {
        totalMembers: members.value.length,
        totalMatches: matches.value.length,
        balance: totalIncome - totalExpense,
        totalIncome,
        totalExpense,
        totalUnpaidReceivables,
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
    const savedPendingAttendances = localStorage.getItem('pendingAttendances');
    const savedJersey = localStorage.getItem('jerseyPayments');
    const savedFixedMatches = localStorage.getItem('fixedMatches');
    const savedReceivables = localStorage.getItem('receivables');
    const savedTiers = localStorage.getItem('contributionTiers');
    const savedSettings = localStorage.getItem('settings');

    if (savedMembers) members.value = JSON.parse(savedMembers);
    if (savedMatches) matches.value = JSON.parse(savedMatches);
    if (savedTransactions) transactions.value = JSON.parse(savedTransactions);
    if (savedPendingTransactions) pendingTransactions.value = JSON.parse(savedPendingTransactions);
    if (savedLeaveRequests) leaveRequests.value = JSON.parse(savedLeaveRequests);
    if (savedPendingAttendances) pendingAttendances.value = JSON.parse(savedPendingAttendances);
    if (savedJersey) jerseyPayments.value = JSON.parse(savedJersey);
    if (savedFixedMatches) fixedMatches.value = JSON.parse(savedFixedMatches);
    if (savedReceivables) receivables.value = JSON.parse(savedReceivables);
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
    }
        
        // Ensure every member has a jersey payment entry if it's a new system
        members.value.forEach(m => {
            if (!jerseyPayments.value.find(p => p.memberId === m.id)) {
                jerseyPayments.value.push({
                    memberId: m.id,
                    size: '',
                    status: 'none', // none, ordered, paid
                    amount: 0,
                    note: ''
                });
            }
        });

        isInitialized.value = true;
    checkAndCreateMonthlyDebts();
};

const checkAndCreateMonthlyDebts = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`;

    const newReceivables = [];
    
    members.value.forEach(member => {
        // Chỉ áp dụng cho thành viên đá theo đội
        if (member.paymentType === 'per-match') return;
        
        // Kiểm tra xem đã có khoản nợ quỹ tháng này chưa
        const exists = receivables.value.some(r => 
            r.memberId === member.id && 
            r.type === 'monthly_fund' && 
            r.monthKey === monthKey
        );

        if (!exists) {
            const tier = contributionTiers.value.find(t => t.id === member.contributionTierId);
            const amount = tier ? tier.monthlyFee : 0;
            
            if (amount > 0) {
                newReceivables.push({
                    id: Date.now() + Math.random(),
                    memberId: member.id,
                    amount: amount,
                    type: 'monthly_fund',
                    description: `Quỹ tháng ${month}/${year}`,
                    date: now.toISOString().split('T')[0],
                    monthKey: monthKey,
                    status: 'unpaid',
                    createdAt: now.toISOString()
                });
            }
        }
    });

    if (newReceivables.length > 0) {
        console.log(`📊 Đã tự động tạo ${newReceivables.length} khoản nợ quỹ tháng cho tháng ${month}/${year}`);
        receivables.value.push(...newReceivables);
        saveData();
    }
};

const saveData = (skipFirebase = false) => {
    localStorage.setItem('members', JSON.stringify(members.value));
    localStorage.setItem('matches', JSON.stringify(matches.value));
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    localStorage.setItem('pendingTransactions', JSON.stringify(pendingTransactions.value));
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value));
    localStorage.setItem('pendingAttendances', JSON.stringify(pendingAttendances.value));
    localStorage.setItem('jerseyPayments', JSON.stringify(jerseyPayments.value));
    localStorage.setItem('fixedMatches', JSON.stringify(fixedMatches.value));
    localStorage.setItem('receivables', JSON.stringify(receivables.value));
    localStorage.setItem('contributionTiers', JSON.stringify(contributionTiers.value));
    localStorage.setItem('settings', JSON.stringify(settings.value));

    if (skipFirebase) return;

    if (isSignedIn && isSignedIn.value && uploadData) {
        if (uploadDebounceTimer) clearTimeout(uploadDebounceTimer);
        uploadDebounceTimer = setTimeout(() => {
            const dataToUpload = {
                members: members.value,
                matches: matches.value,
                transactions: transactions.value,
                pendingTransactions: pendingTransactions.value,
                pendingAttendances: pendingAttendances.value,
                jerseyPayments: jerseyPayments.value,
                leaveRequests: leaveRequests.value,
                receivables: receivables.value,
                contributionTiers: contributionTiers.value,
                fixedMatches: fixedMatches.value,
                settings: settings.value
            };

            const retryUpload = async (attempt = 1, maxAttempts = 3) => {
                try {
                    isSyncingLocal.value = true;
                    await uploadData(dataToUpload);
                    console.log('✅ Bulk auto-upload successful');
                } catch (error) {
                    console.warn(`⚠️ Bulk upload attempt ${attempt} failed:`, error.message);
                    if (attempt < maxAttempts) {
                        setTimeout(() => retryUpload(attempt + 1, maxAttempts), Math.pow(2, attempt - 1) * 2000);
                    }
                } finally {
                    setTimeout(() => { isSyncingLocal.value = false; }, 2000);
                }
            };
            retryUpload();
        }, 5000);
    }
};

const updateFromFirebase = (data) => {
    if (isSyncingLocal.value) {
        console.log('⏳ Skipping Firebase snapshot update while local write is in progress to prevent state revert.');
        return;
    }
    if (data.members) members.value = data.members;
    if (data.matches) matches.value = data.matches;
    if (data.transactions) transactions.value = data.transactions;
    if (data.pendingTransactions) pendingTransactions.value = data.pendingTransactions;
    if (data.leaveRequests) leaveRequests.value = data.leaveRequests;
    if (data.pendingAttendances) pendingAttendances.value = data.pendingAttendances;
    if (data.jerseyPayments) jerseyPayments.value = data.jerseyPayments;
    if (data.fixedMatches) fixedMatches.value = data.fixedMatches;
    if (data.receivables) receivables.value = data.receivables;
    if (data.contributionTiers) contributionTiers.value = data.contributionTiers;
    if (data.settings) settings.value = data.settings;
    
    localStorage.setItem('members', JSON.stringify(members.value));
    localStorage.setItem('matches', JSON.stringify(matches.value));
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    localStorage.setItem('pendingTransactions', JSON.stringify(pendingTransactions.value));
    localStorage.setItem('pendingAttendances', JSON.stringify(pendingAttendances.value));
    localStorage.setItem('jerseyPayments', JSON.stringify(jerseyPayments.value));
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests.value));
    localStorage.setItem('receivables', JSON.stringify(receivables.value));
    localStorage.setItem('contributionTiers', JSON.stringify(contributionTiers.value));
    localStorage.setItem('fixedMatches', JSON.stringify(fixedMatches.value));
    localStorage.setItem('settings', JSON.stringify(settings.value));
    
    // After syncing from Firebase, check if we need to auto-create monthly debts
    checkAndCreateMonthlyDebts();
};

// CRUD
const addMember = async (memberData) => {
    const newMemberData = typeof memberData === 'string' ? { name: memberData } : memberData;
    const newMember = { 
        id: Date.now(), 
        fundPaid: 0, 
        fines: 0,
        ...newMemberData 
    };
    members.value.push(newMember);
    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        uploadSingleItem('members', newMember)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};
const updateMember = async (id, memberData) => {
    const idx = members.value.findIndex(x => x.id === id);
    if (idx !== -1) {
        if (typeof memberData === 'string') {
            members.value[idx].name = memberData;
        } else {
            Object.assign(members.value[idx], memberData);
        }
        saveData(true);
        if (isSignedIn.value) {
            isSyncingLocal.value = true;
            uploadSingleItem('members', members.value[idx])
                .catch(e => console.error(e))
                .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
        }
    }
};
const deleteMember = async (id) => {
    members.value = members.value.filter(m => m.id !== id);
    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        deleteSingleItem('members', id)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};

const saveMatch = async (matchData) => {
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

    let matchToUpload = null;
    if (matchData.id) {
        // Update existing match
        const idx = matches.value.findIndex(m => m.id === matchData.id);
        if (idx !== -1) {
            const originalId = matches.value[idx].id; // Preserve original ID
            // Remove helper fields correctly using destructuring
            const { 
                preserveAttendanceData: _p, 
                originalAttendance: _o, 
                attendanceIds: _a, 
                ...actualMatchData 
            } = matchData;

            matches.value[idx] = {
                ...matches.value[idx],
                ...actualMatchData,
                id: originalId, // Ensure ID is not overwritten
                attendance // Use the attendance from above
            };
            matchToUpload = matches.value[idx];
        }
    } else {
        // Create new match
        const { id, preserveAttendanceData, originalAttendance, attendanceIds, ...dataWithoutHelpers } = matchData;
        const newMatch = {
            id: Date.now(), // Generate new ID
            ...dataWithoutHelpers,
            attendance
        };
        matches.value.push(newMatch);
        matchToUpload = newMatch;
    }
    saveData(true);
    
    // Level 2: Granular sync for match
    if (isSignedIn.value && matchToUpload) {
        isSyncingLocal.value = true;
        uploadSingleItem('matches', matchToUpload)
            .catch(e => console.error('Error syncing match:', e))
            .finally(() => {
                // Keep flag for a bit to let Firestore listeners settle
                setTimeout(() => { isSyncingLocal.value = false; }, 2000);
            });
    }

    // --- Messenger Notification Trigger ---
    // Only send for NEW matches (not edits) and if webhook is configured
    if (!matchData.id && settings.value.messengerWebhookUrl) {
        sendMessengerNotification(matchToUpload);
    }
};

const sendMessengerNotification = async (matchData) => {
    if (!settings.value.messengerWebhookUrl) return { success: false, message: 'Chưa cấu hình Webhook' };

    const typeLabel = matchData.matchType === 'friendly' ? 'Đấu tập ⚽' : 'Đấu đối ⚔️';
    const dateFormatted = new Date(matchData.date).toLocaleDateString('vi-VN');
    
    // Construct a beautiful message for Messenger
    const message = `
📢 **THÔNG BÁO TRẬN ĐẤU MỚI** 📢

🏟️ **Loại trận:** ${typeLabel}
🆚 **Đối thủ:** ${matchData.opponent || 'Nội bộ'}
📅 **Ngày:** ${dateFormatted}
⏰ **Giờ:** ${matchData.startTime || 'Chưa chốt'}
📍 **Địa điểm:** ${matchData.location || 'Chưa rõ'}

🔗 **Anh em vào điểm danh ngay tại:**
${window.location.origin}

*Chúc anh em có một trận cầu rực lửa!* 🔥
`.trim();

    try {
        const response = await fetch(settings.value.messengerWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                matchId: matchData.id,
                date: matchData.date,
                opponent: matchData.opponent,
                location: matchData.location,
                startTime: matchData.startTime,
                matchType: matchData.matchType,
                appUrl: window.location.origin
            })
        });

        if (response.ok) {
            console.log('✅ Đã gửi thông báo Messenger thành công');
            return { success: true };
        } else {
            console.error('❌ Lỗi khi gửi thông báo Messenger:', response.statusText);
            return { success: false, message: response.statusText };
        }
    } catch (error) {
        console.error('❌ Lỗi kết nối Messenger Webhook:', error);
        return { success: false, message: error.message };
    }
};

const finalizeMatch = async (matchId, penaltyList) => {
    const match = matches.value.find(m => m.id === matchId);
    if (!match || match.finalized) return;

    // 1. Create receivables for each penalty
    const now = new Date().toISOString();
    const newReceivables = penaltyList.map(p => ({
        id: Date.now() + Math.random(),
        memberId: p.memberId,
        amount: p.amount,
        type: p.type, // 'fine', 'pitch_fee'
        description: p.description,
        date: match.date,
        matchId: match.id,
        status: 'unpaid',
        createdAt: now
    }));

    receivables.value.push(...newReceivables);
    match.finalized = true;
    saveData(true);

    // 2. Sync to Firebase
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        const syncPromises = [uploadSingleItem('matches', match)];
        for (const r of newReceivables) syncPromises.push(uploadSingleItem('receivables', r));
        await Promise.all(syncPromises)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};

const addReceivable = async (rData) => {
    const newR = {
        id: Date.now(),
        status: 'unpaid',
        createdAt: new Date().toISOString(),
        ...rData
    };
    receivables.value.push(newR);
    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        uploadSingleItem('receivables', newR)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};

const updateReceivable = async (id, updates) => {
    const idx = receivables.value.findIndex(r => r.id === id);
    if (idx !== -1) {
        receivables.value[idx] = { ...receivables.value[idx], ...updates };
        saveData(true);
        if (isSignedIn.value) {
            isSyncingLocal.value = true;
            uploadSingleItem('receivables', receivables.value[idx])
                .catch(e => console.error(e))
                .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
        }
    }
};
const deleteMatch = async (id) => {


    // 2. Remove associated receivables
    const initialCount = receivables.value.length;
    receivables.value = receivables.value.filter(r => r.matchId !== id);
    const removedCount = initialCount - receivables.value.length;
    if (removedCount > 0) {
        console.log(`📊 Removed ${removedCount} associated receivables for match ${id}`);
    }

    // 3. Remove the match
    matches.value = matches.value.filter(m => m.id !== id);
    
    saveData(true);

    // Level 2: Granular sync for delete
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        deleteSingleItem('matches', id)
            .catch(e => console.error('Error deleting match:', e))
            .finally(() => {
                setTimeout(() => { isSyncingLocal.value = false; }, 2000);
            });
    }
};

const updateMatchAttendance = async (matchId, attendanceData) => {
    const idx = matches.value.findIndex(m => m.id === matchId);
    if (idx !== -1) {
        matches.value[idx] = {
            ...matches.value[idx],
            attendance: attendanceData
        };
        saveData(true);
        if (isSignedIn.value) {
            isSyncingLocal.value = true;
            uploadSingleItem('matches', matches.value[idx])
                .catch(e => console.error(e))
                .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
        }
        return true;
    }
    return false;
};

const addTransaction = async (tData) => {
    const newTx = { id: Date.now(), ...tData };
    transactions.value.push(newTx);

    let updatedMember = null;
    let affectedReceivables = [];

    if (tData.type === 'income' && tData.memberId) {
        // 1. Update member totals (legacy support)
        const member = members.value.find(m => m.id === tData.memberId);
        if (member) {
            // Update legacy member totals correctly based on and categories
            if (tData.category === 'fund' || tData.category === 'monthly_fund') {
                member.fundPaid = (member.fundPaid || 0) + tData.amount;
            } else if (tData.category === 'fine' || tData.category === 'pitch_fee') {
                member.fines = (member.fines || 0) + tData.amount;
            }
            updatedMember = member;
        }

        // 2. Auto Allocation for Receivables (Smart Debt Clearing)
        let remainingAmount = tData.amount;
        // Sort: Fines first, then everything else (by date)
        const unpaidList = receivables.value
            .filter(r => r.memberId === tData.memberId && r.status === 'unpaid')
            .sort((a, b) => {
                if (a.type === 'fine' && b.type !== 'fine') return -1;
                if (a.type !== 'fine' && b.type === 'fine') return 1;
                return new Date(a.date) - new Date(b.date);
            });

        for (const r of unpaidList) {
            if (remainingAmount <= 0) break;
            
            if (remainingAmount >= r.amount) {
                r.status = 'paid';
                r.paidAt = new Date().toISOString();
                r.transactionId = newTx.id;
                remainingAmount -= r.amount;
                affectedReceivables.push(r);
            } else {
                // Partial payment (optional complexity, for now we just cover full ones or skip)
                // In a true ledger we'd track balance, but here let's just mark what we CAN pay fully
                // OR we can allow partial if needed. Let's stick to full for simplicity in this MVP.
            }
        }
    }

    saveData(true);

    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        const syncPromises = [uploadSingleItem('transactions', newTx)];
        if (updatedMember) syncPromises.push(uploadSingleItem('members', updatedMember));
        for (const r of affectedReceivables) {
            syncPromises.push(uploadSingleItem('receivables', r));
        }
        Promise.all(syncPromises)
            .catch(e => console.error('Error syncing transaction data:', e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};

const migrateToReceivables = async (memberStatusList) => {
    // 1. Create legacy receivables for all existing debts
    const now = new Date().toISOString();
    const migrationReceivables = [];

    memberStatusList.forEach(m => {
        if (m.totalDebt > 0) {
            migrationReceivables.push({
                id: Date.now() + Math.random(),
                memberId: m.id,
                amount: m.totalDebt,
                type: 'legacy_debt',
                description: `Dư nợ cũ chuyển đổi (Quỹ: ${m.fundMissing}, Phạt: ${m.fineMissing})`,
                date: new Date().toISOString().split('T')[0],
                status: 'unpaid',
                createdAt: now
            });
        }
    });

    // 2. Mark all existing matches as finalized
    matches.value.forEach(m => {
        m.finalized = true;
    });

    receivables.value.push(...migrationReceivables);
    saveData(true);

    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        const syncPromises = matches.value.map(m => uploadSingleItem('matches', m));
        migrationReceivables.forEach(r => syncPromises.push(uploadSingleItem('receivables', r)));
        await Promise.all(syncPromises)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
    return true;
};

const addFixedMatch = async (fixedData) => {
    const newFixed = {
        id: Date.now(),
        ...fixedData
    };
    fixedMatches.value.push(newFixed);
    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        uploadSingleItem('fixedMatches', newFixed)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};

const deleteFixedMatch = async (id) => {
    fixedMatches.value = fixedMatches.value.filter(m => m.id !== id);
    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        deleteSingleItem('fixedMatches', id)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};

// Automatic match creation disabled temporarily as per user request
const checkAndCreateFixedMatches = async () => {
    return;
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

const approvePendingTransaction = async (id) => {
    if (isSignedIn.value) {
        try {
            const result = await approvePendingTransactionAtomic(id);

            // 1. Remove from pending list
            const approved = pendingTransactions.value.find(p => p.id === id);
            pendingTransactions.value = pendingTransactions.value.filter(p => p.id !== id);

            // 2. Add the new income transaction to local state
            if (result.newTx && !transactions.value.some(t => t.id === result.newTx.id)) {
                transactions.value.push(result.newTx);
            }

            // 3. Update local member balance (legacy fields) to keep UI in sync
            if (result.memberId && approved) {
                const member = members.value.find(m => m.id === result.memberId);
                if (member) {
                    if (approved.category === 'fund') {
                        member.fundPaid = (member.fundPaid || 0) + approved.amount;
                    } else if (approved.category === 'fine') {
                        member.fines = (member.fines || 0) + approved.amount;
                    }
                }
            }

            // 4. Auto-allocate against local receivables (fines first, then by date)
            //    This mirrors what the atomic transaction does in Firestore.
            if (result.memberId && approved) {
                let remaining = approved.amount;
                const paidAt = new Date().toISOString();
                const unpaidList = receivables.value
                    .filter(r => r.memberId === result.memberId && r.status === 'unpaid')
                    .sort((a, b) => {
                        if (a.type === 'fine' && b.type !== 'fine') return -1;
                        if (a.type !== 'fine' && b.type === 'fine') return 1;
                        return new Date(a.date) - new Date(b.date);
                    });

                for (const r of unpaidList) {
                    if (remaining <= 0) break;
                    if (remaining >= r.amount) {
                        r.status = 'paid';
                        r.paidAt = paidAt;
                        r.transactionId = result.newTx.id;
                        remaining -= r.amount;
                    }
                }
            }

            // 5. Persist updated local state
            localStorage.setItem('pendingTransactions', JSON.stringify(pendingTransactions.value));
            localStorage.setItem('transactions', JSON.stringify(transactions.value));
            localStorage.setItem('members', JSON.stringify(members.value));
            localStorage.setItem('receivables', JSON.stringify(receivables.value));

            return true;
        } catch (e) {
            await showAlert('Lỗi: ' + e.message, 'Lỗi phê duyệt');
            throw e;
        }
    } else {
        // Offline fallback: use addTransaction which handles receivable allocation
        const pending = pendingTransactions.value.find(t => t.id === id);
        if (!pending) return false;
        await addTransaction({
            type: pending.type, category: pending.category, amount: pending.amount,
            description: pending.description, date: pending.date, memberId: pending.memberId
        });
        pendingTransactions.value = pendingTransactions.value.filter(t => t.id !== id);
        saveData();
        return true;
    }
};

const rejectPendingTransaction = (id, reason = '') => {
    const pending = pendingTransactions.value.find(t => t.id === id);
    if (!pending) return false;

    // Update status to rejected
    pending.status = 'rejected';
    pending.rejectedAt = new Date().toISOString();
    pending.rejectionReason = reason;
    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        uploadSingleItem('pendingTransactions', pending)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
    return true;
};

const deletePendingTransaction = (id) => {
    pendingTransactions.value = pendingTransactions.value.filter(t => t.id !== id);
    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        deleteSingleItem('pendingTransactions', id)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};

// --- Helpers ---
const getMemberName = (id) => {
    const m = members.value.find(x => x.id === id);
    return m ? m.name : '';
};

const getMemberStats = (memberId) => {
    const total = matches.value.length;
    if (total === 0) return { attendanceRate: 0 };
    const attended = matches.value.filter(m => {
        if (!m.attendance) return false;
        const attList = Array.isArray(m.attendance) ? m.attendance : Object.values(m.attendance);
        return attList.some(a => (a.memberId === memberId || a.memberId === String(memberId) || a.memberId === Number(memberId)) && a.status === 'present');
    }).length;
    return { attendanceRate: Math.round((attended / total) * 100) };
};

const toggleMobileView = () => {
    isMobileView.value = !isMobileView.value;
    localStorage.setItem('isMobileView', isMobileView.value);
};

// --- Exports ---

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

// Leave/Late Arrival Requests Management
const createLeaveRequest = (requestData) => {
    const newRequest = {
        id: Date.now(),
        memberId: requestData.memberId,
        memberName: requestData.memberName,
        leaveDate: requestData.leaveDate,
        matchId: requestData.matchId || null,
        reason: requestData.reason.trim(),
        type: requestData.type || 'leave', // 'leave' or 'late'
        lateMinutes: requestData.lateMinutes || 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
        processedAt: null,
        adminNote: null
    };

    leaveRequests.value.push(newRequest);
    saveData(true);
    
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        uploadSingleItem('leaveRequests', newRequest)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
    
    return newRequest;
};

const approveLeaveRequest = (id, adminNote = '') => {
    const request = leaveRequests.value.find(r => r.id === id);
    if (!request) return false;

    request.status = 'approved';
    request.processedAt = new Date().toISOString();
    request.adminNote = adminNote.trim() || null;

    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        uploadSingleItem('leaveRequests', request)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
    return true;
};

const rejectLeaveRequest = (id, adminNote = '') => {
    const request = leaveRequests.value.find(r => r.id === id);
    if (!request) return false;

    request.status = 'rejected';
    request.processedAt = new Date().toISOString();
    request.adminNote = adminNote.trim() || null;

    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        uploadSingleItem('leaveRequests', request)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
    return true;
};

const deleteLeaveRequest = (id) => {
    leaveRequests.value = leaveRequests.value.filter(r => r.id !== id);
    saveData(true);
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        deleteSingleItem('leaveRequests', id)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
};

// Pending Attendance Requests (Manual Check-ins)
const updateManualAttendanceRequest = async (request, action = 'save') => {
    if (action === 'approve' && isSignedIn.value) {
        try {
            await approveAttendanceAtomic(request.id, request.matchId, request.memberId);
            pendingAttendances.value = pendingAttendances.value.filter(r => r.id !== request.id);
            localStorage.setItem('pendingAttendances', JSON.stringify(pendingAttendances.value));
            return;
        } catch (e) {
            await showAlert('Lỗi: ' + e.message, 'Lỗi điểm danh');

            throw e;
        }
    }

    const idx = pendingAttendances.value.findIndex(r => r.id === request.id);
    if (idx !== -1) {
        pendingAttendances.value[idx] = { ...request };
    } else {
        pendingAttendances.value.push({ ...request });
    }
    
    saveData(true);
    
    if (isSignedIn.value) {
        isSyncingLocal.value = true;
        uploadSingleItem('pendingAttendances', request)
            .catch(e => console.error(e))
            .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
    }
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

const getPassword = (role) => {
    // Default hashes for:
    // admin: khongngungbocuoc
    // ketoan: ketoantinhhoa
    const defaultAdminHash = bcrypt.hashSync('khongngungbocuoc', 10);
    const defaultAccountantHash = bcrypt.hashSync('tinhhoafc2025', 10);

    if (role === 'admin') return settings.value.adminPassword || defaultAdminHash;
    if (role === 'ketoan') return settings.value.accountantPassword || defaultAccountantHash;
    return '';
};

const updatePassword = async (role, newPassword) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    
    if (role === 'admin') {
        settings.value.adminPassword = hash;
    } else if (role === 'ketoan') {
        settings.value.accountantPassword = hash;
    }
    saveData();
};


const addContributionTier = (tierData) => {
    const newTier = {
        id: Date.now(),
        ...tierData
    };
    contributionTiers.value.push(newTier);
    saveData();
};

const updateJerseyPayment = async (memberId, updates) => {
    const idx = jerseyPayments.value.findIndex(p => p.memberId === memberId);
    if (idx !== -1) {
        jerseyPayments.value[idx] = { ...jerseyPayments.value[idx], ...updates };
        saveData(true);
        if (isSignedIn.value) {
            isSyncingLocal.value = true;
            uploadSingleItem('jerseyPayments', jerseyPayments.value[idx])
                .catch(e => console.error(e))
                .finally(() => setTimeout(() => { isSyncingLocal.value = false; }, 2000));
        }
    }
};

const showAlert = (message, title = 'Thông báo') => {
    let type = 'info';
    const lowerTitle = title.toLowerCase();
    const lowerMessage = message.toLowerCase();
    
    if (lowerTitle.includes('lỗi') || lowerMessage.includes('lỗi') || message.includes('❌')) {
        type = 'error';
    } else if (lowerTitle.includes('thành công') || lowerMessage.includes('thành công') || message.includes('✅')) {
        type = 'success';
    } else if (lowerTitle.includes('cảnh báo') || message.includes('⚠️')) {
        type = 'warning';
    }

    const { showToast } = useToast();
    showToast(message, type);
    
    return Promise.resolve();
};

const showConfirm = (message, title = 'Xác nhận') => {
    return new Promise((resolve) => {
        dialog.value = {
            show: true,
            title,
            message,
            type: 'confirm',
            resolve
        };
    });
};

const showPrompt = (message, title = 'Nhập thông tin', defaultValue = '') => {
    return new Promise((resolve) => {
        dialog.value = {
            show: true,
            title,
            message,
            type: 'prompt',
            resolve,
            inputValue: defaultValue
        };
    });
};


// Main application state management (Firebase Realtime DB sync, Automated Match Creation, and Messenger notifications)
export const useAppState = () => {
    return {
        // State
        members,
        matches,
        transactions,
        pendingTransactions,
        leaveRequests,
        pendingAttendances,
        jerseyPayments,
        fixedMatches,
        contributionTiers,
        settings,
        stats,
        sortedMatches,
        futureMatches,
        receivables,
        isInitialized,
        isSyncingLocal,
        isMobileView,

        // Actions
        loadData,
        saveData,
        updateFromFirebase,
        addMember,
        updateMember,
        deleteMember,
        saveMatch,
        finalizeMatch,
        updateMatchAttendance,
        deleteMatch,
        addTransaction,
        deleteTransaction,
        addReceivable,
        updateReceivable,
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
        updateManualAttendanceRequest,
        updateJerseyPayment,
        addFixedMatch,
        deleteFixedMatch,
        checkAndCreateFixedMatches,
        migrateToReceivables,

        // Helpers
        getMemberName,
        getMemberStats,
        getContributionTier,
        getMemberLeaveRequests,
        hasApprovedLeave,
        getPassword,
        updatePassword,
        toggleMobileView,
        sendMessengerNotification,
        showAlert,
        showConfirm,
        showPrompt,
        dialog
    };
};

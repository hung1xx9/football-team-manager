import { ref, readonly } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/messaging';

// State
const isConfigured = ref(false);
const isSignedIn = ref(false);
const user = ref(null);
const syncStatus = ref('idle'); 
const lastSyncTime = ref(null);
const hasNewUpdate = ref(false); 

let db = null;
let auth = null;
let storage = null;
let realtimeListeners = []; 

const getRootRef = () => {
    const docId = import.meta.env.VITE_USE_TEST_DATA === 'true' ? 'testing' : 'primary';
    return db.collection('teams').doc(docId);
}; 

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const isCredentialsConfigured = () => {
    return firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key_here';
};

const initFirebase = async () => {
    if (!isCredentialsConfigured()) return;
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        auth = firebase.auth();
        storage = firebase.storage();

        firebase.auth().onAuthStateChanged((u) => {
            user.value = u;
            isSignedIn.value = !!u;
            console.log('Firebase auth state:', u ? 'Signed in' : 'Signed out');
        });
        isConfigured.value = true;
    } catch (error) {
        console.error('Firebase init failed:', error);
    }
};

const requestNotificationPermission = async () => {
    try {
        if (!firebase.messaging.isSupported()) {
            console.warn('Firebase Messaging is not supported in this browser.');
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const messaging = firebase.messaging();
            const token = await messaging.getToken({ vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
            
            if (token && db) {
                // Save the token globally for this app instance
                await getRootRef()
                    .collection('fcmTokens').doc(token)
                    .set({
                        token: token,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                console.log('✅ FCM Push Notification Token saved successfully!');
            }
        } else {
            console.warn('Push notification permission denied by user.');
        }
    } catch (e) {
        console.error('Error getting notification permission:', e);
    }
};

const signIn = async () => {
    if (!isConfigured.value) return;
    try {
        await firebase.auth().signInAnonymously();
        // Sau khi đăng nhập, xin quyền gửi thông báo luôn
        setTimeout(() => {
            requestNotificationPermission();
        }, 3000); // Đợi 3s để app load xong giao diện, request sẽ đỡ bị block
    } catch (e) {
        console.error('Sign in error:', e);
    }
};

const signOut = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.error(e);
    }
};

// --- Level 1 & 2: Granular Writes & Common Helpers ---

const cleanObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    const cleaned = { ...obj };
    Object.keys(cleaned).forEach(key => {
        if (cleaned[key] === undefined) delete cleaned[key];
        else if (cleaned[key] !== null && typeof cleaned[key] === 'object' && !Array.isArray(cleaned[key])) {
            // Recursive clean for nested objects (not arrays)
            cleaned[key] = cleanObject(cleaned[key]);
        }
    });
    return cleaned;
};

/**
 * uploadData - Bulk sync use Batch + Merge (v2 architecture)
 */
const uploadData = async (data) => {
    if (!isSignedIn.value || !db) return false;
    syncStatus.value = 'syncing';
    try {
        const rootRef = getRootRef();
        const batch = db.batch();

        batch.set(rootRef, cleanObject({
            settings: data.settings || {},
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
            archVersion: 'v2'
        }), { merge: true });

        const collections = {
            'members': data.members,
            'matches': data.matches,
            'transactions': data.transactions,
            'pendingTransactions': data.pendingTransactions,
            'pendingAttendances': data.pendingAttendances,
            'leaveRequests': data.leaveRequests,
            'receivables': data.receivables,
            'contributionTiers': data.contributionTiers,
            'fixedMatches': data.fixedMatches
        };

        for (const [colName, items] of Object.entries(collections)) {
            const colRef = rootRef.collection(colName);
            (items || []).forEach(item => {
                const cleanedItem = cleanObject(item);
                batch.set(colRef.doc(String(item.id)), {
                    ...cleanedItem,
                    _updatedAt: Date.now()
                }, { merge: true });
            });
        }

        await batch.commit();
        syncStatus.value = 'success';
        lastSyncTime.value = new Date();
        return true;
    } catch (e) {
        console.error('Upload error:', e);
        syncStatus.value = 'error';
        throw e;
    }
};

const uploadSingleItem = async (collectionName, item) => {
    if (!isSignedIn.value || !db) return false;
    try {
        const rootRef = getRootRef();
        const docRef = rootRef.collection(collectionName).doc(String(item.id));
        const cleanedItem = cleanObject(item);
        await docRef.set({ ...cleanedItem, _updatedAt: Date.now() }, { merge: true });
        await rootRef.set({ lastUpdated: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return true;
    } catch (e) {
        console.error('uploadSingleItem error:', e);
        throw e;
    }
};

const deleteSingleItem = async (collectionName, itemId) => {
    if (!isSignedIn.value || !db) return false;
    try {
        const rootRef = getRootRef();
        await rootRef.collection(collectionName).doc(String(itemId)).delete();
        await rootRef.set({ lastUpdated: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return true;
    } catch (e) {
        console.error('deleteSingleItem error:', e);
        throw e;
    }
};

// --- Level 2: Firestore Transactions Core ---

const runAtomicTransaction = async (transactionFn) => {
    if (!isSignedIn.value || !db) throw new Error('Firebase not ready');
    try {
        const rootRef = getRootRef();
        return await db.runTransaction(async (transaction) => {
            return await transactionFn(transaction, rootRef, firebase);
        });
    } catch (e) {
        console.error('Atomic transaction failed:', e);
        throw e;
    }
};

/**
 * approvePendingTransactionAtomic - Approve payment atomically
 * Also marks matching unpaid receivables as paid for the member.
 *
 * Strategy:
 *  - Query receivable doc IDs OUTSIDE the transaction (queries can't be done inside)
 *  - Inside the transaction, transaction.get() each doc individually (all reads first)
 *  - Then perform all writes
 */
const approvePendingTransactionAtomic = async (pendingId) => {
    if (!isSignedIn.value || !db) throw new Error('Firebase not ready');
    const rootRef = getRootRef();
    const pendingRef = rootRef.collection('pendingTransactions').doc(String(pendingId));

    // Pre-read: get pending doc to know the memberId (needed for query)
    const preSnap = await pendingRef.get();
    if (!preSnap.exists) throw new Error('Yêu cầu không còn tồn tại.');
    const prePending = preSnap.data();
    if (prePending.status === 'approved') throw new Error('Yêu cầu đã được duyệt trước đó.');

    // Query unpaid receivable doc IDs for this member OUTSIDE the transaction
    let receivableDocIds = [];
    if (prePending.memberId) {
        const receivablesSnap = await rootRef.collection('receivables')
            .where('memberId', '==', prePending.memberId)
            .where('status', '==', 'unpaid')
            .get();
        receivableDocIds = receivablesSnap.docs.map(d => d.id);
    }

    // Run the atomic Firestore transaction
    return db.runTransaction(async (transaction) => {
        // === ALL READS FIRST ===
        const pendingSnap = await transaction.get(pendingRef);
        if (!pendingSnap.exists) throw new Error('Yêu cầu không còn tồn tại.');
        const pending = pendingSnap.data();
        if (pending.status === 'approved') throw new Error('Yêu cầu đã được duyệt trước đó.');

        let memberSnap = null;
        let memberRef = null;
        if (pending.memberId) {
            memberRef = rootRef.collection('members').doc(String(pending.memberId));
            memberSnap = await transaction.get(memberRef);
        }

        // Read each receivable doc individually inside the transaction
        const receivableItems = [];
        for (const docId of receivableDocIds) {
            const ref = rootRef.collection('receivables').doc(docId);
            const snap = await transaction.get(ref);
            if (snap.exists && snap.data().status === 'unpaid') {
                receivableItems.push({ ref, data: snap.data() });
            }
        }

        // === ALL WRITES AFTER ALL READS ===

        // 1. Create income transaction
        const newTxId = Date.now();
        const txRef = rootRef.collection('transactions').doc(String(newTxId));
        const newTx = {
            id: newTxId,
            type: 'income',
            category: pending.category,
            amount: pending.amount,
            description: pending.description || `Duyệt đóng ${pending.category}`,
            date: new Date().toISOString(),
            memberId: pending.memberId,
            _approvedFrom: pendingId
        };
        transaction.set(txRef, { ...newTx, _updatedAt: Date.now() });

        // 2. Update member balance (legacy fields)
        if (memberRef && memberSnap && memberSnap.exists) {
            const member = memberSnap.data();
            const update = {};
            if (pending.category === 'fund') update.fundPaid = (member.fundPaid || 0) + pending.amount;
            else if (pending.category === 'fine') update.fines = (member.fines || 0) + pending.amount;
            if (Object.keys(update).length > 0) {
                transaction.update(memberRef, { ...update, _updatedAt: Date.now() });
            }
        }

        // 3. Auto-allocate against unpaid receivables (fines first, then oldest first)
        const updatedReceivableIds = [];
        const sorted = [...receivableItems].sort((a, b) => {
            if (a.data.type === 'fine' && b.data.type !== 'fine') return -1;
            if (a.data.type !== 'fine' && b.data.type === 'fine') return 1;
            return new Date(a.data.date) - new Date(b.data.date);
        });
        let remaining = pending.amount;
        const paidAt = new Date().toISOString();
        for (const item of sorted) {
            if (remaining <= 0) break;
            if (remaining >= item.data.amount) {
                transaction.update(item.ref, { status: 'paid', paidAt, transactionId: newTxId, _updatedAt: Date.now() });
                remaining -= item.data.amount;
                updatedReceivableIds.push(item.data.id != null ? item.data.id : item.ref.id);
            }
        }

        // 4. Delete pending transaction
        transaction.delete(pendingRef);

        // 5. Append audit log entry inside the same transaction
        if (memberRef && memberSnap && memberSnap.exists) {
            const memberBefore = memberSnap.data();
            const fundDelta = pending.category === 'fund' ? pending.amount : 0;
            const fineDelta = pending.category === 'fine' ? pending.amount : 0;
            const logRef = rootRef.collection('members').doc(String(pending.memberId)).collection('financialAuditLog').doc();
            transaction.set(logRef, {
                id: logRef.id,
                memberId: pending.memberId,
                changeType: 'fund_approved',
                before: { fundPaid: memberBefore.fundPaid || 0, fines: memberBefore.fines || 0 },
                after: {
                    fundPaid: (memberBefore.fundPaid || 0) + fundDelta,
                    fines: (memberBefore.fines || 0) + fineDelta,
                },
                delta: pending.amount,
                sourceId: newTxId,
                sourceType: 'transaction',
                description: pending.description || `Duyệt đóng ${pending.category}`,
                performedBy: 'admin',
                timestamp: new Date().toISOString(),
                _updatedAt: Date.now(),
            });
        }

        transaction.set(rootRef, { lastUpdated: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return { newTx, memberId: pending.memberId, updatedReceivableIds };
    });
};


/**
 * approveAttendanceAtomic - Approve attendance atomically
 */
const approveAttendanceAtomic = async (requestId, matchId, memberId) => {
    return runAtomicTransaction(async (transaction, rootRef, fb) => {
        const matchRef = rootRef.collection('matches').doc(String(matchId));
        const requestRef = rootRef.collection('pendingAttendances').doc(String(requestId));

        const [mSnap, rSnap] = await Promise.all([transaction.get(matchRef), transaction.get(requestRef)]);
        if (!mSnap.exists || !rSnap.exists) throw new Error('Dữ liệu không còn tồn tại.');

        const match = mSnap.data();
        let attList = Array.isArray(match.attendance) ? [...(match.attendance || [])] : Object.values(match.attendance || {});
        
        const mId = memberId;
        const idx = attList.findIndex(a => a.memberId === mId || a.memberId === String(mId) || a.memberId === Number(mId));
        
        const updObj = {
            memberId: mId,
            status: 'present',
            timestamp: new Date().toISOString(),
            method: 'manual_approved'
        };
        
        if (idx !== -1) {
            attList[idx] = { ...attList[idx], ...updObj };
        } else {
            attList.push(updObj);
        }

        transaction.update(matchRef, { 
            attendance: attList,
            _updatedAt: Date.now()
        });
        transaction.delete(requestRef);
        transaction.set(rootRef, { lastUpdated: fb.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return { matchId, memberId, attendance: attList };
    });
};

// --- Level 3: Financial Sync Operations ---

/**
 * appendAuditLog - Write a financial audit log entry for a member (T005)
 */
const appendAuditLog = async (memberId, entry) => {
    if (!isSignedIn.value || !db) return null;
    const rootRef = getRootRef();
    const logRef = rootRef
        .collection('members').doc(String(memberId))
        .collection('financialAuditLog').doc();
    const fullEntry = {
        id: logRef.id,
        memberId,
        timestamp: new Date().toISOString(),
        performedBy: 'admin',
        _updatedAt: Date.now(),
        ...entry,
    };
    await logRef.set(fullEntry);
    return logRef.id;
};

/**
 * reconcileMemberAtomic - Recalculate and correct member balance from transactions (T006)
 */
const reconcileMemberAtomic = async (memberId) => {
    if (!isSignedIn.value || !db) throw new Error('Firebase not ready');
    const rootRef = getRootRef();

    // Pre-read: get all income transactions for this member outside the transaction
    const txSnap = await rootRef.collection('transactions')
        .where('memberId', '==', memberId)
        .where('type', '==', 'income')
        .get();
    const txDocs = txSnap.docs.map(d => d.data());

    const expectedFundPaid = txDocs
        .filter(t => ['fund', 'monthly_fund'].includes(t.category))
        .reduce((sum, t) => sum + (t.amount || 0), 0);
    const expectedFines = txDocs
        .filter(t => ['fine', 'pitch_fee'].includes(t.category))
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const memberRef = rootRef.collection('members').doc(String(memberId));

    return db.runTransaction(async (transaction) => {
        // ALL READS FIRST
        const memberSnap = await transaction.get(memberRef);
        if (!memberSnap.exists) throw new Error('Thành viên không tồn tại');

        const member = memberSnap.data();
        const before = { fundPaid: member.fundPaid || 0, fines: member.fines || 0 };
        const after  = { fundPaid: expectedFundPaid, fines: expectedFines };

        // ALL WRITES AFTER READS
        transaction.update(memberRef, { ...after, _updatedAt: Date.now() });

        const logRef = rootRef.collection('members').doc(String(memberId))
            .collection('financialAuditLog').doc();
        transaction.set(logRef, {
            id: logRef.id,
            memberId,
            changeType: 'reconciliation',
            before,
            after,
            delta: (after.fundPaid + after.fines) - (before.fundPaid + before.fines),
            sourceId: null,
            sourceType: 'reconciliation',
            description: 'Đồng bộ lại số dư từ lịch sử giao dịch',
            performedBy: 'system',
            timestamp: new Date().toISOString(),
            _updatedAt: Date.now(),
        });

        transaction.set(rootRef, { lastUpdated: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return { before, after, delta: (after.fundPaid + after.fines) - (before.fundPaid + before.fines) };
    });
};

/**
 * postAttendanceFeeAtomic - Create/void receivable when attendance status changes (T007)
 * feeAmount & feeDescription pre-calculated by caller (usePenalties)
 */
const postAttendanceFeeAtomic = async (matchId, memberId, attendanceRecord, feeAmount, feeDescription) => {
    if (!isSignedIn.value || !db) throw new Error('Firebase not ready');
    const rootRef = getRootRef();

    // Pre-read existing unpaid receivables for this match+member outside transaction
    const existingSnap = await rootRef.collection('receivables')
        .where('matchId', '==', matchId)
        .where('memberId', '==', memberId)
        .where('status', '==', 'unpaid')
        .get();
    const existingDocIds = existingSnap.docs.map(d => d.id);

    return db.runTransaction(async (transaction) => {
        // ALL READS FIRST
        const existingItems = [];
        for (const docId of existingDocIds) {
            const ref = rootRef.collection('receivables').doc(docId);
            const snap = await transaction.get(ref);
            if (snap.exists) existingItems.push({ ref, data: snap.data() });
        }

        // ALL WRITES AFTER READS
        let voidedReceivableId = null;
        for (const item of existingItems) {
            transaction.update(item.ref, { status: 'voided', _updatedAt: Date.now() });
            voidedReceivableId = item.data.id || item.ref.id;
        }

        let newReceivable = null;
        if (feeAmount > 0) {
            const newId = Date.now() + Math.random();
            const newRef = rootRef.collection('receivables').doc(String(newId));
            newReceivable = {
                id: newId,
                memberId,
                matchId,
                amount: feeAmount,
                type: 'fine',
                description: feeDescription || 'Phí điểm danh',
                date: new Date().toISOString().split('T')[0],
                attendanceStatus: attendanceRecord.status,
                status: 'unpaid',
                createdAt: new Date().toISOString(),
                _updatedAt: Date.now(),
            };
            transaction.set(newRef, newReceivable);
        }

        // Audit log
        const logRef = rootRef.collection('members').doc(String(memberId))
            .collection('financialAuditLog').doc();
        transaction.set(logRef, {
            id: logRef.id,
            memberId,
            changeType: 'attendance_edit',
            before: { feeAmount: existingItems[0]?.data?.amount || 0, status: existingItems.length > 0 ? 'unpaid' : 'none' },
            after: { feeAmount: feeAmount || 0, status: feeAmount > 0 ? 'unpaid' : 'voided' },
            delta: (feeAmount || 0) - (existingItems[0]?.data?.amount || 0),
            sourceId: matchId,
            sourceType: 'match',
            description: feeDescription || 'Cập nhật phí theo điểm danh',
            performedBy: 'admin',
            timestamp: new Date().toISOString(),
            _updatedAt: Date.now(),
        });

        transaction.set(rootRef, { lastUpdated: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return { voidedReceivableId, newReceivable };
    });
};

/**
 * voidMatchFeesAtomic - Void all unpaid receivables for a deleted/cancelled match (T008)
 */
const voidMatchFeesAtomic = async (matchId) => {
    if (!isSignedIn.value || !db) throw new Error('Firebase not ready');
    const rootRef = getRootRef();

    // Pre-read outside transaction
    const receivablesSnap = await rootRef.collection('receivables')
        .where('matchId', '==', matchId)
        .where('status', '==', 'unpaid')
        .get();

    if (receivablesSnap.empty) return { voidedCount: 0, affectedMemberIds: [] };

    const docItems = receivablesSnap.docs.map(d => ({ id: d.id, data: d.data() }));

    return db.runTransaction(async (transaction) => {
        // ALL READS FIRST
        const items = [];
        for (const { id, data } of docItems) {
            const ref = rootRef.collection('receivables').doc(id);
            const snap = await transaction.get(ref);
            if (snap.exists && snap.data().status === 'unpaid') {
                items.push({ ref, data: snap.data() });
            }
        }

        // ALL WRITES AFTER READS
        const affectedMemberIds = [...new Set(items.map(i => i.data.memberId))];

        for (const item of items) {
            transaction.update(item.ref, { status: 'voided', _updatedAt: Date.now() });
        }

        for (const memberId of affectedMemberIds) {
            const memberItems = items.filter(i => i.data.memberId === memberId);
            const totalVoided = memberItems.reduce((sum, i) => sum + (i.data.amount || 0), 0);
            const logRef = rootRef.collection('members').doc(String(memberId))
                .collection('financialAuditLog').doc();
            transaction.set(logRef, {
                id: logRef.id,
                memberId,
                changeType: 'match_cancelled',
                before: { receivablesCount: memberItems.length, totalAmount: totalVoided },
                after:  { receivablesCount: 0, totalAmount: 0 },
                delta: -totalVoided,
                sourceId: matchId,
                sourceType: 'match',
                description: 'Hủy khoản phí trận đấu (trận bị xóa)',
                performedBy: 'admin',
                timestamp: new Date().toISOString(),
                _updatedAt: Date.now(),
            });
        }

        transaction.set(rootRef, { lastUpdated: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return { voidedCount: items.length, affectedMemberIds };
    });
};

/**
 * getMemberAuditLogFromFirestore - Lazy-fetch audit log for a member (T026)
 */
const getMemberAuditLogFromFirestore = async (memberId, options = {}) => {
    if (!db) return [];
    const { startDate, endDate, limit = 50 } = options;
    const rootRef = getRootRef();

    let query = rootRef
        .collection('members').doc(String(memberId))
        .collection('financialAuditLog')
        .orderBy('timestamp', 'desc')
        .limit(limit);

    if (startDate) query = query.where('timestamp', '>=', startDate);
    if (endDate)   query = query.where('timestamp', '<=', endDate);

    const snap = await query.get();
    return snap.docs.map(d => d.data());
};

const downloadData = async () => {
    if (!db) return null;
    syncStatus.value = 'syncing';
    try {
        const rootRef = getRootRef();
        const rootSnap = await rootRef.get();
        if (!rootSnap.exists) return null;

        const rootData = rootSnap.data();
        const data = {
            settings: rootData.settings || {},
            members: [],
            matches: [],
            transactions: [],
            pendingTransactions: [],
            pendingAttendances: [],
            leaveRequests: [],
            contributionTiers: [],
            fixedMatches: []
        };

        const colNames = ['members', 'matches', 'transactions', 'pendingTransactions', 'pendingAttendances', 'leaveRequests', 'receivables', 'contributionTiers', 'fixedMatches'];
        const results = await Promise.all(colNames.map(name => rootRef.collection(name).get()));

        results.forEach((snap, idx) => {
            const name = colNames[idx];
            data[name] = snap.docs.map(doc => {
                const d = doc.data();
                delete d._updatedAt; // Remove internal tracking field
                return d;
            });
        });

        syncStatus.value = 'success';
        lastSyncTime.value = rootData.lastUpdated?.toDate?.() || new Date();
        return data;
    } catch (e) {
        console.error('Download error:', e);
        syncStatus.value = 'error';
        throw e;
    }
};

const setupRealtimeListener = (onUpdate) => {
    if (!db) return null;
    stopRealtimeListener();
    
    const rootRef = getRootRef();
    let debounceTimer = null;
    const triggerUpdate = async () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            const fullData = await downloadData();
            if (fullData && onUpdate) onUpdate(fullData);
        }, 1500);
    };

    const unsubRoot = rootRef.onSnapshot((doc) => { if (doc.exists) triggerUpdate(); });
    const colNames = ['members', 'matches', 'transactions', 'pendingTransactions', 'pendingAttendances', 'leaveRequests', 'receivables', 'contributionTiers', 'fixedMatches'];
    const subUnsubs = colNames.map(name => rootRef.collection(name).onSnapshot(() => triggerUpdate()));

    realtimeListeners = [unsubRoot, ...subUnsubs];
    return stopRealtimeListener;
};

const stopRealtimeListener = () => {
    realtimeListeners.forEach(unsub => unsub());
    realtimeListeners = [];
    hasNewUpdate.value = false;
};

export const useFirebase = () => {
    return {
        isConfigured: readonly(isConfigured),
        isSignedIn: readonly(isSignedIn),
        user: readonly(user),
        syncStatus,
        lastSyncTime: readonly(lastSyncTime),
        hasNewUpdate: readonly(hasNewUpdate),
        initFirebase,
        signIn,
        signOut,
        uploadData,
        uploadSingleItem,
        deleteSingleItem,
        approvePendingTransactionAtomic,
        approveAttendanceAtomic,
        downloadData,
        setupRealtimeListener,
        stopRealtimeListener,
        requestNotificationPermission,
        // T009: Financial sync operations
        appendAuditLog,
        reconcileMemberAtomic,
        postAttendanceFeeAtomic,
        voidMatchFeesAtomic,
        getMemberAuditLogFromFirestore,
    };
};

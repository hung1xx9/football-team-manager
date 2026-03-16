import { ref, readonly } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

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

const signIn = async () => {
    if (!isConfigured.value) return;
    try {
        await firebase.auth().signInAnonymously();
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
        const rootRef = db.collection('teams').doc('primary');
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
        const rootRef = db.collection('teams').doc('primary');
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
        const rootRef = db.collection('teams').doc('primary');
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
        const rootRef = db.collection('teams').doc('primary');
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
 */
const approvePendingTransactionAtomic = async (pendingId) => {
    return runAtomicTransaction(async (transaction, rootRef, fb) => {
        const pendingRef = rootRef.collection('pendingTransactions').doc(String(pendingId));
        const pendingSnap = await transaction.get(pendingRef);

        if (!pendingSnap.exists) throw new Error('Yêu cầu không còn tồn tại.');
        const pending = pendingSnap.data();
        if (pending.status === 'approved') throw new Error('Yêu cầu đã được duyệt trước đó.');

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
        transaction.set(txRef, newTx);

        // 2. Update member balance
        if (pending.memberId) {
            const memberRef = rootRef.collection('members').doc(String(pending.memberId));
            const memberSnap = await transaction.get(memberRef);
            if (memberSnap.exists) {
                const member = memberSnap.data();
                const update = {};
                if (pending.category === 'fund') update.fundPaid = (member.fundPaid || 0) + pending.amount;
                else if (pending.category === 'fine') update.fines = (member.fines || 0) + pending.amount;
                transaction.update(memberRef, update);
            }
        }

        // 3. Delete pending
        transaction.delete(pendingRef);
        
        transaction.set(rootRef, { lastUpdated: fb.firestore.FieldValue.serverTimestamp() }, { merge: true });
        return { newTx, memberId: pending.memberId };
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

const downloadData = async () => {
    if (!db) return null;
    syncStatus.value = 'syncing';
    try {
        const rootRef = db.collection('teams').doc('primary');
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

        const colNames = ['members', 'matches', 'transactions', 'pendingTransactions', 'pendingAttendances', 'leaveRequests', 'contributionTiers', 'fixedMatches'];
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
    
    const rootRef = db.collection('teams').doc('primary');
    let debounceTimer = null;
    const triggerUpdate = async () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            const fullData = await downloadData();
            if (fullData && onUpdate) onUpdate(fullData);
        }, 1500);
    };

    const unsubRoot = rootRef.onSnapshot((doc) => { if (doc.exists) triggerUpdate(); });
    const colNames = ['members', 'matches', 'transactions', 'pendingTransactions', 'pendingAttendances', 'leaveRequests', 'contributionTiers', 'fixedMatches'];
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
        stopRealtimeListener
    };
};

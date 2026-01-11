import { ref, readonly } from 'vue';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// State (Global Singleton-like state for the composable)
const isConfigured = ref(false);
const isSignedIn = ref(false);
const user = ref(null);
const syncStatus = ref('idle'); // idle, syncing, success, error
const lastSyncTime = ref(null);

let db = null;
let auth = null;

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

// --- Actions ---

const initFirebase = async () => {
    if (!isCredentialsConfigured()) {
        console.warn('Firebase config missing');
        return;
    }

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        auth = firebase.auth();

        firebase.auth().onAuthStateChanged((u) => {
            user.value = u;
            isSignedIn.value = !!u;

            // Realtime sync DISABLED - manual sync only
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
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    } catch (e) {
        console.error('Sign in error:', e);
        alert('Lỗi đăng nhập: ' + e.message);
    }
};

const signOut = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.error(e);
    }
};

const uploadData = async (data) => {
    if (!isSignedIn.value || !db) {
        console.warn('Cannot upload: not signed in or DB not initialized');
        return false;
    }

    syncStatus.value = 'syncing';
    try {
        // Use a shared document for the team data
        await db.collection('teams').doc('primary').set({
            members: data.members || [],
            matches: data.matches || [],
            transactions: data.transactions || [],
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
        syncStatus.value = 'success';
        lastSyncTime.value = new Date();
        return true;
    } catch (e) {
        console.error('Upload error:', e);
        syncStatus.value = 'error';
        throw e;
    }
};

const downloadData = async () => {
    // Allow download even if not signed in (for Guests)
    if (!db) {
        console.warn('Cannot download: DB not initialized');
        return null;
    }

    syncStatus.value = 'syncing';
    try {
        // 1. Try reading from the shared document (Primary source)
        console.log('Attempting to download from teams/primary...');
        const primaryDoc = await db.collection('teams').doc('primary').get();

        if (primaryDoc.exists) {
            console.log('Found data in teams/primary');
            syncStatus.value = 'success';
            lastSyncTime.value = new Date();
            return primaryDoc.data();
        }

        // 2. Fallback: If primary is empty AND user is signed in, try their private doc (Migration)
        if (isSignedIn.value && user.value) {
            console.log('teams/primary empty. Checking legacy user doc:', user.value.uid);
            const userDoc = await db.collection('teams').doc(user.value.uid).get();

            if (userDoc.exists) {
                console.log('Found data in legacy user doc. Next upload will sync to primary.');
                syncStatus.value = 'success';
                lastSyncTime.value = new Date();
                return userDoc.data();
            }
        }

        console.log('No data found in Cloud');
        syncStatus.value = 'idle';
        return null; // No data found anywhere

    } catch (e) {
        console.error('Download error:', e);
        syncStatus.value = 'error';
        throw e;
    }
};

export const useFirebase = () => {
    return {
        isConfigured: readonly(isConfigured),
        isSignedIn: readonly(isSignedIn),
        user: readonly(user),
        syncStatus,
        lastSyncTime: readonly(lastSyncTime),
        initFirebase,
        signIn,
        signOut,
        uploadData,
        downloadData
    };
};

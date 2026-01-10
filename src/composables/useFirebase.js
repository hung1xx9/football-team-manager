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

const firebaseConfig = {
    apiKey: "AIzaSyCb3uX6bNgt4kF5ZTYmABvhq_g5icip2no",
    authDomain: "football-team-manager-14a39.firebaseapp.com",
    projectId: "football-team-manager-14a39",
    storageBucket: "football-team-manager-14a39.firebasestorage.app",
    messagingSenderId: "898490516886",
    appId: "1:898490516886:web:89ff40fb808556148e89b7",
    measurementId: "G-5P0NY1N9HY"
};

const isCredentialsConfigured = () => {
    return firebaseConfig.apiKey !== 'YOUR_API_KEY';
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
        const userId = user.value.uid;
        await db.collection('teams').doc(userId).set({
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
    if (!isSignedIn.value || !db) {
        console.warn('Cannot download: not signed in or DB not initialized');
        return null;
    }

    syncStatus.value = 'syncing';
    try {
        const userId = user.value.uid;
        const doc = await db.collection('teams').doc(userId).get();

        if (doc.exists) {
            syncStatus.value = 'success';
            lastSyncTime.value = new Date();
            return doc.data();
        } else {
            syncStatus.value = 'idle';
            return null;
        }
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

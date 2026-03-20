
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

const collectionsToClear = ['transactions', 'pendingTransactions', 'receivables', 'matches', 'pendingAttendances'];

async function clearAllFinance() {
    console.log('🚀 Authenticating anonymously...');
    await auth.signInAnonymously();
    console.log('✅ Authenticated.');
    
    console.log('🚀 Starting AGGRESSIVE clear of all finance and match data...');
    
    const rootRef = db.collection('teams').doc('primary');
    
    for (const colName of collectionsToClear) {
        // Try both sub-collection and field (just in case)
        const colRef = rootRef.collection(colName);
        const snapshot = await colRef.get();
        
        console.log(` Found ${snapshot.size} documents in ${colName} sub-collection`);
        
        if (!snapshot.empty) {
            const batch = db.batch();
            snapshot.docs.forEach((d) => {
                batch.delete(d.ref);
            });
            await batch.commit();
            console.log(`✅ Cleared sub-collection: ${colName}`);
        }
    }

    // Clear fields on the root doc that might store arrays (older versions)
    console.log('🧹 Clearing potential legacy fields on root document...');
    await rootRef.set({
        pendingTransactions: [],
        pendingAttendances: [],
        leaveRequests: [],
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        archVersion: 'v2'
    }, { merge: true });

    // Reset member summaries
    const membersSnap = await rootRef.collection('members').get();
    if (!membersSnap.empty) {
        console.log(`🚀 Resetting balances for ${membersSnap.size} members...`);
        const batch = db.batch();
        membersSnap.docs.forEach(doc => {
            batch.update(doc.ref, {
                fundPaid: 0,
                fines: 0,
                _updatedAt: Date.now()
            });
        });
        await batch.commit();
    }
    
    console.log('✨ CLOUD DATA IS NOW 100% CLEAN.');
    console.log('👉 IMPORTANT: The user MUST click "Từ Cloud" in their UI to overwrite local data.');
    process.exit(0);
}

clearAllFinance().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});

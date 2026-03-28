
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

const collectionsToClear = ['transactions', 'pendingTransactions', 'receivables'];

async function clearFinanceOnly() {
    console.log('🚀 Authenticating anonymously...');
    await auth.signInAnonymously();
    console.log('✅ Authenticated.');
    
    console.log('🚀 Clearing ONLY financial data (transactions, pending status, debts)...');
    
    const rootRef = db.collection('teams').doc('primary');
    
    for (const colName of collectionsToClear) {
        const colRef = rootRef.collection(colName);
        const snapshot = await colRef.get();
        console.log(` Found ${snapshot.size} documents in ${colName}`);
        
        if (!snapshot.empty) {
            const batch = db.batch();
            snapshot.docs.forEach((d) => {
                batch.delete(d.ref);
            });
            await batch.commit();
            console.log(`✅ Cleared: ${colName}`);
        }
    }

    // Reset member summaries (fundPaid, fines)
    const membersSnap = await rootRef.collection('members').get();
    if (!membersSnap.empty) {
        const batch = db.batch();
        membersSnap.docs.forEach(doc => {
            batch.update(doc.ref, {
                fundPaid: 0,
                fines: 0
            });
        });
        await batch.commit();
        console.log('✅ Reset member fundPaid/fines balance.');
    }

    // Trigger update on lastUpdated to force browser refresh
    await rootRef.set({
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        pendingTransactions: [], // Clear any arrays on the doc itself
        archVersion: 'v2'
    }, { merge: true });

    console.log('✨ SUCCESS: Financial data cleared. Match history is PRESERVED.');
    process.exit(0);
}

clearFinanceOnly().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});

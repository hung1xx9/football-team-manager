
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

async function inspect() {
    await auth.signInAnonymously();
    const rootRef = db.collection('teams').doc('primary');
    const rootSnap = await rootRef.get();
    console.log('Root Doc Data:', JSON.stringify(rootSnap.data(), null, 2));

    const membersSnap = await rootRef.collection('members').limit(1).get();
    if (!membersSnap.empty) {
        console.log('Sample Member Data:', JSON.stringify(membersSnap.docs[0].data(), null, 2));
    }

    const txCount = (await rootRef.collection('transactions').get()).size;
    const recCount = (await rootRef.collection('receivables').get()).size;
    console.log(`Transactions: ${txCount}, Receivables: ${recCount}`);
    
    process.exit(0);
}

inspect().catch(err => {
    console.error(err);
    process.exit(1);
});

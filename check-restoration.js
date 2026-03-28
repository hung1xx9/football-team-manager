
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

async function checkMatches() {
    await auth.signInAnonymously();
    const matchesSnap = await db.collection('teams').doc('primary').collection('matches').get();
    console.log(`Found ${matchesSnap.size} matches on primary team.`);
    
    // Also check transactions
    const txSnap = await db.collection('teams').doc('primary').collection('transactions').get();
    console.log(`Found ${txSnap.size} transactions on primary team.`);
    
    process.exit(0);
}

checkMatches().catch(err => {
    console.error(err);
    process.exit(1);
});

// Admin Migration Script - Upload data to teams/primary
// Run this with: node scripts/upload-to-primary.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import readline from 'readline';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Sample data to upload
const sampleData = {
    members: [
        { id: 1, name: 'Nguyễn Văn A', fundPaid: 0, fines: 0 },
        { id: 2, name: 'Trần Thị B', fundPaid: 0, fines: 0 },
        { id: 3, name: 'Lê Văn C', fundPaid: 0, fines: 0 },
        { id: 4, name: 'Phạm Thị D', fundPaid: 0, fines: 0 },
        { id: 5, name: 'Hoàng Văn E', fundPaid: 0, fines: 0 }
    ],
    matches: [],
    transactions: [],
    lastUpdated: new Date()
};

async function uploadData() {
    console.log('🔥 Firebase Admin Migration Tool');
    console.log('================================\n');

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();

    console.log('📤 Uploading sample data to teams/primary...\n');
    console.log('Data to upload:');
    console.log('- Members:', sampleData.members.length);
    console.log('- Matches:', sampleData.matches.length);
    console.log('- Transactions:', sampleData.transactions.length);
    console.log('');

    try {
        await db.collection('teams').doc('primary').set({
            members: sampleData.members,
            matches: sampleData.matches,
            transactions: sampleData.transactions,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log('✅ Success! Data uploaded to teams/primary');
        console.log('🎉 Guests can now access the data without authentication');

    } catch (error) {
        console.error('❌ Error uploading data:', error);
        console.log('\n⚠️  You may need to authenticate first.');
        console.log('Please run the app as Admin and sign in with Google,');
        console.log('then the data will be automatically synced.');
    }

    process.exit(0);
}

uploadData();

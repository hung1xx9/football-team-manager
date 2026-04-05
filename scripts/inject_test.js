import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyCb3uX6bNgt4kF5ZTYmABvhq_g5icip2no",
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "football-team-manager-14a39.firebaseapp.com",
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || "football-team-manager-14a39",
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "football-team-manager-14a39.firebasestorage.app",
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "898490516886",
    appId: process.env.VITE_FIREBASE_APP_ID || "1:898490516886:web:89ff40fb808556148e89b7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createTestData() {
    const rootRef = doc(db, 'teams', 'testing');
    
    // Create Match
    const matchId = Date.now();
    const newMatch = {
        id: matchId,
        date: new Date().toISOString().split('T')[0],
        startTime: '18:00',
        matchType: 'friendly',
        opponent: 'TEST MATCH ' + matchId,
        location: 'Sân Test',
        attendance: []
    };
    await setDoc(doc(db, 'teams/testing/matches', String(matchId)), newMatch);
    
    // Create Pending Attendance
    const pendingAttId = matchId + 1;
    const pendingAtt = {
        id: pendingAttId,
        matchId: matchId,
        memberId: 1, // Nguyễn Văn A
        status: 'pending',
        submittedAt: new Date().toISOString(),
        method: 'dashboard'
    };
    await setDoc(doc(db, 'teams/testing/pendingAttendances', String(pendingAttId)), pendingAtt);
    
    // Create Pending Transaction
    const pendingTxId = matchId + 2;
    const pendingTx = {
        id: pendingTxId,
        memberId: 1,
        amount: 50000,
        category: 'fund',
        description: 'Đóng quỹ tháng (TEST)',
        date: new Date().toISOString(),
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'teams/testing/pendingTransactions', String(pendingTxId)), pendingTx);
    
    // trigger root update
    await setDoc(rootRef, { lastUpdated: new Date().toISOString() }, { merge: true });

    console.log('TEST DATA CREATED SUCCESSFULLY!');
    console.log('Match ID:', matchId);
    console.log('Pending Attendance ID:', pendingAttId);
    console.log('Pending Tx ID:', pendingTxId);
    process.exit(0);
}

createTestData().catch(err => {
    console.error(err);
    process.exit(1);
});

importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCb3uX6bNgt4kF5ZTYmABvhq_g5icip2no",
  authDomain: "football-team-manager-14a39.firebaseapp.com",
  projectId: "football-team-manager-14a39",
  storageBucket: "football-team-manager-14a39.firebasestorage.app",
  messagingSenderId: "898490516886",
  appId: "1:898490516886:web:89ff40fb808556148e89b7",
  measurementId: "G-5P0NY1N9HY"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/favicon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

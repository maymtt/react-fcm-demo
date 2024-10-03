// firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCr5wFGEB_-vbfae60_-wz1hY-fcHaXbMc",
  authDomain: "jobfinfin-poc-fcm.firebaseapp.com",
  projectId: "jobfinfin-poc-fcm",
  storageBucket: "jobfinfin-poc-fcm.appspot.com",
  messagingSenderId: "567356460200",
  appId: "1:567356460200:web:8300dd401c29d006efc69d",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Optionally include an icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

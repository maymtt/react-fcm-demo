import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr5wFGEB_-vbfae60_-wz1hY-fcHaXbMc",
  authDomain: "jobfinfin-poc-fcm.firebaseapp.com",
  projectId: "jobfinfin-poc-fcm",
  storageBucket: "jobfinfin-poc-fcm.appspot.com",
  messagingSenderId: "567356460200",
  appId: "1:567356460200:web:8300dd401c29d006efc69d",
};

const VAPID_KEY =
  "BBq6jULttXWKS6N94TqoZSkXG7EWrw1gZ3ggNkvZu-cDh80QWbnFh97loj7MvjKachbYKT_4LfnknLUSaqTqH1o";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Ensure service worker is registered before attempting to get the token
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );

          // Wait until the service worker is ready before getting the token
          navigator.serviceWorker.ready.then(() => {
            // Request permission for notifications
            Notification.requestPermission()
              .then((permission) => {
                console.log("permission::", permission);
                if (permission === "granted") {
                  return getToken(messaging, {
                    vapidKey: VAPID_KEY,
                    serviceWorkerRegistration: registration, // Pass the registration to getToken
                  });
                } else {
                  // throw new Error("Permission denied");
                }
              })
              .then((token) => {
                console.log("FCM Token:", token);
                // Send the token to the backend if necessary
              })
              .catch((error) => {
                console.error("Error getting token:", error);
              });
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    // Listen for incoming messages
    onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
      setMessage(payload.notification.body);
    });
  }, []);

  return (
    <div>
      <h1>Scheduled Notification Demo</h1>
      {message && <p>New message: {message}</p>}
    </div>
  );
};

export default App;

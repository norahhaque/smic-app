// firebase.config.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, getAnalytics } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt8R_cPg-wwRKINvqngf-2Pu9VXwKIeVc",
  authDomain: "smic-app-ecd7c.firebaseapp.com",
  projectId: "smic-app-ecd7c",
  storageBucket: "smic-app-ecd7c.firebasestorage.app",
  messagingSenderId: "479069156551",
  appId: "1:479069156551:web:7bdadd3ab53c72ee3fbae2",
  measurementId: "G-E3FVKVR4TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Messaging (for notifications)
const messaging = getMessaging(app);

export { auth, db, messaging };
export default app;

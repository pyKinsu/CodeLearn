import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAptJ-qyieZT51UT0hcUdNo-n1Ww6OGXrg",
  authDomain: "simpleloginsiggn.firebaseapp.com",
  projectId: "simpleloginsiggn",
  storageBucket: "simpleloginsiggn.firebasestorage.app",
  messagingSenderId: "68557054848",
  appId: "1:68557054848:web:e378d6570fa2b5c7e81765",
  measurementId: "G-FLYJDFZ1HJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
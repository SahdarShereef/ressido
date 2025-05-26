
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyD36RF_bDn1QZHMRhE3Am9FAkZ5N8xlDDc",
  authDomain: "ressido-86342.firebaseapp.com",
  projectId: "ressido-86342",
  storageBucket: "ressido-86342.firebasestorage.app",
  messagingSenderId: "320819893254",
  appId: "1:320819893254:web:320347097ac55e5e765f87",
  measurementId: "G-FHGZP1Z2CY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

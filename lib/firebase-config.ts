import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from legacy project
const firebaseConfig = {
    apiKey: "AIzaSyBt-7m8DGp0yhXVPR6DcRONmKijczFoDhg",
    authDomain: "project-1ab5e.firebaseapp.com",
    projectId: "project-1ab5e",
    storageBucket: "project-1ab5e.firebasestorage.app",
    messagingSenderId: "170495699378",
    appId: "1:170495699378:web:d58267a9083a73bd1e1cab",
    measurementId: "G-TNBVVD5HD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

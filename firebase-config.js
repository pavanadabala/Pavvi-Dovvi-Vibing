// Firebase Configuration
// TODO: Replace with your actual Firebase project configuration
// Get this from Firebase Console > Project Settings > Your apps > SDK setup and configuration

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
firebase.initializeApp(firebaseConfig);

// Export Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable persistence for offline support
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code == 'unimplemented') {
      console.log('The current browser does not support persistence.');
    }
  });

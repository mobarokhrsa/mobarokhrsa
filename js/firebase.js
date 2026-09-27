// ======================================== 
// Firebase App 
// ========================================

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";


// ======================================== 
// Firebase Auth 
// ========================================
import { getAuth, GoogleAuthProvider } from 
"https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


import {
    getFirestore
} from
"https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBPsrXsSdo1x-J-8aAi83WTM0LiE7TMle0",
    authDomain: "arabic-learning-app-789bd.firebaseapp.com",
    projectId: "arabic-learning-app-789bd",
    storageBucket: "arabic-learning-app-789bd.firebasestorage.app",
    messagingSenderId: "830179046365",
    appId: "1:830179046365:web:c566fea21ee0abb6e03c34",
    measurementId: "G-7RGHQNEPB9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initilize Auth
const auth = getAuth(app);


// ========================================
// Google Provider
// ========================================

const googleProvider = new GoogleAuthProvider();

// Export 
export {app, auth, googleProvider};

export const db = getFirestore(app);


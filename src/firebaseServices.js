// src/firebaseServices.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// Your web app’s Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPy1bRgrfbkjWZ-MCUBNZnKDwBU6u1L3I",
  authDomain: "match-maker-app-e4ac6.firebaseapp.com",
  projectId: "match-maker-app-e4ac6",
  storageBucket: "match-maker-app-e4ac6.appspot.com",
  messagingSenderId: "112359706520",
  appId: "1:112359706520:web:cb990df497198a79c425ed",
  measurementId: "G-CWT62X96HM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore, Storage, Authentication, and Functions
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const functions = getFunctions(app);

// Function to call Cloud Function
export const setAdminRole = async (email) => {
  try {
    const setAdminRoleFunction = httpsCallable(functions, 'setAdminRole');
    const result = await setAdminRoleFunction({ email });
    return result.data.message;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to check admin status
export const checkAdminStatus = async (uid) => {
  try {
    const checkAdminStatusFunction = httpsCallable(functions, 'checkAdminStatus');
    const result = await checkAdminStatusFunction({ uid });
    return result.data.isAdmin; // Ensure 'isAdmin' is the correct field returned from your Cloud Function
  } catch (error) {
    throw new Error(error.message);
  }
};

export { db, storage, analytics, auth };

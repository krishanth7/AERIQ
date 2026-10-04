// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBLSFaFVZXHJNE8jDzH40J1oqlvOCwUq6c",
  authDomain: "aeriq-aero.firebaseapp.com",
  projectId: "aeriq-aero",
  storageBucket: "aeriq-aero.firebasestorage.app",
  messagingSenderId: "432763410920",
  appId: "1:432763410920:web:6dc578ea86a8b33910ec5d",
  measurementId: "G-1HB8Z8BQ6G"
};

// Initialize Firebase (safeguarding against re-initialization during Next.js hot reload)
export const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth: Auth = getAuth(app);

// Initialize Cloud Firestore
export const db: Firestore = getFirestore(app);

// Initialize Firebase Analytics safely (Analytics only runs in browser environments)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default app;

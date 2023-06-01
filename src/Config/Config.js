// Import Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
//  Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDCPTp4Chbbt_vFkmeP5sxAF4cPsczuymY",
  authDomain: "login-de571.firebaseapp.com",
  projectId: "login-de571",
  storageBucket: "login-de571.appspot.com",
  messagingSenderId: "915332128940",
  appId: "1:915332128940:web:ca1d9e8401531dfe443f09",
  measurementId: "G-W16C9GTHLY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

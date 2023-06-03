import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4N9y2LK_NhSXRgz4BE1bLgL6-P8oHO3Y",
  appId: "1:450040217669:web:2c7d73a73c06f40c04a32c",
  messagingSenderId: "450040217669",
  projectId: "centalki",
  authDomain: "centalki.firebaseapp.com",
  databaseURL:
    "https://centalki-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "centalki.appspot.com",
  measurementId: "G-LYVYX73C84",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const signIn = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);

export const useAuthListener = (callback) => {
  useEffect(() => {
    onAuthStateChanged(auth, callback);
  }, [callback]);
};

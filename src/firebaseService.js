import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

export const fireabseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(fireabseApp);
export const firebaseDb = getFirestore(fireabseApp);
export const googleProvider = new GoogleAuthProvider();

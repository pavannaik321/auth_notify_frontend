// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvRwcHm9OnPTlr7-5tZ-vIdAFRyhmT3PI",
    authDomain: "test-demo-bf703.firebaseapp.com",
    projectId: "test-demo-bf703",
    storageBucket: "test-demo-bf703.firebasestorage.app",
    messagingSenderId: "974580914109",
    appId: "1:974580914109:web:bf2d84ce0560d0fbdfa4d4",
    measurementId: "G-VYMTFPGFD8"
  };
  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

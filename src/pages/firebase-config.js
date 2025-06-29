// ARQUIVO: firebase-config.js (VERSÃO CORRIGIDA)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importe o Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0G3P-cpeUXHfqLiiTuvKz7YLTXIeBVfQ",
  authDomain: "mindtranslate-41310.firebaseapp.com",
  projectId: "mindtranslate-41310",
  storageBucket: "mindtranslate-41310.firebasestorage.app",
  messagingSenderId: "57544648857",
  appId: "1:57544648857:web:a75151fe31b254512bf008",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export const db = getFirestore(app); 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh6Y1iOpZz5h7Ie-aao41a3KhoMJg8LiQ",
  authDomain: "advexer7-59b8a.firebaseapp.com",
  databaseURL: "https://advexer7-59b8a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "advexer7-59b8a",
  storageBucket: "advexer7-59b8a.appspot.com",
  messagingSenderId: "899604664993",
  appId: "1:899604664993:web:a17139ab609d07bc0b96e0",
  measurementId: "G-JZNKGD537W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
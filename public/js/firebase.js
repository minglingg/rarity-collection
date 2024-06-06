// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

require("dotenv").config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "rarity-collection-98cd2.firebaseapp.com",
  projectId: "rarity-collection-98cd2",
  storageBucket: "rarity-collection-98cd2.appspot.com",
  messagingSenderId: "1009564243558",
  appId: "1:1009564243558:web:8b083cfab057efe50b7fa7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

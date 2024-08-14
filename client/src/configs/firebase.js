// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Y1ynFzYxqsjv6uSDzfG-XRidD1jJtrM",
  authDomain: "food-delivery-app-4a028.firebaseapp.com",
  projectId: "food-delivery-app-4a028",
  storageBucket: "food-delivery-app-4a028.appspot.com",
  messagingSenderId: "962431094813",
  appId: "1:962431094813:web:4f64cbc631410efd62f6f4",
  measurementId: "G-WK20ZH7NKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
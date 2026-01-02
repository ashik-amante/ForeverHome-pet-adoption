// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw1axn-r2pfcFn5nlP4pYDWnQH5TO5EeU",
  authDomain: "foreverhome-21484.firebaseapp.com",
  projectId: "foreverhome-21484",
  storageBucket: "foreverhome-21484.firebasestorage.app",
  messagingSenderId: "375510828860",
  appId: "1:375510828860:web:9d9c14381390ff8d89c039"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
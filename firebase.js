// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ2PYepnzoqC6JqlmiZ9-2jDmyQhiUKsc",
  authDomain: "inventory-management-68c43.firebaseapp.com",
  projectId: "inventory-management-68c43",
  storageBucket: "inventory-management-68c43.appspot.com",
  messagingSenderId: "407431280081",
  appId: "1:407431280081:web:06a89198dfb109d61d9cf0",
  measurementId: "G-VD7SLDJH0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}
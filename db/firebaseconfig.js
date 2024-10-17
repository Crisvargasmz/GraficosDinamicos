// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsvhPa3B8EbrWC6MkJdFJ1kxh-nAlQdLs",
  authDomain: "graficos-fed6b.firebaseapp.com",
  projectId: "graficos-fed6b",
  storageBucket: "graficos-fed6b.appspot.com",
  messagingSenderId: "154951536645",
  appId: "1:154951536645:web:c26314fc1d694a13148c6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export default db;
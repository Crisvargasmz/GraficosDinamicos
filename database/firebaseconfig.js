import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsvhPa3B8EbrWC6MkJdFJ1kxh-nAlQdLs",
    authDomain: "graficos-fed6b.firebaseapp.com",
    projectId: "graficos-fed6b",
    storageBucket: "graficos-fed6b.appspot.com",
    messagingSenderId: "154951536645",
    appId: "1:154951536645:web:c26314fc1d694a13148c6c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBxQZwAIEtW9-g2HXleDRDBkHHZTl1Qut4",
    authDomain: "devlinks-9c45a.firebaseapp.com",
    projectId: "devlinks-9c45a",
    storageBucket: "devlinks-9c45a.appspot.com",
    messagingSenderId: "456227527927",
    appId: "1:456227527927:web:250c99ccbcc979d45a07f2",
    measurementId: "G-BD64JRL182"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }
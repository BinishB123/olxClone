// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpqWTGmItrKz6pp9o8S4wLo-qmuYEAoOg",
    authDomain: "olxclone-df8ce.firebaseapp.com",
    projectId: "olxclone-df8ce",
    storageBucket: "olxclone-df8ce.appspot.com",
    messagingSenderId: "763575021618",
    appId: "1:763575021618:web:df290d898793c0933b0c2b"
  };     
// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);
const db = getFirestore(firebaseapp);
const storage = getStorage();
    
export { firebaseapp, db ,auth ,storage};

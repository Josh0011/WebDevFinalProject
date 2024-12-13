// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCerXks5RHv6LMxAm6Bbh_3xD5XnCblTxY",
  authDomain: "melodiestats.firebaseapp.com",
  projectId: "melodiestats",
  storageBucket: "melodiestats.firebasestorage.app",
  messagingSenderId: "332413868317",
  appId: "1:332413868317:web:febf1c2767d7202586e9f4",
  measurementId: "G-P4MZMZKJ76"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Import the functions you need from the SDKs you need
 
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore}  from 'firebase/firestore/lite';
 
const firebaseConfig = {
  apiKey: "AIzaSyCj_9rO6EmPpjIgOSgZUZ8vGjXeQJIL3tY",
  authDomain: "ecos-9833b.firebaseapp.com",
  projectId: "ecos-9833b",
  storageBucket: "ecos-9833b.appspot.com",
  messagingSenderId: "25490626473",
  appId: "1:25490626473:web:da3112965da0f6a68516b8",
  measurementId: "G-G79218D90K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider =new GoogleAuthProvider();
const db=getFirestore(app)

 
export {auth,provider,db,app};
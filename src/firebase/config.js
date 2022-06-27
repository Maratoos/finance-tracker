import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD44OzZ7tRC5RIB3HB3zFUcshb0tpSUSPg",
  authDomain: "finance-tracker-49a03.firebaseapp.com",
  projectId: "finance-tracker-49a03",
  storageBucket: "finance-tracker-49a03.appspot.com",
  messagingSenderId: "662077534805",
  appId: "1:662077534805:web:3f8449148f57a88977dadc"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
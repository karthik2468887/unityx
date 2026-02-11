import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLorVyk7SHle8_DykCvHZPAxKW8OMmo2Y",
  authDomain: "unity-7feca.firebaseapp.com",
  projectId: "unity-7feca",
  storageBucket: "unity-7feca.appspot.com",
  messagingSenderId: "1054561175553",
  appId: "1:1054561175553:web:76ac1b2d2170636c505800"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
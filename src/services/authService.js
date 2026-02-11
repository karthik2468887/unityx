import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from "./firebase";
  
  export const signup = async (name, email, password, role = "student") => {
    if (role === "admin") {
      throw new Error("Admin signup not allowed");
    }
  
    const res = await createUserWithEmailAndPassword(auth, email, password);
  
    await setDoc(doc(db, "users", res.user.uid), {
      name,
      email,
      role,
      createdAt: new Date()
    });
  
    return res.user;
  };
  
  export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };  
import React, { createContext, useContext } from "react";
import { auth, googleProvider } from "../Config/Config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUserWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };
  return (
    <div>
      <UserContext.Provider value={{ createUser, createUserWithGoogle }}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

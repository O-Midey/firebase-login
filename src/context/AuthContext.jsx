import React, { createContext, useContext, useState } from "react";
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
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUserWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div>
      <UserContext.Provider
        value={{ user, setUser, createUser, createUserWithGoogle, logIn }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

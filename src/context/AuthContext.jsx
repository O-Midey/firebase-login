import React, { createContext, useContext, useEffect, useState } from "react";
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

  //useEffect to listen if a user is signed in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUserWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <UserContext.Provider
        value={{
          user,
          setUser,
          createUser,
          createUserWithGoogle,
          logIn,
          logOut,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

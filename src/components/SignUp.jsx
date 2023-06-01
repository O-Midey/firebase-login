import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Config/Config";
import { Link } from "react-router-dom";

//styles for the alert box
const successAlertStyle = {
  display: "block",
  backgroundColor: "rgba(9, 219, 9, 0.486)",
  transition: "0.5s",
};

const failedAlertStyle = {
  display: "block",
  backgroundColor: "rgb(254, 6, 12)",
  transition: "0.5s",
};

export const SignUp = () => {
  //states
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("some text");
  const [alertStyle, setAlertStyle] = useState({ opacity: 0 });

  //function to hide the alertbox
  const hideAlert = () => {
    setTimeout(() => {
      setAlertStyle({ opacity: 0 });
    }, 5000);
  };

  // log in authenticator with Firebase
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAlertStyle({ ...successAlertStyle });
      setAlertMessage("Account created successfully, proceed to sign in");
      hideAlert();
    } catch (err) {
      console.error(err);
      setAlertStyle({ ...failedAlertStyle });
      setAlertMessage(err.message.split(": ")[1]);
      hideAlert();
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setAlertStyle({ ...successAlertStyle });
      setAlertMessage("Account created successfully, proceed to sign in");
      hideAlert();
    } catch (err) {
      console.error(err);
      setAlertStyle({ ...failedAlertStyle });
      setAlertMessage(err.message.split(": ")[1]);
      hideAlert();
    }
  };

  return (
    <div>
      <div className="page-container">
        <div className="alert-box" style={alertStyle}>
          {alertMessage}
        </div>
        <div>
          <div className="main-content">
            <h3 className="title">Sign Up</h3>
            <label htmlFor="name">Name</label>
            <input type="email" name="email" placeholder="Jane Doe" />
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="email"
              name="email"
              placeholder="test@test.com"
            />
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="meedzy" />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter password here"
            />
          </div>
          <button onClick={signUp} className="btn-grad">
            Sign Up
          </button>
          <p className="paragraph">or</p>
          <div className="google-button" onClick={signInWithGoogle}>
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png?w=740&t=st=1685483357~exp=1685483957~hmac=5ae1de4ed32b3cce5da318215438245e823f5c48a57d894f92ba2eb0bae5ea41" />
            <p>Sign Up with google</p>
          </div>
          <p className="action-paragraph">
            Have an account?
            <span style={{ textDecoration: "underline" }}>
              <Link to="/"> Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

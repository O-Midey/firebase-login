import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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

export const LogIn = () => {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("some text");
  const [alertStyle, setAlertStyle] = useState({ opacity: 0 });

  const hideAlert = () => {
    setTimeout(() => {
      setAlertStyle({ opacity: 0 });
    }, 5000);
  };

  const logIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAlertStyle({ ...successAlertStyle });
      setAlertMessage("Account created successfully, proceed to sign in");
      hideAlert();
    } catch (err) {
      console.error(err);
      setAlertStyle({ ...failedAlertStyle });
      setAlertMessage(err.message);
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
            <h3 className="title">Log In</h3>
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              name="username"
              placeholder="Enter username here"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter password here"
            />
            <p className="paragraph">
              <a href="">Forgot Password?</a>
            </p>
          </div>
          <button onClick={logIn} className="btn-grad">
            Log In
          </button>
          <p className="paragraph">or</p>
          <div className="google-button">
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png?w=740&t=st=1685483357~exp=1685483957~hmac=5ae1de4ed32b3cce5da318215438245e823f5c48a57d894f92ba2eb0bae5ea41" />
            <p>Sign in with google</p>
          </div>
          <p className="action-paragraph">
            Don't have an account?
            <span style={{ textDecoration: "underline" }}>
              <Link to="/signup"> Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

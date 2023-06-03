import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../Config/Config";

export const LogIn = ({ failedAlertStyle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("some text");
  const [alertStyle, setAlertStyle] = useState({ opacity: 0 });

  const { logIn, createUserWithGoogle, user, setUser } = UserAuth();
  const navigate = useNavigate();
  const logInUser = async () => {
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setAlertStyle({ ...failedAlertStyle });
      setAlertMessage(err.message);
    }
  };

  const handleSignUpWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await createUserWithGoogle();
    } catch (error) {
      console.error(error.message);
    }
    if (auth.currentUser) navigate("/home");
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
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="username"
              placeholder="Enter username here"
            />
            <label>Password</label>
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
          <button onClick={logInUser} className="btn-grad">
            Log In
          </button>
          <p className="paragraph">or</p>
          <div onClick={handleSignUpWithGoogle} className="google-button">
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

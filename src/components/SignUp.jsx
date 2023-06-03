import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Config/Config";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

//styles for the alert box
const failedAlertStyle = {
  display: "block",
  transition: "0.5s",
  backgroundColor: "rgb(254, 6, 12)",
};

export const SignUp = () => {
  //states
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("some text");
  const [alertStyle, setAlertStyle] = useState({ opacity: 0 });

  const { user, setUser, createUser, createUserWithGoogle } = UserAuth();
  //useEffect to check logout the user whenever page loads.
  useEffect(() => {
    signOut(auth);
  }, []);

  //function to hide the alertbox.
  const hideAlert = () => {
    setTimeout(() => {
      setAlertStyle({ opacity: 0 });
    }, 5000);
  };

  //useNavigate function.
  const navigate = useNavigate();

  //Function to direct a user home if signed in.
  if (user) navigate("/home");

  // Functions to run when account is successfully created.
  const successfullyCreated = () => {
    setAlertStyle({ ...successAlertStyle });
    setAlertMessage("Account created successfully, proceed to sign in");
    navigate("/home");
    hideAlert();
  };

  // Functions to run when account is not successfully created.
  const notSuccessfullyCreated = (message) => {
    setAlertStyle({ ...failedAlertStyle });
    setAlertMessage(message.split(": ")[1]);
    hideAlert();
  };

  // Register new user with email and password

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      successfullyCreated();
    } catch (error) {
      console.error(error.message);
      notSuccessfullyCreated(error.message);
    }
  };

  //Register new user with google
  const handleSignUpWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await createUserWithGoogle();
      console.log(auth.currentUser);
    } catch (error) {
      console.error(error.message);
      notSuccessfullyCreated(error.message);
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
            <h3 className="title">Sign Up</h3>
            <label>Name</label>
            <input type="email" name="email" placeholder="Jane Doe" />
            <label>Email</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="email"
              name="email"
              placeholder="test@test.com"
            />
            <label>Username</label>
            <input type="text" name="username" placeholder="meedzy" />
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter password here"
            />
          </div>
          <button onClick={handleSignUp} className="btn-grad">
            Sign Up
          </button>
          <p className="paragraph">or</p>
          <div className="google-button" onClick={handleSignUpWithGoogle}>
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

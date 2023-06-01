import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Config/Config";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

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
  const [user, setUser] = useState(null);

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
  const { createUser, createUserWithGoogle } = UserAuth();
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

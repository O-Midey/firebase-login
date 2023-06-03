import React from "react";
import { UserAuth } from "../context/AuthContext";

export const HomePage = () => {
  const { user, logOut } = UserAuth();
  return (
    <div className="page-container">
      <h3 className="title ">Welcome </h3>
      <p className="my-8 ">
        <span className="font-bold">username:</span> {user && user.email}
      </p>
      <button onClick={logOut} className="btn-grad" on>
        Log Out
      </button>
    </div>
  );
};

import React from "react";
import { UserAuth } from "../context/AuthContext";

export const HomePage = () => {
  const { user } = UserAuth();
  return (
    <div>
      <h3>Welcome {user && user.email}</h3>
    </div>
  );
};

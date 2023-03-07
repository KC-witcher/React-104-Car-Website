import React from "react";
import { useAuthContext } from "../providers/auth-provider";

export const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h2>Welcome, {user?.username}</h2>
    </div>
  );
};

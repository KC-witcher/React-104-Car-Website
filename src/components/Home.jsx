import React from "react";
import { useAuthContext } from "../providers/auth-provider";
import { Nav } from "./Nav";

export const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <Nav />
      <h2>Welcome, {user?.username}</h2>
    </div>
  );
};

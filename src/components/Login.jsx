import React, { useState } from "react";
import { Stack, Paper, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../providers/auth-provider";
import "./App.css";

export const Login = () => {
  const [loginUsername, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { user, login, registerUser } = useAuthContext();

  const userLogin = () => {
    login({ username: loginUsername, password: loginPassword })
      .then(() => {
        toast.success("Logged In 😀");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setLoginUserName("");
    setLoginPassword("");
  };

  return (
    <Stack className="login-container" sx={{ p: 3, maxWidth: 350 }} spacing={3}>
      <Toaster />
      <item>
        <h1 className="login-header">Login to Car Shop</h1>
      </item>
      <item>
        <TextField
          id="email"
          label="Username"
          type="text"
          placeholder="Enter Your Username"
          onChange={(e) => {
            setLoginUserName(e.target.value);
          }}
          fullWidth
        />
      </item>
      <item>
        <TextField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
          fullWidth
        />
      </item>
      <item>
        <Button variant="contained" onClick={userLogin}>
          Submit
          {user && <Navigate to="/home" replace={true} />}
        </Button>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button sx={{ ml: 3 }} variant="outlined">
            Sign Up
          </Button>
        </Link>
      </item>
    </Stack>
  );
};

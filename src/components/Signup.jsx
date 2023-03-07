import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Stack, Paper, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../providers/auth-provider";

export const Signup = () => {
  const { user, registerUser } = useAuthContext();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const signUp = () => {
    registerUser({ username: userNameInput, password: passwordInput })
      .then(() => {
        toast.success("user registered");
      })
      .catch(() => {
        toast.error("Could not register the user");
      });
  };

  return (
    <Stack className="login-container" sx={{ p: 3, maxWidth: 350 }} spacing={3}>
      <item>
        <h1 className="login-header">Sign Up for Car Shop</h1>
      </item>
      <item>
        <TextField
          id="username"
          label="Username"
          type="text"
          placeholder="Enter a Username"
          onChange={(e) => {
            setUserNameInput(e.target.value);
          }}
          fullWidth
        />
      </item>
      <item>
        <TextField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter a Password"
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
          fullWidth
        />
      </item>
      <item>
        <Button
          variant="contained"
          disabled={userNameInput == "" || passwordInput == ""}
          onClick={signUp}
        >
          Submit
          {user && <Navigate to="/home" replace={true} />}
        </Button>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Button sx={{ ml: 3 }} variant="outlined">
            Return to Login
          </Button>
        </Link>
      </item>
    </Stack>
  );
};

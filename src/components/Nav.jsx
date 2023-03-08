import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { useAuthContext } from "../providers/auth-provider";
import "./App.css";

export const Nav = () => {
  const { logOut } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Link
              to={"/home"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Home</Button>
            </Link>
            <Link
              to={"/favorite"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">View Favorite(s)</Button>
            </Link>
          </Typography>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit" onClick={() => logOut()}>
              Log Out
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

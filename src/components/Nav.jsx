import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useAuthContext } from "../providers/auth-provider";
import "./App.css";

export const Nav = () => {
  const { logOut, user } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>Welcome, {user?.username}</MenuItem>

              <MenuItem onClick={() => logOut()}>
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Log Out
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

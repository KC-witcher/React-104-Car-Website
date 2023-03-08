import React from "react";
import { useAuthContext } from "../providers/auth-provider";
import Button from "@mui/material/Button";

export const LogoutButton = () => {
  const { logOut } = useAuthContext();
  return (
    <Button variant="contained" onClick={() => logOut()}>
      Log Out
    </Button>
  );
};

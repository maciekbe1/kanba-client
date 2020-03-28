import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { GoogleLogout } from "react-google-login";
import { signOut } from "actions/UserActions";
import { useDispatch } from "react-redux";

export default function Signout({ setAnchorEl }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(signOut());
  };
  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT}
      onLogoutSuccess={logoutHandler}
      render={({ onClick }) => <MenuItem onClick={onClick}>Wyloguj</MenuItem>}
    ></GoogleLogout>
  );
}

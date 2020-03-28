import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { GoogleLogout } from "react-google-login";
import { signOut } from "actions/UserActions";
import { useDispatch, useSelector } from "react-redux";

export default function Signout({ setAnchorEl }) {
  const dispatch = useDispatch();
  const loginType = useSelector(state => state.authReducer.byGoogle);
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(signOut());
  };
  return loginType ? (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_CLIENT}
      onLogoutSuccess={logoutHandler}
      render={({ onClick }) => <MenuItem onClick={onClick}>Wyloguj</MenuItem>}
    ></GoogleLogout>
  ) : (
    <MenuItem onClick={logoutHandler}>Wyloguj</MenuItem>
  );
}

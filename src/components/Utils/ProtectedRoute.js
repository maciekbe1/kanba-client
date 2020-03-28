import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "../Auth/Signin";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(state => state.authReducer.isAuth);

  return (
    <Route
      render={props => (isAuth ? <Component {...props} /> : <Signin />)}
      {...rest}
    />
  );
};

export default ProtectedRoute;

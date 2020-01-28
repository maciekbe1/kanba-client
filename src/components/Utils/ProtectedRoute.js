import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SigninForm from "../Auth/SigninForm";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(state => state.authReducer.isAuth);

  return (
    <Route
      render={props => (isAuth ? <Component {...props} /> : <SigninForm />)}
      {...rest}
    />
  );
};

export default ProtectedRoute;

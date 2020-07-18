import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "../Auth/Signin";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { isAuth } = useSelector(({ authReducer }: any) => authReducer);

  return (
    <Route
      render={(props: JSX.IntrinsicAttributes) =>
        isAuth ? <Component {...props} /> : <Signin />
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;

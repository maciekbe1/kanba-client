import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "actions/UserActions";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(state => state.authReducer.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const check = () => {
      dispatch(checkAuth());
    };
    document.addEventListener("visibilitychange", check);
    return () => {
      document.removeEventListener("visibilitychange", check);
    };
  }, [dispatch]);

  return (
    <Route
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;

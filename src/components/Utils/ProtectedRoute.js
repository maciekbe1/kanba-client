import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuth = useSelector(state => state.authReducer.isAuth);
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

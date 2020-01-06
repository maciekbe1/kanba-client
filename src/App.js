import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import "./assets/styles/Global.scss";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard";
import AccountVerify from "./components/Account/Verify";
import EmailVerify from "./components/ResetPassword/EmailVerify";
import SetPassword from "./components/ResetPassword/SetPassword";
import CssBaseline from "@material-ui/core/CssBaseline";
import LayoutProvider from "./components/Layouts/LayoutProvider";
import Layout from "./components/Layouts/Layout";
import Test from "./components/Private/Test";
import Today from "./components/Private/Today/Today";
import NotFound from "./components/Utils/NotFound";

function App() {
    const isAuth = useSelector(state => state.authReducer.isAuth);
    return (
        <LayoutProvider>
            <BrowserRouter>
                <CssBaseline />
                <Layout isAuth={isAuth}>
                    <Switch>
                        {isAuth ? (
                            <ProtectedRoute
                                path="/"
                                exact
                                render={render => <Dashboard {...render} />}
                            />
                        ) : (
                            <Route
                                path="/"
                                exact
                                render={render => <HomePage {...render} />}
                            />
                        )}
                        <ProtectedRoute path="/test" component={Test} />
                        <ProtectedRoute path="/Today" component={Today} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/verify/:hash" component={AccountVerify} />
                        <Route path="/reset-password" component={EmailVerify} />
                        <Route
                            path="/set-password/:id"
                            component={SetPassword}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </LayoutProvider>
    );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/styles/Global.scss";
import HomePage from "./components/HomePage";
import Drawer from "./components/Layouts/Drawer";
import { useSelector } from "react-redux";
import AppBar from "./components/Layouts/AppBar";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard";
import AccountConf from "./components/AccountConf";
import EmailVerify from "./components/ResetPassword/EmailVerify";
import SetPassword from "./components/ResetPassword/SetPassword";
import CssBaseline from "@material-ui/core/CssBaseline";
function App() {
    const isAuth = useSelector(state => state.authReducer.isAuth);
    return (
        <BrowserRouter>
            <CssBaseline />
            {isAuth ? (
                <Drawer>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={render => <Dashboard {...render} />}
                        />
                    </Switch>
                </Drawer>
            ) : (
                <AppBar>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={render => <HomePage {...render} />}
                        />
                        <Route path="/signup" component={Signup} />
                        <Route path="/verify/:hash" component={AccountConf} />
                        <Route path="/reset-password" component={EmailVerify} />
                        <Route
                            path="/set-password/:id"
                            component={SetPassword}
                        />
                    </Switch>
                </AppBar>
            )}
        </BrowserRouter>
    );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import RedirectRoute from "./components/Utils/RedirectRoute";

import "./assets/styles/Global.scss";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";

import Dashboard from "./components/Dashboard/Dashboard";
import AccountVerify from "./components/Account/Verify";
import EmailVerify from "./components/ResetPassword/EmailVerify";
import SetPassword from "./components/ResetPassword/SetPassword";
import CssBaseline from "@material-ui/core/CssBaseline";
import LayoutProvider from "./components/Layouts/LayoutProvider";
import Layout from "./components/Layouts/Layout";
import { CardsPrivate, ProjectsPrivate } from "./components/Private";
import NotFound from "./components/Utils/NotFound";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));
function App() {
  const classes = useStyles();
  const backdrop = useSelector(state => state.layoutReducer.backdrop);
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
            <ProtectedRoute path="/cards" component={CardsPrivate} />
            <ProtectedRoute path="/projects" component={ProjectsPrivate} />
            <RedirectRoute path={"/signup"} component={Signup} />
            <RedirectRoute path={"/signin"} component={Signin} />
            <Route path="/verify/:hash" component={AccountVerify} />
            <Route path="/reset-password" component={EmailVerify} />
            <Route path="/set-password/:id" component={SetPassword} />
            <Route component={NotFound} />
          </Switch>
          <Backdrop className={classes.backdrop} open={backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Layout>
      </BrowserRouter>
    </LayoutProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Signin from "./components/Auth/Signin";
import Homepage from "./components/Homepage/Home";
import Drawer from "./components/Drawer";
import { useSelector } from "react-redux";
import AppBar from "./components/AppBar";
import Signup from "./components/Auth/Signup";
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
                            render={render => <Homepage {...render} />}
                        />
                    </Switch>
                </Drawer>
            ) : (
                <AppBar>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={render => <Homepage {...render} />}
                        />
                        <Route path="/signup" component={Signup} />
                    </Switch>
                </AppBar>
            )}
        </BrowserRouter>
    );
}

export default App;

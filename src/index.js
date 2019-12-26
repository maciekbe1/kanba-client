import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

import { ThemeProvider } from "@material-ui/styles";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

const primary = blue[800];
const hover = blue[900];
const success = green[500];
const theme = createMuiTheme({
    palette: {
        primary: {
            main: primary
        },
        success: {
            main: success
        },
        hover: {
            main: hover
        }
    },
    status: {
        danger: "orange"
    }
});

const persistConfig = {
    key: "root",
    storage
};
let middleware = [];
if (window.location.hostname === "localhost") {
    middleware = [...middleware, logger, thunk];
} else {
    middleware = [...middleware, thunk];
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));

let persistor = persistStore(store);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

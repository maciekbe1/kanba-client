import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";

export default function Layout(props) {
    const primary = blue[800];
    const hover = blue[900];
    const success = green[500];
    const error = red[500];
    const dark = useSelector(state =>
        state.layoutReducer.darkTheme ? "dark" : "light"
    );
    const theme = createMuiTheme({
        palette: {
            type: dark,
            primary: {
                main: primary
            },
            success: {
                main: success
            },
            error: {
                main: error
            },
            hover: {
                main: hover
            }
        },
        status: {
            danger: "orange"
        }
    });
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

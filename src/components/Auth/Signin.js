import React, { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions";
import { FormControl } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
    // button: {
    //     // margin: theme.spacing(1),
    //     // display: "flex"
    // }
    button: {
        // margin: theme.spacing(1),
        // display: "flex",
        marginRight: "10px"
    }
}));

export default function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const login = e => {
        e.preventDefault();
        setSuccess(false);
        axios({
            method: "post",
            url: "http://localhost:4000/api/auth",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                email: values.email,
                password: values.password
            }
        })
            .then(res => {
                dispatch(
                    signIn({
                        userID: jwt.decode(res.data)._id,
                        isAuth: true
                    })
                );
            })
            .catch(err => {
                setSuccess(true);
                setError(err.response.data);
            });
    };

    return (
        <form onSubmit={e => login(e)}>
            <h2 style={{ textAlign: "center" }}>Sign in to Kanba</h2>
            <FormControl fullWidth>
                <InputLabel htmlFor="email-adress">Email address</InputLabel>
                <Input
                    id="email-adress"
                    aria-describedby="email-adress-helper-text"
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                />
            </FormControl>

            <FormControl fullWidth style={{ margin: "20px 0" }}>
                <InputLabel htmlFor="standard-adornment-password">
                    Password
                </InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {success ? (
                <FormControl style={{ marginBottom: "20px" }}>
                    <FormHelperText id="my-helper-text">{error}</FormHelperText>
                </FormControl>
            ) : null}

            <Box
                display="flex"
                justifyContent="flex-end"
                className={classes.buttons}
            >
                <Button
                    variant="outlined"
                    type="submit"
                    className={classes.button}
                >
                    Login
                </Button>
                <Button variant="outlined" color="secondary">
                    Cancel
                </Button>
            </Box>
        </form>
    );
}

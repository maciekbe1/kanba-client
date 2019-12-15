import React, { useState } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { FormControl } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import Mail from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles(theme => ({
    button: {
        marginRight: "10px",
    },
}));
export default function Signup() {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: "",
        password: "",
        name: "",
        showPassword: false,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    const signUpHandler = e => {
        e.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:4000/api/users/signUp",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                name: values.name,
                password: values.password,
                email: values.email,
            },
        })
            .then(res => {
                setSuccess(true);
            })
            .catch(err => {
                setError(err.response.data);
            });
    };
    return (
        <Container maxWidth="lg">
            {/* <Box display="flex" flexDirection="column" alignItems="center"> */}
            {!success ? (
                <Grid container display="flex" justify="center">
                    <Grid item lg={6} xs={8}>
                        <form
                            align="center"
                            autoComplete="off"
                            onSubmit={e => signUpHandler(e)}
                        >
                            <h5>Join Kanba</h5>
                            <h1>Create your account</h1>
                            <Box display="flex" alignItems="center">
                                <Mail
                                    color="primary"
                                    style={{ marginRight: "10px" }}
                                />
                                <FormControl
                                    fullWidth
                                    style={{ marginBottom: "20px" }}
                                >
                                    <InputLabel htmlFor="standard-adornment-email">
                                        Email address
                                    </InputLabel>
                                    <Input
                                        id="email"
                                        aria-describedby="email-helper-text"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange("email")}
                                    />
                                </FormControl>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <AccountCircle
                                    color="primary"
                                    style={{ marginRight: "10px" }}
                                />
                                <FormControl
                                    fullWidth
                                    style={{ marginBottom: "20px" }}
                                >
                                    <InputLabel htmlFor="standard-adornment-name">
                                        Name
                                    </InputLabel>
                                    <Input
                                        id="name"
                                        aria-describedby="name-helper-text"
                                        type="name"
                                        value={values.name}
                                        onChange={handleChange("name")}
                                    />
                                </FormControl>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Lock
                                    color="primary"
                                    style={{ marginRight: "10px" }}
                                />
                                <FormControl
                                    fullWidth
                                    style={{ marginBottom: "20px" }}
                                >
                                    <InputLabel htmlFor="standard-adornment-password">
                                        Password
                                    </InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={
                                            values.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={values.password}
                                        onChange={handleChange("password")}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
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
                            </Box>
                            {!success ? (
                                <FormControl style={{ marginBottom: "20px" }}>
                                    <FormHelperText id="my-helper-text">
                                        {error}
                                    </FormHelperText>
                                </FormControl>
                            ) : null}
                            <Button
                                style={{ marginTop: "20px" }}
                                type="submit"
                                color="primary"
                                variant="contained"
                                fullWidth
                                className={classes.button}
                            >
                                Sign up
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            ) : (
                <div>Success</div>
            )}
            {/* </Box> */}
        </Container>
    );
}

import React, { useState } from "react";
import * as API from "../../api/API";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions";
import { FormControl, Link } from "@material-ui/core";
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
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles(theme => ({
    button: {
        marginRight: "10px"
    },
    error: {
        color: theme.palette.error.main,
        fontWeight: "bold",
        fontSize: "14px"
    }
}));

export default function Signin({ modalHandler }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false
    });
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const signInHandler = e => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        API.request(`${process.env.REACT_APP_SERVER}/api/auth`, {
            email: values.email,
            password: values.password
        })
            .then(res => {
                dispatch(
                    signIn({
                        token: res.data,
                        isAuth: true
                    })
                );
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                setMessage(err.response.data);
            });
    };

    return (
        <form onSubmit={e => signInHandler(e)} autoComplete="off">
            <Typography
                variant="h4"
                gutterBottom
                style={{ textAlign: "center" }}
            >
                Sign in to Kanba
            </Typography>
            <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-email">
                    Email address
                </InputLabel>
                <Input
                    id="email"
                    aria-describedby="email-helper-text"
                    type="email"
                    value={values.email}
                    error={error}
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
                    error={error}
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
            <Link href="/reset-password">
                <Typography variant="caption" display="block" gutterBottom>
                    Forget password?
                </Typography>
            </Link>
            {error ? (
                <FormControl style={{ marginBottom: "20px" }}>
                    <FormHelperText
                        className={classes.error}
                        id="my-helper-text"
                    >
                        {message}
                    </FormHelperText>
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
                    {loading ? <CircularProgress size={20} /> : "Sign in"}
                </Button>
                <Button
                    onClick={modalHandler}
                    variant="outlined"
                    color="secondary"
                >
                    Cancel
                </Button>
            </Box>
        </form>
    );
}

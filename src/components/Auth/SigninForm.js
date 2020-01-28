import React, { useState } from "react";
import * as API from "api/API";

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
import Lock from "@material-ui/icons/Lock";
import Mail from "@material-ui/icons/Mail";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { signIn } from "actions/UserActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
    fontWeight: "bold",
    fontSize: "14px"
  }
}));
function SigninForm() {
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
    <Container maxWidth="lg">
      <Grid container display="flex" justify="center">
        <Grid item lg={6} xs={10}>
          <form align="center" onSubmit={e => signInHandler(e)}>
            <h1>Zaloguj się</h1>
            <Box display="flex" alignItems="center">
              <Mail color="primary" style={{ marginRight: "10px" }} />
              <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <InputLabel htmlFor="standard-adornment-email">
                  Email
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
            </Box>
            <Box display="flex" alignItems="center">
              <Lock color="primary" style={{ marginRight: "10px" }} />
              <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <InputLabel htmlFor="standard-adornment-password">
                  Hasło
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
            </Box>
            {error ? (
              <FormControl
                style={{
                  color: "red"
                }}
              >
                <FormHelperText className={classes.error} id="my-helper-text">
                  {message}
                </FormHelperText>
              </FormControl>
            ) : null}
            <Box>
              <Button
                style={{ marginTop: "20px" }}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
export default SigninForm;

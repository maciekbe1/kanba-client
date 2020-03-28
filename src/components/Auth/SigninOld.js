import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "actions/UserActions";
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
import * as UserService from "services/UserService";

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
    UserService.signInService(values.email, values.password)
      .then(res => {
        const token = res.data;
        UserService.getMeService(token).then(res => {
          dispatch(
            signIn({
              isAuth: true,
              data: res.data,
              token
            })
          );
        });
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        try {
          setMessage(err.response.data);
        } catch (error) {
          setMessage("Coś poszło nie tak, spróbuj później");
        }
      });
  };

  return (
    <form onSubmit={e => signInHandler(e)}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Zaloguj się
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
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
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
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
        <Box>
          <FormControl style={{ marginBottom: "20px" }}>
            <FormHelperText className={classes.error} id="my-helper-text">
              {message}
            </FormHelperText>
          </FormControl>
        </Box>
      ) : null}

      <Box display="flex" justifyContent="flex-end" className={classes.buttons}>
        <Button variant="outlined" type="submit" className={classes.button}>
          {loading ? <CircularProgress size={20} /> : "Sign in"}
        </Button>
        <Button onClick={modalHandler} variant="outlined" color="secondary">
          Cancel
        </Button>
      </Box>
    </form>
  );
}

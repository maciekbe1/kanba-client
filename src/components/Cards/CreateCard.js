import React, { useState } from "react";
import { request } from "api/API";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Box,
  Button,
  FormControl,
  FormHelperText,
  CircularProgress
} from "@material-ui/core";
import { createCard } from "actions/cardsActions";
import { useDispatch, useSelector } from "react-redux";

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
export default function CreateCard({ modalHandler, user }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    user,
    title: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const createCardHandler = e => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    request(
      `${process.env.REACT_APP_SERVER}/api/cards/create-card`,
      {
        user,
        title: values.title,
        description: values.description
      },
      token
    )
      .then(res => {
        dispatch(createCard(res.data));
        modalHandler();
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
        setMessage(error.response.data);
      });
  };
  return (
    <>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Utwórz kartę
      </Typography>
      <form noValidate autoComplete="off" onSubmit={e => createCardHandler(e)}>
        <TextField
          fullWidth
          required
          error={error}
          id="standard-required"
          label="Tytuł"
          value={values.title}
          onChange={handleChange("title")}
          helperText="* Wymagane"
          name="title"
          type="text"
          variant="outlined"
          style={{ margin: "10px 0 5px 0" }}
        />

        <TextField
          fullWidth
          id="standard-optional"
          label="Opis"
          value={values.description}
          onChange={handleChange("description")}
          multiline
          name="description"
          type="text"
          variant="outlined"
          style={{ margin: "5px 0 10px 0" }}
        />
        {error ? (
          <Box>
            <FormControl style={{ marginBottom: "20px" }}>
              <FormHelperText className={classes.error} id="my-helper-text">
                {message}
              </FormHelperText>
            </FormControl>
          </Box>
        ) : null}
        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.buttons}
        >
          <Button variant="outlined" type="submit" className={classes.button}>
            {loading ? <CircularProgress size={20} /> : "Create"}
          </Button>
          <Button onClick={modalHandler} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </form>
    </>
  );
}

import React, { useState } from "react";
import { request } from "api/API";
import Cookie from "js-cookie";
import cuid from "cuid";

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
export default function TodoAddCardItem({ modalHandler, listID, cardItem }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    id: cuid(),
    title: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const addItemHandler = e => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/add-todo-item`,
      { listID: listID, cardID: cardItem.id, item: values },
      Cookie.get("token")
    )
      .then(() => {
        modalHandler();
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        setMessage(error.response.data);
      });
  };
  return (
    <>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Utwórz zadanie
      </Typography>
      <form noValidate autoComplete="off" onSubmit={e => addItemHandler(e)}>
        <TextField
          fullWidth
          required
          error={error}
          id="standard-required"
          label="Title"
          value={values.title}
          onChange={handleChange("title")}
          helperText="* Required"
          name="title"
          type="text"
          variant="outlined"
          style={{ margin: "10px 0 5px 0" }}
        />

        <TextField
          fullWidth
          id="standard-optional"
          label="Description"
          value={values.description}
          onChange={handleChange("description")}
          multiline
          name="description"
          type="text"
          variant="outlined"
          style={{ margin: "5px 0 10px 0" }}
        />
        {error ? (
          <FormControl style={{ marginBottom: "20px" }}>
            <FormHelperText className={classes.error} id="my-helper-text">
              {message}
            </FormHelperText>
          </FormControl>
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

import React, { useState } from "react";
import { request } from "api/API";
import Cookie from "js-cookie";
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
import { createItem } from "actions/cardsActions";
import { useDispatch } from "react-redux";
import EditorContainer from "../Utils/Editor/EditorContainer";

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
export default function CreateCardItem({ modalHandler, cardID }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const setContentHandler = value => {
    setContent(value);
  };
  const addItemHandler = e => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    request(
      `${process.env.REACT_APP_SERVER}/api/cards/create-card-item`,
      { cardID: cardID._id, item: { title, content } },
      Cookie.get("token")
    )
      .then(res => {
        dispatch(
          createItem({
            cardID: cardID._id,
            values: { title, content },
            itemID: res.data.id
          })
        );
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
          value={title}
          onChange={e => setTitle(e.target.value)}
          helperText="* Required"
          name="title"
          type="text"
          variant="outlined"
          style={{ margin: "10px 0 5px 0" }}
        />

        {/* <TextField
          fullWidth
          id="standard-optional"
          label="content"
          value={values.content}
          onChange={handleChange("content")}
          multiline
          name="content"
          type="text"
          variant="outlined"
          style={{ margin: "5px 0 10px 0" }}
        /> */}
        <EditorContainer setContentHandler={setContentHandler} />
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
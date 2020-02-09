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
import { EditorState, convertToRaw } from "draft-js";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: "10px"
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: "bold",
    fontSize: "14px"
  },
  draftEditorModal: {
    borderRadius: "4px !important",
    border: "1px solid #6e6e6e !important",
    padding: "5px 8px",
    marginBottom: "8px"
  }
}));
export default function CreateCardItem({ modalHandler, cardID }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rawContent, setRawContent] = useState(
    JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  );

  const addItemHandler = e => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    request(
      `${process.env.REACT_APP_SERVER}/api/cards/create-card-item`,
      { cardID: cardID._id, item: { title, content: rawContent } },
      Cookie.get("token")
    )
      .then(res => {
        dispatch(
          createItem({
            cardID: cardID._id,
            values: { title, content: rawContent },
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
          label="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
          helperText="* Wymagane"
          name="title"
          type="text"
          variant="outlined"
          style={{ margin: "10px 0 5px 0" }}
        />
        <div className={classes.draftEditorModal}>
          <EditorContainer
            setEditorState={setEditorState}
            editorState={editorState}
            setRawContent={setRawContent}
          />
        </div>
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

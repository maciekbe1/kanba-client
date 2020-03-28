import React, { useState, useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Box,
  Button,
  FormControl,
  FormHelperText,
  CircularProgress
} from "@material-ui/core";
import { createItem } from "actions/cardsActions";
import { useDispatch, useSelector } from "react-redux";
import * as CardsService from "services/CardsService";
import Editor from "../Editor/Editor";

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "unset"
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: "bold",
    fontSize: "14px"
  },
  draftEditorModal: {
    padding: "5px 8px",
    marginBottom: "8px"
  }
}));
export default function CreateCardItem({ cardID, setCreateOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [editorState, setEditorState] = useState("");
  const titleField = useRef();
  const token = useSelector(state => state.authReducer.token);
  useEffect(() => {
    titleField.current.focus();
  }, []);
  const addItemHandler = e => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    CardsService.createItem(cardID._id, { title, content: editorState }, token)
      .then(res => {
        dispatch(
          createItem({
            cardID: cardID._id,
            values: { title, content: editorState, cardID: cardID._id },
            itemID: res.data.id
          })
        );
        setLoading(false);
        setMessage("");
        setTitle("");
        setEditorState("");
        titleField.current.focus();
        setCreateOpen(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        setMessage(error.response.data);
      });
  };
  return (
    <form noValidate autoComplete="off" onSubmit={addItemHandler}>
      <div className={classes.draftEditorModal}>
        <TextField
          fullWidth
          required
          inputRef={titleField}
          error={error}
          id="standard-required"
          label="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
          name="title"
          type="text"
        />
        <Editor setEditorState={setEditorState} editorState={editorState} />
      </div>
      <Box display="flex" justifyContent="space-between" px={1} mb={1}>
        <Box>
          <FormControl>
            <FormHelperText className={classes.error} id="my-helper-text">
              {message}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.buttons}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.button}
            size="small"
            style={{ marginRight: "10px" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} style={{ color: "red" }} />
            ) : (
              "Utwórz"
            )}
          </Button>
          <Button
            onClick={() => setCreateOpen(false)}
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
          >
            Anuluj
          </Button>
        </Box>
      </Box>
    </form>
  );
}

import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Editor from "components/Editor/Editor";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: 200
  },
  textField: {
    width: 200
  }
}));
export default function CreateItem({ setData, error, message }) {
  const [editorContent, setEditorContent] = useState();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [alert, setAlert] = useState(new Date().toISOString().slice(0, 16));
  const [priority, setPriority] = useState("");
  const classes = useStyles();
  useEffect(() => {
    setData({ title, content: editorContent, status, alert, priority });
  }, [title, editorContent, status, alert, priority, setData]);
  const statusChange = (event) => {
    setStatus(event.target.value);
  };
  const priorityChange = (event) => {
    setPriority(event.target.value);
  };
  return (
    <Box>
      <TextField
        fullWidth
        required
        error={error}
        id="standard-required"
        label="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        type="text"
      />
      {error ? (
        <FormControl>
          <FormHelperText id="my-helper-text">{message}</FormHelperText>
        </FormControl>
      ) : null}
      <Editor content={editorContent} setEditorContent={setEditorContent} />
      <Box display="flex" flexDirection="column">
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="status-select">
            Status
          </InputLabel>
          <Select
            labelId="status-select"
            id="status-select-filled"
            value={status}
            onChange={statusChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Brak</em>
            </MenuItem>
            <MenuItem value={"Oczekuje"}>Oczekuje</MenuItem>
            <MenuItem value={"W toku"}>W toku</MenuItem>
            <MenuItem value={"Zrobione"}>Zrobione</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="priority-select">
            Priorytet
          </InputLabel>
          <Select
            labelId="priority-select"
            id="priority-select-filled"
            value={priority}
            onChange={priorityChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Brak</em>
            </MenuItem>
            <MenuItem value={"Niski"}>Niski</MenuItem>
            <MenuItem value={"Średni"}>Średni</MenuItem>
            <MenuItem value={"Wysoki"}>Wysoki</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="datetime-local"
            label="Przypomnienie"
            type="datetime-local"
            defaultValue={alert}
            className={classes.textField}
            onChange={(e) => setAlert(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormControl>
      </Box>
    </Box>
  );
}

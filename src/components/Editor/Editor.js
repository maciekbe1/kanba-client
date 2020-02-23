import React, { useRef } from "react";
import "jodit";
import JoditEditor from "jodit-react";
import { useTheme } from "@material-ui/styles";
const Editor = ({ editorState, setEditorState }) => {
  const editor = useRef(null);
  const theme = useTheme();
  config.theme = theme.palette.type;
  const onBlurHanlder = newContent => {
    setEditorState(newContent);
    editor.current.blur();
  };
  return (
    <JoditEditor
      ref={editor}
      value={editorState}
      config={config}
      tabIndex={1}
      onBlur={newContent => onBlurHanlder(newContent)}
    />
  );
};

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  showPlaceholder: false,
  enter: "div",
  limitChars: 5000,
  toolbarSticky: true,
  autofocus: true
};
export default Editor;

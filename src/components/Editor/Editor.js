import React, { useRef } from "react";
import "jodit";
import JoditEditor from "jodit-react";
import { useTheme } from "@material-ui/styles";
const Editor = ({ editorState, setEditorState, onFocus = false }) => {
  const editor = useRef(null);
  const theme = useTheme();
  config.theme = theme.palette.type;
  config.autofocus = onFocus;
  const onBlurHanlder = newContent => {
    setEditorState(newContent);
    editor.current.blur();
  };
  return (
    <JoditEditor
      ref={editor}
      value={editorState}
      config={config}
      onBlur={newContent => onBlurHanlder(newContent)}
    />
  );
};
const buttons = [
  "fullsize",
  "undo",
  "redo",
  "|",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "left",
  "center",
  "right",
  "|",
  "font",
  "fontsize",
  "|",
  "ul",
  "ol",
  "|",
  "outdent",
  "indent",
  "brush",
  "eraser",
  "|",
  "superscript",
  "subscript",
  "paragraph",
  "|",
  "image",
  "video",
  "|",
  "table",
  "link",
  "\n",
  "selectall",
  "cut",
  "copy",
  "paste",
  "|",
  "hr",
  "symbol",
  "source"
];
const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  showPlaceholder: false,
  enter: "div",
  limitChars: 5000,
  toolbarSticky: true,
  autofocus: false,
  buttons: buttons,
  colorPickerDefaultTab: "color"
};
export default Editor;

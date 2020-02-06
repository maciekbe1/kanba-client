import React from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";

export default function EditorContainer({ setContentHandler }) {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const updateEditorState = editorState => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    setEditorState(editorState);
    setContentHandler(JSON.stringify(raw));
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={editorState => updateEditorState(editorState)}
      />
    </div>
  );
}

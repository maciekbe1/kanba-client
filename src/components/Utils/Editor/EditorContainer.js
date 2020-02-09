import React from "react";
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function EditorContainer({
  editorState,
  setEditorState,
  setRawContent,
  toolbarHidden = false,
  readOnly = false,
  setOnBlur = null
}) {
  const updateEditorState = editorState => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    setEditorState(editorState);
    setRawContent(JSON.stringify(raw));
  };

  return (
    <Editor
      toolbarHidden={toolbarHidden}
      readOnly={readOnly}
      editorState={editorState}
      onEditorStateChange={editorState => updateEditorState(editorState)}
      onBlur={(event, editorState) => {
        return setOnBlur !== null ? setOnBlur(true) : null;
      }}
      toolbar={{
        options: [
          "inline",
          "fontSize",
          "list",
          "textAlign",
          "colorPicker",
          "emoji",
          "link",
          "history"
        ],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true }
      }}
      toolbarClassName="draft-editor-toolbar"
      placeholder={
        editorState.getCurrentContent().hasText() ||
        convertToRaw(editorState.getCurrentContent()).blocks.some(
          item => item.type !== "unstyled"
        )
          ? ""
          : "Napisz coś.."
      }
      spellCheck={true}
    />
  );
}

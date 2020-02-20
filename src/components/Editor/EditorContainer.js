import React, { useState } from "react";
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "assets/styles/editor.css";

export default function EditorContainer({
  editorState,
  setEditorState,
  setRawContent,
  toolbarHidden = false,
  readOnly = false,
  setOnBlur = null
}) {
  const [localRaw, setLocalRaw] = useState();
  const updateEditorState = editorState => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    setEditorState(editorState);
    setRawContent(JSON.stringify(raw));
    setLocalRaw(JSON.stringify(raw));
  };
  const uploadCallback = e => {
    const url = URL.createObjectURL(e);
    return new Promise((resolve, reject) => {
      resolve({ data: { link: url } });
    });
  };
  return (
    <Editor
      toolbarHidden={toolbarHidden}
      readOnly={readOnly}
      editorState={editorState}
      handlePastedText={() => false}
      onEditorStateChange={editorState => updateEditorState(editorState)}
      onBlur={(event, editorState) => {
        return setOnBlur !== null ? setOnBlur(true, "content", localRaw) : null;
      }}
      toolbar={{
        options: [
          "inline",
          "fontSize",
          "list",
          "textAlign",
          "colorPicker",
          "image",
          "link",
          "history",
          "remove"
        ],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true, showOpenOptionOnHover: false },
        image: {
          uploadCallback: uploadCallback,
          previewImage: true,
          alt: { present: true, mandatory: false },
          defaultSize: {
            height: "auto",
            width: "100%"
          },
          inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
        }
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

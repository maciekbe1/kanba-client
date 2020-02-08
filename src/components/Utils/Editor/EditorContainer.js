import React from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
    <div className="editor-editing">
      <Editor
        editorState={editorState}
        onEditorStateChange={editorState => updateEditorState(editorState)}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
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
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        placeholder="Napisz coś.."
      />
    </div>
  );
}

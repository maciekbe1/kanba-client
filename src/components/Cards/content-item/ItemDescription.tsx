import React, { useState, useEffect } from "react";
import Editor from "components/Editor/Editor";
import EditorButtons from "components/Editor/EditorButtons";

import parse from "react-html-parser";

interface Props {
  content: any;
  onSaveContent: Function;
}

export default function Description({ content, onSaveContent }: Props) {
  const [edit, setEdit] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [memoContent, setMemoContent] = useState("");

  useEffect(() => {
    setEditorContent(content);
    setMemoContent(content);
    setEdit(false);
  }, [content]);

  const save = () => {
    setEdit(!edit);
    if (editorContent !== memoContent) {
      setMemoContent(editorContent);
    }
    onSaveContent(editorContent);
  };

  const onCancelContent = () => {
    setEdit(!edit);
    setEditorContent(memoContent);
  };

  const onSetEdit = (e: any) => {
    if (e.target.nodeName !== "A") {
      setEdit(true);
    }
  };

  return (
    <div className="card-description">
      <p className="card-description-title">Description</p>
      {edit ? (
        <>
          <Editor
            content={editorContent ? editorContent : ""}
            setEditorContent={setEditorContent}
            isEdit={edit}
          />
          <EditorButtons onSave={save} cancel={onCancelContent} />
        </>
      ) : (
        <div
          className="card-description-textbox w-100"
          onClick={(e) => onSetEdit(e)}
        >
          {editorContent ? (
            parse(editorContent)
          ) : (
            <span style={{ color: "#cfcfcf" }}>Add content</span>
          )}
        </div>
      )}
    </div>
  );
}

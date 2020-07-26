import React, { useState, useEffect } from "react";
import Editor from "components/Editor/Editor";
import EditorButtons from "components/Editor/EditorButtons";

import parse from "react-html-parser";

import { useDispatch } from "react-redux";
import { updateItem } from "store/actions/cardsActions";
import * as CardsService from "services/CardsService";

export default function Description({ content, itemID }) {
  const [edit, setEdit] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [memoContent, setMemoContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setEditorContent(content);
    setMemoContent(content);
  }, [content]);

  const onSaveContent = () => {
    setEdit(!edit);
    if (editorContent !== memoContent) {
      setMemoContent(editorContent);
      CardsService.updateItem(itemID, "content", editorContent);
      dispatch(
        updateItem({
          itemID: itemID,
          content: editorContent
        })
      );
    }
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
      <p className="card-description-title">Opis</p>
      {edit ? (
        <>
          <Editor
            content={editorContent ? editorContent : ""}
            setEditorContent={setEditorContent}
          />
          <EditorButtons save={onSaveContent} cancel={onCancelContent} />
        </>
      ) : (
        <div
          className="card-description-textbox w-100"
          onClick={(e) => onSetEdit(e)}
        >
          {editorContent ? (
            parse(editorContent)
          ) : (
            <span style={{ color: "#cfcfcf" }}>Dodaj treść</span>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Editor from "components/Editor/Editor";
import EditorButtons from "components/Editor/EditorButtons";
import Box from "@material-ui/core/Box";
import parse from "react-html-parser";
import { cloneDeep } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { updateItem } from "actions/cardsActions";
import * as CardsService from "services/CardsService";

export default function Description({ content, cardID, itemID }) {
  const [edit, setEdit] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [memoContent, setMemoContent] = useState(content);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  const onSaveContent = () => {
    setEdit(!edit);
    if (editorContent !== cloneDeep(content)) {
      setMemoContent(editorContent);
      CardsService.updateItem(cardID, itemID, "content", editorContent, token);
      dispatch(
        updateItem({
          itemID: itemID,
          cardID: cardID,
          content: editorContent
        })
      );
    }
  };

  const onCancelContent = () => {
    setEdit(!edit);
    setEditorContent(memoContent);
  };

  const onSetEdit = (e) => {
    if (!window.getSelection().toString() && e.target.nodeName !== "A") {
      setEdit(true);
    }
  };

  return (
    <div className="card-description">
      <p className="card-description-title">Opis</p>
      {edit ? (
        <>
          <Editor content={editorContent} setEditorContent={setEditorContent} />
          <EditorButtons save={onSaveContent} cancel={onCancelContent} />
        </>
      ) : (
        <Box
          className="card-description-textbox"
          width={1}
          onClick={(e) => onSetEdit(e)}
        >
          {editorContent ? (
            parse(editorContent)
          ) : (
            <span style={{ color: "#cfcfcf" }}>Dodaj treść</span>
          )}
        </Box>
      )}
    </div>
  );
}

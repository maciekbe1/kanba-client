import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addAttachment, removeAttachment } from "store/actions/cardsActions";

import * as CardsService from "services/CardsService";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";

import ItemFile from "components/Cards/CardItemContent/ItemFile";

export default function Attachments({ itemID, attachments }) {
  const input = useRef();
  const [pending, setPending] = useState();
  const dispatch = useDispatch();
  const [removing, setRemoving] = useState(false);
  const onUpload = (e) => {
    e.preventDefault();
    const upload = e.target.files[0];
    const formData = new FormData();
    formData.append("file", upload);
    formData.append("itemID", itemID);
    input.current.value = null;

    setPending(true);

    CardsService.uploadFileToItem(formData).then((res) => {
      dispatch(
        addAttachment({
          itemID: res.data.itemID,
          file: res.data.file
        })
      );
      setPending(false);
    });
  };

  const onRemove = (fileID, fileName) => {
    setRemoving(true);
    CardsService.removeFileFromItem(fileName, itemID, fileID)
      .then(() => {
        dispatch(removeAttachment({ itemID, fileID }));
        setRemoving(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content-attachments-container">
      <div>
        <form>
          <input type="file" onChange={onUpload} ref={input} />
          <Button
            size="small"
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            onClick={() => input.current.click()}
            // disabled={pending}
          >
            Upload
          </Button>
        </form>
      </div>
      <div className="content-attachment-files">
        {attachments.map((file, k) => (
          <div key={k} className="badge-content">
            <ItemFile file={file} onRemove={onRemove} removing={removing} />
          </div>
        ))}
        {pending ? <FileLoading /> : null}
      </div>
    </div>
  );
}

const FileLoading = () => {
  return (
    <div className="badge-content">
      <Avatar variant="rounded">
        <CircularProgress color="secondary" />
      </Avatar>
    </div>
  );
};

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAttachment, removeAttachment } from "store/actions/cardsActions";
import { useDropzone } from "react-dropzone";

import * as CardsService from "services/CardsService";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CircularProgress from "@material-ui/core/CircularProgress";

import ItemFile from "components/Cards/CardItemContent/ItemFile";

export default function Attachments({ itemID, attachments }) {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const [removing, setRemoving] = useState(false);
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("itemID", itemID);
      setPending(true);
      CardsService.addFileToItem(formData).then((res) => {
        dispatch(
          addAttachment({
            itemID: res.data.itemID,
            file: res.data.file
          })
        );
        setPending(false);
      });
    }
  });

  const onRemove = (fileID: string, fileName: string) => {
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

  const files = attachments?.map((file: any, k: number) => (
    <div key={k} className="badge-content">
      <ItemFile file={file} onRemove={onRemove} removing={removing} />
    </div>
  ));
  return (
    <div className="content-attachments-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Button
          size="small"
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
          onClick={open}
        >
          Click or Drop
        </Button>
      </div>
      <div className="content-attachment-files">
        {files}
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAttachment, removeAttachment } from "store/actions/cardsActions";
import { useDropzone } from "react-dropzone";

import * as CardsService from "services/CardsService";

import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AttachmentDialog from "components/Cards/content-item/AttachmentDialog";

import ItemFile from "components/Cards/content-item/ItemFile";

interface Props {
  itemID: string;
  attachments: Array<any>;
}

export default function Attachments({ itemID, attachments }: Props) {
  const [, setPending] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const openDialog = (number: number) => {
    setIndex(number);
    setDialogIsOpen(true);
  };
  const dispatch = useDispatch();
  //TODO -> set attachment state and controll it by hook
  //what is when add attachment behind attachment as fast as
  //the first newly added is not responsed yet
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
    setPending(true);
    CardsService.removeFileFromItem(fileName, itemID, fileID)
      .then(() => {
        dispatch(removeAttachment({ itemID, fileID }));
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        {attachments?.map((file: any, k: number) => (
          <div key={k} onClick={() => openDialog(k)}>
            <ItemFile file={file} onRemove={onRemove} />
          </div>
        ))}
      </div>
      {attachments?.length ? (
        <AttachmentDialog
          isOpen={dialogIsOpen}
          setDialogIsOpen={setDialogIsOpen}
          attachments={attachments}
          index={index}
        />
      ) : null}
    </div>
  );
}

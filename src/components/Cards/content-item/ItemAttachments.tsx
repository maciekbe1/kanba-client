import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeAttachment } from "store/actions/cardsActions";
import { useDropzone } from "react-dropzone";

import * as CardsService from "services/CardsService";

import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AttachmentDialog from "components/Cards/content-item/AttachmentDialog";

import ItemFile from "components/Cards/content-item/ItemFile";

import AttachmentHelper from "helper/AttachmentHelper";
interface Props {
  itemID: string;
  attachments: Array<any>;
  postAttachments: Function;
}

export default function Attachments({
  itemID,
  attachments,
  postAttachments
}: Props) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState<Array<any>>([]);

  useEffect(() => {
    setFiles(attachments);
  }, [attachments]);

  const openDialog = (number: number) => {
    setIndex(number);
    setDialogIsOpen(true);
  };

  const dispatch = useDispatch();
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    onDrop: (acceptedFiles) => {
      const attachment = AttachmentHelper.attachmentURLCreator(acceptedFiles);
      setFiles([...files, ...attachment]);
      postAttachments([...files, ...attachment]);
    }
  });

  const onRemove = (fileID: string, name: string) => {
    dispatch(removeAttachment({ itemID, fileID }));
    CardsService.removeFileFromItem(name, itemID, fileID);
  };

  return (
    <div className="content-attachments-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <IconButton aria-label="delete" onClick={open}>
          <AttachFileIcon />
        </IconButton>
      </div>
      <div className="content-attachment-files">
        {files.map((file: any, k: number) => (
          <div key={k} onClick={() => openDialog(k)}>
            <ItemFile file={file} onRemove={onRemove} />
          </div>
        ))}
      </div>
      {files.length && dialogIsOpen ? (
        <AttachmentDialog
          isOpen={dialogIsOpen}
          setDialogIsOpen={setDialogIsOpen}
          attachments={files}
          index={index}
        />
      ) : null}
    </div>
  );
}

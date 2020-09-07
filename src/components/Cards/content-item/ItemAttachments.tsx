import React, { useState } from "react";

import { useDropzone } from "react-dropzone";

import IconButton from "@material-ui/core/IconButton";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AttachmentDialog from "components/Cards/content-item/AttachmentDialog";

import ItemFile from "components/Cards/content-item/ItemFile";

import AttachmentHelper from "helper/AttachmentHelper";

interface Props {
  onRemoveAttachment: Function;
  attachments: Array<any>;
  onPostAttachments: Function;
  isNew: boolean;
}

export default function Attachments({
  attachments,
  onPostAttachments,
  onRemoveAttachment,
  isNew
}: Props) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAttachmentDialog = (number: number) => {
    setIndex(number);
    setDialogIsOpen(true);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    maxSize: 15728640,
    onDrop: (acceptedFiles, error) => {
      const attachment = AttachmentHelper.attachmentURLCreator(acceptedFiles);
      console.log(error);
      if (isNew) {
        onPostAttachments([...attachments, ...attachment], error);
      } else {
        onPostAttachments(attachment, error);
      }
    }
  });

  const onRemoveFromView = (index: number) => {
    try {
      onRemoveAttachment(index);
    } catch (error) {
      console.log(error);
    }
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
        {attachments?.map((file: any, k: number) => (
          <div key={k} onClick={() => openAttachmentDialog(k)}>
            <ItemFile
              file={file}
              onRemoveFromView={onRemoveFromView}
              index={k}
            />
          </div>
        ))}
      </div>
      {attachments?.length && dialogIsOpen ? (
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

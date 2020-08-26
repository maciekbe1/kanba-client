import React, { useState, useEffect } from "react";

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
}

export default function Attachments({
  attachments,
  onPostAttachments,
  onRemoveAttachment
}: Props) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState<Array<any>>([]);

  useEffect(() => {
    if (Array.isArray(attachments)) {
      setFiles(attachments);
    }
  }, [attachments]);

  const openDialog = (number: number) => {
    setIndex(number);
    setDialogIsOpen(true);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    onDrop: (acceptedFiles) => {
      const attachment = AttachmentHelper.attachmentURLCreator(acceptedFiles);
      setFiles([...files, ...attachment]);
      onPostAttachments(acceptedFiles);
    }
  });

  const onRemoveFromView = (index: number) => {
    try {
      onRemoveAttachment(index);
      setFiles(files.filter((item, i) => index !== i));
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
        {files?.map((file: any, k: number) => (
          <div key={k} onClick={() => openDialog(k)}>
            <ItemFile
              file={file}
              onRemoveFromView={onRemoveFromView}
              index={k}
            />
          </div>
        ))}
      </div>
      {files?.length && dialogIsOpen ? (
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

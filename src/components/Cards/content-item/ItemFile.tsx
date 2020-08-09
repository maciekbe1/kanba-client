import React, { useState, useMemo } from "react";

import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import filesize from "filesize";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

interface Props {
  file: any;
  onRemove: Function;
}

export default function ItemFile({ file, onRemove }: Props) {
  const [hovered, eventHandlers] = useHover();

  return (
    <div className="attachment-file" {...eventHandlers}>
      {file.mimetype.includes("image") ? (
        <img src={file.fileLocation} alt="" />
      ) : (
        <InsertDriveFileIcon fontSize="large" />
      )}
      {hovered ? <FileInfo file={file} onRemove={onRemove} /> : null}
    </div>
  );
}

const FileInfo = ({ file, onRemove }: any) => {
  const remove = (e: any) => {
    e.stopPropagation();
    onRemove(file._id, file.storageName);
  };
  return (
    <div className="attachment-hover-container">
      <div className="attachment-name">{file.fileName}</div>
      <div className="attachment-size">
        <span>{filesize(file.size)}</span>
        <IconButton size="small" onClick={(e) => remove(e)}>
          <ClearIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

const useHover = () => {
  const [hovered, setHovered] = useState(false);

  const eventHandlers = useMemo(
    () => ({
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false)
    }),
    [setHovered]
  );

  return [hovered, eventHandlers];
};
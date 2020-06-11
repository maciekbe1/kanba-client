import React, { useState, useEffect, useRef } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Badge from "@material-ui/core/Badge";
import CancelIcon from "@material-ui/icons/Cancel";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Attachments({
  onUpload,
  onRemove,
  attachments,
  pending
}) {
  const input = useRef();
  return (
    <div className="content-attachments-container">
      <div>
        <form>
          <input type="file" onChange={(e) => onUpload(e, input)} ref={input} />
          <Button
            size="small"
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            onClick={() => input.current.click()}
            disabled={pending}
          >
            Upload
          </Button>
        </form>
      </div>
      <div className="content-attachment-files">
        {attachments?.map((file, i) => {
          return (
            <FileContent
              key={i}
              file={file}
              onRemove={onRemove}
              pending={pending}
            />
          );
        })}
        {pending ? <FileLoading /> : null}
      </div>
    </div>
  );
}

const FileContent = ({ file, onRemove }) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <div className="badge-content" ref={hoverRef}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        invisible={!isHovered}
        badgeContent={
          <CancelIcon
            htmlColor="#f44336"
            style={{
              background: "#fff",
              borderRadius: "50%",
              cursor: "pointer"
            }}
            onClick={() => onRemove(file._id, file.storageName)}
          />
        }
      >
        {file.mimetype.includes("image") ? (
          <Avatar variant="rounded" src={file.fileLocation}></Avatar>
        ) : (
          <Avatar variant="rounded">
            <InsertDriveFileIcon />
          </Avatar>
        )}
      </Badge>
    </div>
  );
};

const FileLoading = () => {
  return (
    <div className="badge-content">
      <Avatar variant="rounded">
        <CircularProgress color="secondary" />
      </Avatar>
    </div>
  );
};
function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [] // Recall only if ref changes
  );

  return [ref, value];
}

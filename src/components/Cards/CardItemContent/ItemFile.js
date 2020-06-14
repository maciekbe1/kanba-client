import React, { useState, useMemo } from "react";

import Badge from "@material-ui/core/Badge";
import CancelIcon from "@material-ui/icons/Cancel";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Avatar from "@material-ui/core/Avatar";

export default function ItemFile({ file, onRemove }) {
  const [hovered, eventHandlers] = useHover();

  return (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      invisible={!hovered}
      {...eventHandlers}
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
  );
}
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

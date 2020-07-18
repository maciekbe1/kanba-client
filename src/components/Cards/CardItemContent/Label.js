import React, { useState, useEffect } from "react";
import Chip from "@material-ui/core/Chip";

export default function Label({ option, index, getTagProps }) {
  return (
    <Chip
      variant={option.variant}
      label={option.name}
      clickable
      onClick={setVariant}
      size="small"
      {...getTagProps({ index })}
    />
  );
}

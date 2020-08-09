import React from "react";
import Button from "@material-ui/core/Button";

export default function EditorButtons({ save, cancel }) {
  return (
    <div className="editor-buttons-container">
      <Button size="small" variant="contained" color="primary" onClick={save}>
        Save
      </Button>
      <Button size="small" onClick={cancel} variant="text">
        Cancel
      </Button>
    </div>
  );
}

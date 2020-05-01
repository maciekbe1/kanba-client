import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export default function EditorButtons({ save, cancel }) {
  return (
    <Box display="flex" pt={2} className="editor-buttons-container">
      <Button size="small" variant="contained" color="primary" onClick={save}>
        Zapisz
      </Button>
      <Button size="small" onClick={cancel} variant="text">
        Anuluj
      </Button>
    </Box>
  );
}

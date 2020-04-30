import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function SimpleModal({ onDialogAccept, setError, activator, children }) {
  const [open, setOpen] = useState(false);
  const save = () => {
    onDialogAccept().then((res) => {
      setOpen(!res);
      setError(!res);
    });
  };
  const close = () => {
    setError(false);
    setOpen(false);
  };
  return (
    <>
      {activator({ setOpen })}
      <Dialog
        onClose={close}
        open={open}
        maxWidth="xl"
        className="modal-general"
      >
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" data-name="selected">
            Nie
          </Button>
          <Button onClick={save} color="secondary" data-name="selected">
            Tak
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default SimpleModal;

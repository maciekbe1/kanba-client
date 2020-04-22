import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function SimpleModal({ onDialogAccept, error, setError, activator, children }) {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const save = () => {
    onDialogAccept();
    if (error) {
      setOpen(false);
    }
    setError(false);
  };
  const close = () => {
    setError(false);
    setOpen(false);
  };
  return (
    <>
      {activator({ setOpen })}
      <Dialog onClose={close} open={open} className={classes.modal}>
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

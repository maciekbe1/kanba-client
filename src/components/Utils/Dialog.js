import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  DialogTitle,
  DialogContentText
} from "@material-ui/core";
export default function DialogWindow({
  open,
  onDialogClose,
  onDialogAccept,
  dialogTitle,
  dialogText
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onDialogClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} color="primary" data-name="selected">
          Nie
        </Button>
        <Button onClick={onDialogAccept} color="secondary" data-name="selected">
          Tak
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

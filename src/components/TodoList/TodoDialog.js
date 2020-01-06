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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function TodoDialog({
  approvedRemoveList,
  dialog,
  dialogHandler,
  list
}) {
  return (
    <Dialog
      open={dialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={dialogHandler}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Do u want to remove {list ? list.title : null}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          this list will be deleted permanently
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogHandler} color="primary">
          Disagree
        </Button>
        <Button onClick={approvedRemoveList} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

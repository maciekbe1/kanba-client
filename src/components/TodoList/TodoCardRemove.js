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
import Cookie from "js-cookie";
import { request } from "api/API";
import { removeCard } from "actions/TodoListActions";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function TodoDialog({
  dialog,
  dialogHandler,
  cardItem,
  todoID
}) {
  const dispatch = useDispatch();
  const approvedRemoveList = () => {
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/remove-todo-card`,
      { todoID: todoID, cardID: cardItem.id },
      Cookie.get("token")
    )
      .then(() => {
        dialogHandler(false);
        dispatch(
          removeCard({
            cardID: cardItem.id
          })
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  };
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
        Do u want to remove {cardItem ? cardItem.title : null}?
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

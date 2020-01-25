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
import { removeCard } from "actions/cardsActions";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function RemoveCard({ dialog, dialogHandler, cardID, userID }) {
  const dispatch = useDispatch();
  const approvedRemoveList = () => {
    request(
      `${process.env.REACT_APP_SERVER}/api/cards/remove-card`,
      { cardID: cardID._id, userID },
      Cookie.get("token")
    )
      .then(() => {
        dialogHandler(false);
        dispatch(removeCard({ cardID: cardID._id }));
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
        Na pewno chesz usunąć {cardID ? cardID.title : null}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Ta karta zostanie trwale usunięta.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogHandler} color="primary">
          Nie
        </Button>
        <Button onClick={approvedRemoveList} color="primary" color="secondary">
          Tak
        </Button>
      </DialogActions>
    </Dialog>
  );
}

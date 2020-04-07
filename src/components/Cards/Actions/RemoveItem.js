import React from "components/Cards/Actions/node_modules/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  DialogTitle,
  DialogContentText
} from "components/Cards/Actions/node_modules/@material-ui/core";
import { useDispatch } from "components/Cards/Actions/node_modules/react-redux";
import * as CardsService from "components/Cards/Actions/node_modules/services/CardsService";
import * as CardsHelper from "components/Cards/Actions/node_modules/helper/CardsHelper";

import {
  setCards,
  setSelectedItems
} from "components/Cards/Actions/node_modules/actions/cardsActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RemoveItems({
  dialog,
  dialogHandler,
  cards,
  selectedItems,
  token
}) {
  const dispatch = useDispatch();
  const approvedRemoveList = () => {
    dialogHandler(false);
    const newCards = CardsHelper.removeSelectedItems(cards, selectedItems);
    const selected = selectedItems.map(item => {
      return {
        itemID: item._id,
        cardID: item.cardID
      };
    });
    CardsService.removeSelectedItems(token, selected);
    dispatch(setCards({ cards: newCards }));
    dispatch(setSelectedItems([]));
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
        Na pewno chesz usunąć zaznaczone zadania?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Zadania zostaną trwale usunięte.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogHandler} color="primary" data-name="selected">
          Nie
        </Button>
        <Button
          onClick={approvedRemoveList}
          color="secondary"
          data-name="selected"
        >
          Tak
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, cloneDeep, isNull, find, isNil } from "lodash";
import { setCards, updateCard, setSelectedItems } from "actions/cardsActions";
import { setBar } from "actions/layoutActions";

import CreateCard from "./CreateCard";
import RemoveItems from "./RemoveItems";
import DragDropComponent from "./DragDropComponent";
import Modal from "../Utils/Modal";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import * as CardsService from "services/CardsService";
import * as CardsHelper from "helper/CardsHelper";

const SESSION_MESSAGE =
  "Wystąpił błąd w pobraniu treści. Proszę wyloguj i zaloguj się ponownie";
export default function Cards() {
  const userID = useSelector(state => state.authReducer.data._id);
  const token = useSelector(state => state.authReducer.token);
  const cards = useSelector(state => state.cardsReducer.cardsState);
  const selectedItems = useSelector(state => state.cardsReducer.selectedItems);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    CardsService.getCards(userID, token)
      .then(res => {
        dispatch(setCards({ cards: res.data }));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        dispatch(
          setBar({ type: "error", message: SESSION_MESSAGE, active: true })
        );
      });
  }, [dispatch, userID, token]);

  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  const onDragEnd = result => {
    let newData = cloneDeep(cards);
    if (
      isNull(result.destination) ||
      (result.destination?.index === result.source?.index &&
        result.destination.droppableId === result.source.droppableId)
    ) {
      return cards;
    } else if (selectedItems.length >= 1) {
      const selectedContainItem = selectedItems.some(
        item => item._id === result.draggableId
      );

      const position = result.destination.index;

      if (!selectedContainItem) {
        const card = find(cards, ["_id", result.source.droppableId]);
        const item = find(card.list, ["_id", result.draggableId]);
        const newSelectedItems = [item, ...selectedItems];

        dispatch(setSelectedItems(newSelectedItems));

        CardsService.updateManyItems(
          result.destination.droppableId,
          newSelectedItems.map(item => {
            return {
              itemID: item._id,
              cardID: isNil(item.cardID)
                ? result.source.droppableId
                : item.cardID
            };
          }),
          position,
          token
        );
        const newCards = CardsHelper.cardItemsSelectedChange(
          cards,
          result,
          newSelectedItems
        );
        dispatch(setCards({ cards: newCards }));
      } else {
        CardsService.updateManyItems(
          result.destination.droppableId,
          selectedItems.map(item => {
            return {
              itemID: item._id,
              cardID: isNil(item.cardID)
                ? result.source.droppableId
                : item.cardID
            };
          }),
          position,
          token
        );
        const newCards = CardsHelper.cardItemsSelectedChange(
          cards,
          result,
          selectedItems
        );
        dispatch(setCards({ cards: newCards }));
      }
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId === result.source.droppableId
    ) {
      try {
        CardsService.updateCardPosition(result, token);
        const newCards = CardsHelper.cardItemChange(newData, result);
        dispatch(
          setCards({
            cards: newCards
          })
        );
      } catch (error) {
        console.log(error);
      }
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId !== result.source.droppableId
    ) {
      try {
        const { start, end, newCards } = CardsHelper.cardItemShared(
          cards,
          result
        );
        CardsService.cardItemShared(start, end, result, token);
        dispatch(
          setCards({
            cards: newCards
          })
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const newCards = CardsHelper.cardChange(cards, result);
        dispatch(
          setCards({
            cards: newCards
          })
        );
        dispatch(
          updateCard({
            cardID: result.draggableId,
            position: {
              userID,
              source: result.source.index,
              destination: result.destination.index
            },
            type: "all_cards",
            token
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);

  const removeSelectedDialog = () => {
    setDialog(!dialog);
  };
  return (
    <>
      {loading ? (
        <Skeleton
          variant="rect"
          height={80}
          animation="wave"
          style={{ margin: "5px 0" }}
        />
      ) : isEmpty(cards) ? (
        <Typography variant="subtitle1" style={{ margin: "10px 0" }}>
          nie masz list
        </Typography>
      ) : (
        <DragDropComponent
          cards={cards}
          onDragEnd={onDragEnd}
          userID={userID}
        />
      )}
      <Modal modalHandler={modalHandler} openProps={openModal}>
        <CreateCard modalHandler={modalHandler} user={userID} />
      </Modal>
      <div className={classes.exampleWrapper}>
        {!selectedItems.length ? (
          <SpeedDial
            ariaLabel="create"
            onClick={modalHandler}
            className={`${classes.speedDial} ${classes.speedDialAdd}`}
            open={false}
            icon={<SpeedDialIcon />}
          />
        ) : (
          <SpeedDial
            ariaLabel="remove"
            onClick={removeSelectedDialog}
            className={`${classes.speedDial} ${classes.speedDialRemove}`}
            open={false}
            data-name="selected"
            icon={<DeleteForeverIcon data-name="selected" edge="end" />}
          />
        )}
      </div>
      <RemoveItems
        dialog={dialog}
        dialogHandler={removeSelectedDialog}
        selectedItems={selectedItems}
        cards={cards}
      />
    </>
  );
}

const useStyles = makeStyles(theme => ({
  exampleWrapper: {
    position: "fixed",
    marginTop: theme.spacing(3),
    right: 0,
    bottom: 0,
    zIndex: 2
  },
  speedDial: {
    position: "absolute",
    opacity: "0.4",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2)
    },
    "&:hover": {
      opacity: 1
    }
  },
  speedDialAdd: {
    "&.MuiFab-label": {
      width: "auto"
    }
  },
  speedDialRemove: {
    "&.MuiSpeedDial-root .MuiFab-primary": {
      backgroundColor: theme.palette.error.main
    },
    "&.MuiSpeedDial-root .MuiSvgIcon-root": {
      width: "100%",
      height: "53px",
      padding: "14px"
    }
  }
}));

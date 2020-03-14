import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, cloneDeep, isNull } from "lodash";
import {
  getCards,
  cardItemChange,
  cardItemShared,
  cardChange,
  updateCard,
  setSelectedItems
} from "actions/cardsActions";
import { setBar } from "actions/layoutActions";

import CreateCard from "./CreateCard";
import DragDropComponent from "./DragDropComponent";
import Modal from "../Utils/Modal";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PostAddIcon from "@material-ui/icons/PostAdd";
import * as CardsService from "services/CardsService";
import * as CardsHelper from "helper/CardsHelper";

const SESSION_MESSAGE =
  "Wystąpił błąd w pobraniu treści. Proszę wyloguj i zaloguj się ponownie";
export default function Cards() {
  const userID = useSelector(state => state.authReducer.data._id);
  const cards = useSelector(state => state.cardsReducer.cardsState);
  const selectedItems = useSelector(state => state.cardsReducer.selectedItems);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    CardsService.getCards(userID)
      .then(res => {
        dispatch(getCards({ cards: res.data }));
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        dispatch(
          setBar({ type: "error", message: SESSION_MESSAGE, active: true })
        );
      });
  }, [dispatch, userID]);

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
    } else if (selectedItems.length > 1) {
      const selectedContainItem = selectedItems.some(
        item => item.itemID === result.draggableId
      );
      if (!selectedContainItem) {
        const obj = {
          itemID: result.draggableId,
          cardID: result.source.droppableId
        };
        const newSelectedItems = [obj, ...selectedItems];
        dispatch(setSelectedItems(newSelectedItems));
        CardsHelper.cardItemsSelectedChange(cards, result, newSelectedItems);
      } else {
        CardsHelper.cardItemsSelectedChange(cards, result, selectedItems);
      }
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId === result.source.droppableId
    ) {
      try {
        CardsService.updateCard(result);
        const newCards = CardsHelper.cardItemChange(newData, result);
        dispatch(
          cardItemChange({
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
        CardsService.cardItemShared(start, end, result);
        dispatch(
          cardItemShared({
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
          cardChange({
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
            type: "all_cards"
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const classes = useStyles();
  const [openDial, setOpenDial] = React.useState(false);

  const handleClose = () => {
    setOpenDial(false);
  };

  const handleOpen = () => {
    setOpenDial(!openDial);
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
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onClick={handleOpen}
          open={openDial}
          direction="up"
        >
          <SpeedDialAction
            icon={<PostAddIcon />}
            tooltipTitle={"Utwórz kartę"}
            onClick={modalHandler}
          />
        </SpeedDial>
      </div>
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
  }
}));

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, cloneDeep, isNull } from "lodash";
import {
  getCards,
  cardItemChange,
  cardItemShared,
  cardChange,
  updateCard
} from "actions/cardsActions";
import CreateCard from "./CreateCard";
import DragDropComponent from "./DragDropComponent";
import Modal from "../Utils/Modal";
import { Button, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export default function Cards() {
  const userID = useSelector(state => state.authReducer.data._id);
  const cards = useSelector(state => state.cardsReducer.cardsState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      !didCancel && setLoading(true);
      try {
        !didCancel &&
          (await dispatch(
            getCards({
              userID: userID
            })
          ));
      } catch (error) {
        console.log(error);
      } finally {
        !didCancel && setLoading(false);
      }
    }
    fetchData();
  }, [userID, dispatch]);

  const modalHandler = () => {
    setOpen(!open);
  };

  const onDragEnd = result => {
    let newData = cloneDeep(cards);
    if (
      isNull(result.destination) ||
      (result.destination?.index === result.source?.index &&
        result.destination.droppableId === result.source.droppableId)
    ) {
      return cards;
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId === result.source.droppableId
    ) {
      dispatch(
        cardItemChange({
          cards: newData,
          result
        })
      );
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId !== result.source.droppableId
    ) {
      dispatch(
        cardItemShared({
          cards,
          result
        })
      );
    } else {
      dispatch(
        cardChange({
          cards,
          result
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
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={modalHandler}>
        Utwórz nową kartę
      </Button>
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
      <Modal modalHandler={modalHandler} openProps={open}>
        <CreateCard modalHandler={modalHandler} user={userID} />
      </Modal>
    </>
  );
}

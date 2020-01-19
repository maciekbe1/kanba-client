import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty, cloneDeep } from "lodash";
import {
  setTodo,
  cardItemChange,
  cardItemShared,
  cardChange
} from "actions/TodoActions";
import TodoCreateCard from "./TodoCreateCard";
import DragDropComponent from "./DragDropComponent";
import Modal from "../Utils/Modal";
import { Button, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export default function TodoList() {
  const userID = useSelector(state => state.authReducer.data._id);
  const todo = useSelector(state => state.todoStateReducer.todoState);
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
            setTodo({
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
    let newData = cloneDeep(todo);
    if (!result.destination) {
      return todo.cards;
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId === result.source.droppableId
    ) {
      dispatch(
        cardItemChange({
          todo: newData,
          result
        })
      );
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId !== result.source.droppableId
    ) {
      dispatch(
        cardItemShared({
          todo,
          result
        })
      );
    } else {
      dispatch(
        cardChange({
          todo,
          result
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
        <Skeleton variant="rect" height={118} animation="wave" />
      ) : isEmpty(todo.cards) ? (
        <Typography variant="subtitle1" style={{ margin: "10px 0" }}>
          nie masz list
        </Typography>
      ) : (
        <DragDropComponent
          cards={todo.cards}
          onDragEnd={onDragEnd}
          todoID={todo._id}
        />
      )}
      <Modal modalHandler={modalHandler} openProps={open}>
        <TodoCreateCard modalHandler={modalHandler} user={userID} />
      </Modal>
    </>
  );
}

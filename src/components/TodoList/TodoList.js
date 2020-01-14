import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty, cloneDeep, find } from "lodash";
import DragDropComponent from "./DragDropComponent";

import {
  Button,
  Typography,
  LinearProgress,
  Backdrop
} from "@material-ui/core";
import { request } from "../../api/API";
import Cookie from "js-cookie";
import Modal from "../Utils/Modal";
import TodoCreateList from "./TodoCreateList";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));
export default function TodoList() {
  const classes = useStyles();
  const userID = useSelector(state => state.authReducer.data._id);
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState({});
  const [cardID, setCardID] = useState();
  const [open, setOpen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const getListHandler = () => {
    setBackdrop(true);
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/get-user-todo-lists`,
      { userID },
      Cookie.get("token")
    )
      .then(res => {
        setLoading(false);
        setTodoList(res.data.cards);
        setBackdrop(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/get-user-todo-lists`,
      { userID },
      Cookie.get("token")
    )
      .then(res => {
        setLoading(false);
        setTodoList(res.data.cards);
        setCardID(res.data._id);
        setBackdrop(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userID]);

  const modalHandler = () => {
    setOpen(!open);
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = result => {
    setTodoList(prevState => {
      let newData = cloneDeep(prevState);
      if (!result.destination) {
        return newData;
      } else if (
        result.type === "LIST" &&
        result.destination.droppableId === result.source.droppableId
      ) {
        newData.map(card => {
          const data = reorder(
            card.list,
            result.source.index,
            result.destination.index
          );
          if (card.id === result.source.droppableId) {
            card.list = data;
          }
          return data;
        });
      } else if (
        result.type === "LIST" &&
        result.destination.droppableId !== result.source.droppableId
      ) {
        const itemId = JSON.parse(result.draggableId).nodeId;

        let start = find(newData, o => {
          return o.id === result.source.droppableId;
        });
        let end = find(newData, o => {
          return o.id === result.destination.droppableId;
        });
        const item = find(
          newData.map(i => {
            return find(i.list, item => {
              return item.id === itemId;
            });
          }),
          o => o !== undefined
        );

        start.list.splice(result.source.index, 1);
        end.list.splice(result.destination.index, 0, item);
      } else {
        const [removed] = newData.splice(result.source.index, 1);
        newData.splice(result.destination.index, 0, removed);
      }
      return newData;
    });
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={modalHandler}>
        Create new Todo List
      </Button>
      {loading ? (
        <LinearProgress style={{ margin: "10px 0" }} />
      ) : isEmpty(todoList) ? (
        <Typography variant="subtitle1" style={{ margin: "10px 0" }}>
          You do not have any list currently
        </Typography>
      ) : (
        <DragDropComponent
          todoLists={todoList}
          onDragEnd={onDragEnd}
          getListHandler={getListHandler}
          cardID={cardID}
        />
      )}
      <Modal modalHandler={modalHandler} openProps={open}>
        <TodoCreateList
          modalHandler={modalHandler}
          user={userID}
          getListHandler={getListHandler}
        />
      </Modal>
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import DragDropComponent from "./DragDropComponent";
import { cloneDeep } from "lodash";

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
        setTodoList({
          lists: {
            ...res.data.map(item => {
              return item.list;
            })
          },
          info: {
            ...res.data.map(item => {
              return {
                id: item._id,
                title: item.title,
                description: item.description
              };
            })
          }
        });
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
        setTodoList({
          lists: {
            ...res.data.map(item => {
              return item.list;
            })
          },
          info: {
            ...res.data.map(item => {
              return {
                id: item._id,
                title: item.title,
                description: item.description
              };
            })
          }
        });
        setBackdrop(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [userID]);

  const modalHandler = () => {
    setOpen(!open);
  };

  const onDragEnd = ({ destination, source, type }) => {
    if (type === "list") {
      setTodoList(prevState => {
        const newData = cloneDeep(prevState);
        console.log(newData.lists[source.droppableId]);
        newData.lists[destination.droppableId].splice(
          destination.index,
          0,
          ...newData.lists[source.droppableId].splice(source.index, 1)
        );

        return {
          ...newData
        };
      });
    }
    if (destination && source) {
      setTodoList(prevState => {
        const newData = cloneDeep(prevState);

        newData.lists[destination.droppableId].splice(
          destination.index,
          0,
          ...newData.lists[source.droppableId].splice(source.index, 1)
        );

        return {
          ...newData
        };
      });
    }
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
          todoLists={todoList.lists}
          onDragEnd={onDragEnd}
          todoInfo={todoList.info}
          getListHandler={getListHandler}
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

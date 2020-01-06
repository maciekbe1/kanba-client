import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import TodoDnd from "./TodoDnd";
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
import TodoDialog from "./TodoDialog";
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
  const [todoList, setTodoList] = useState([]);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState();
  const [dialog, setDialog] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  useEffect(() => {
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/get-user-todo-lists`,
      { userID },
      Cookie.get("token")
    )
      .then(res => {
        setLoading(false);
        setTodoList(res.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [userID]);
  const getListHandler = () => {
    setBackdrop(true);
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/get-user-todo-lists`,
      { userID },
      Cookie.get("token")
    )
      .then(res => {
        setLoading(false);
        setTodoList(res.data);
        setBackdrop(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  const removeListHandler = list => {
    setList(list);
    setDialog(true);
  };
  const approvedRemoveList = () => {
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/remove-todo-list`,
      { listID: list._id },
      Cookie.get("token"),
      "delete"
    )
      .then(() => {
        getListHandler();
        setDialog(false);
      })
      .catch(error => {
        console.log(error.response);
        setDialog(false);
      });
  };
  const modalHandler = () => {
    setOpen(!open);
  };
  const dialogHandler = () => {
    setDialog(!dialog);
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
        <TodoDnd todoList={todoList} removeListHandler={removeListHandler} />
      )}
      <Modal modalHandler={modalHandler} openProps={open} width={800}>
        <TodoCreateList
          modalHandler={modalHandler}
          user={userID}
          getListHandler={getListHandler}
        />
      </Modal>
      <TodoDialog
        approvedRemoveList={approvedRemoveList}
        dialog={dialog}
        dialogHandler={dialogHandler}
        list={list}
      />
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

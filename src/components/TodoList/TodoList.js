import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import TodoDnd from "./TodoDnd";
import { Button, Typography, LinearProgress } from "@material-ui/core";
import { request } from "../../api/API";
import Cookie from "js-cookie";
import Modal from "../Utils/Modal";
import TodoCreateList from "./TodoCreateList";
import TodoDialog from "./TodoDialog";
export default function TodoList() {
    const userID = useSelector(state => state.authReducer.data._id);
    const [loading, setLoading] = useState(true);
    const [todoList, setTodoList] = useState([]);
    const [open, setOpen] = useState(false);
    const [list, setList] = useState();
    const [openDialog, setOpenDialog] = useState(false);

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
    };
    const removeListHandler = list => {
        setList(list);
        setOpenDialog(true);
    };
    const approvedRemoveList = () => {
        request(
            `${process.env.REACT_APP_SERVER}/api/todo/remove-todo-list`,
            { listID: list._id },
            Cookie.get("token"),
            "delete"
        )
            .then(res => {
                return res.data;
            })
            .catch(error => {
                console.log(error.response);
            });
        getListHandler();
        setOpenDialog(false);
    };
    const modalHandler = () => {
        setOpen(!open);
    };
    const dialogHandler = () => {
        setOpenDialog(!openDialog);
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
                <TodoDnd
                    todoList={todoList}
                    removeListHandler={removeListHandler}
                />
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
                openDialog={openDialog}
                dialogHandler={dialogHandler}
                list={list}
            />
        </>
    );
}

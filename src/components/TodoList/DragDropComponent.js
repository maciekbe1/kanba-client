import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Card } from "@material-ui/core";
import DroppableContainer from "./DroppableContainer";
import TodoDialog from "./TodoDialog";
import Cookie from "js-cookie";
import { request } from "../../api/API";

export default function DragDropComponent({
  todoLists,
  todoInfo,
  onDragEnd,
  getListHandler
}) {
  const [dialog, setDialog] = useState(false);
  const [list, setList] = useState();

  const dialogHandler = () => {
    setDialog(!dialog);
  };
  const approvedRemoveList = () => {
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/remove-todo-list`,
      { listID: list.id },
      Cookie.get("token"),
      "delete"
    )
      .then(() => {
        getListHandler();
        setDialog(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  const removeListHandler = list => {
    setList(list);
    setDialog(true);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(todoLists).map((container, key) => (
          <Card key={key} style={{ margin: "5px auto" }}>
            <DroppableContainer
              droppableId={container}
              lists={todoLists[container]}
              info={todoInfo[container]}
              key={key}
              removeListHandler={removeListHandler}
            />
          </Card>
        ))}
      </DragDropContext>
      <TodoDialog
        approvedRemoveList={approvedRemoveList}
        dialog={dialog}
        dialogHandler={dialogHandler}
        list={list}
      />
    </>
  );
}

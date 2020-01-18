import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@material-ui/core";
import DroppableContainer from "./DroppableContainer";
import TodoDialog from "./TodoDialog";
import Cookie from "js-cookie";
import { request } from "api/API";
import Modal from "../Utils/Modal";
import TodoAddItem from "./TodoAddItem";
export default function DragDropComponent({
  todoLists,
  onDragEnd,
  getListHandler,
  listID
}) {
  const [dialog, setDialog] = useState(false);
  const [cardItem, setCardItem] = useState();
  const [open, setOpen] = useState(false);

  const modalHandler = card => {
    setCardItem(card);
    setOpen(!open);
  };

  const dialogHandler = () => {
    setDialog(!dialog);
  };

  const approvedRemoveList = () => {
    request(
      `${process.env.REACT_APP_SERVER}/api/todo/remove-todo-list`,
      { listID: listID, cardID: cardItem.id },
      Cookie.get("token")
    )
      .then(() => {
        getListHandler();
        setDialog(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const removeListHandler = card => {
    setCardItem(card);
    setDialog(true);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-cards" type="CARD">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoLists.map((card, key) => (
                <Draggable key={card.id} draggableId={card.id} index={key}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card style={{ margin: "5px auto" }}>
                        <DroppableContainer
                          droppableId={card}
                          list={todoLists[key].list}
                          removeListHandler={removeListHandler}
                          index={key}
                          modalHandler={modalHandler}
                        />
                        {/* {provided.placeholder} */}
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <TodoDialog
        approvedRemoveList={approvedRemoveList}
        dialog={dialog}
        dialogHandler={dialogHandler}
        cardItem={cardItem}
      />
      <Modal modalHandler={modalHandler} openProps={open}>
        <TodoAddItem
          modalHandler={modalHandler}
          listID={listID}
          cardItem={cardItem}
          getListHandler={getListHandler}
        />
      </Modal>
    </>
  );
}

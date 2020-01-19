import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@material-ui/core";
import DroppableContainer from "./DroppableContainer";
import TodoCardRemove from "./TodoCardRemove";

import Modal from "../Utils/Modal";
import TodoAddCardItem from "./TodoAddCardItem";
export default function DragDropComponent({ cards, onDragEnd, todoID }) {
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
              {cards.map((card, key) => (
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
                          list={cards[key].list}
                          removeListHandler={removeListHandler}
                          index={key}
                          modalHandler={modalHandler}
                          todoID={todoID}
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
      <TodoCardRemove
        dialog={dialog}
        dialogHandler={dialogHandler}
        cardItem={cardItem}
        todoID={todoID}
      />
      <Modal modalHandler={modalHandler} openProps={open}>
        <TodoAddCardItem
          modalHandler={modalHandler}
          todoID={todoID}
          cardItem={cardItem}
        />
      </Modal>
    </>
  );
}

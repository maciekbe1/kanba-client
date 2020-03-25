import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@material-ui/core";
import DroppableContainer from "./DroppableContainer";
import RemoveCard from "./RemoveCard";

export default function DragDropComponent({ cards, onDragEnd, userID }) {
  const [dialog, setDialog] = useState(false);
  const [cardID, setCardID] = useState();

  const dialogHandler = () => {
    setDialog(!dialog);
  };

  const removeCard = card => {
    setCardID(card);
    setDialog(true);
  };
  const getCardStyle = draggableStyle => ({
    margin: `0 0 8px 0`,
    ...draggableStyle
  });
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-cards" type="CARD">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((card, key) => (
                <Draggable key={card._id} draggableId={card._id} index={key}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getCardStyle(provided.draggableProps.style)}
                    >
                      <Card
                        style={{
                          overflow: "visible"
                        }}
                      >
                        <DroppableContainer
                          droppableId={card}
                          list={cards[key].list}
                          removeCard={removeCard}
                          index={key}
                          dragHandleProps={provided.dragHandleProps}
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
      <RemoveCard
        dialog={dialog}
        dialogHandler={dialogHandler}
        cardID={cardID}
        userID={userID}
      />
    </>
  );
}

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Box from "@material-ui/core/Box";

export default function DndItem({ itemObj, index }) {
  const item = JSON.parse(itemObj);

  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Box>
            <div>{item.title}</div>
          </Box>
        </div>
      )}
    </Draggable>
  );
}

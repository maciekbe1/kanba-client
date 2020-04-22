import React, { memo } from "react";
import Item from "components/Cards/DragDrop/Item";
import { Droppable } from "react-beautiful-dnd";

export default function List({ card }) {
  return (
    <Droppable droppableId={card._id} type="LIST">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {card.list.map((item, index) => (
            <InnerItem key={item._id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const InnerItem = memo(function InnerItem({ item, index }) {
  return <Item item={item} index={index} />;
});
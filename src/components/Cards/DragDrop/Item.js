import React, { useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useDispatch } from "react-redux";
import { openCardContent } from "actions/cardsActions";

import DragHandleIcon from "@material-ui/icons/DragHandle";
import ItemCheckbox from "components/Cards/DragDrop/ItemComponent/ItemCheckbox";

export default function DndItem({ item, index, info, title }) {
  const dispatch = useDispatch();

  const openItem = useCallback(
    (e) => {
      if (e.target.classList.contains("card-item-container")) {
        dispatch(openCardContent({ item }));
      }
    },
    [item, dispatch]
  );

  const getItemStyle = (draggableStyle, isOver) => {
    return {
      padding: "0 0 0 3px",
      background: isOver ? "rgb(239, 242, 245)" : "",
      ...draggableStyle
    };
  };

  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={getItemStyle(
            provided.draggableProps.style,
            snapshot.isDragging
          )}
          className="card-item"
          onClick={openItem}
        >
          <div className="flex align-center space-between card-item-container">
            <div className="flex align-center">
              <div {...provided.dragHandleProps} style={{ display: "flex" }}>
                <DragHandleIcon />
              </div>
              <ItemCheckbox item={item} />
              {title}
            </div>
            <div className="flex">
              <div className="card-item-icons">{info}</div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

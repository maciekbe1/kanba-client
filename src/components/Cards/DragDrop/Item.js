import React, { useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useDispatch, useSelector } from "react-redux";
import { openCardContent } from "actions/cardsActions";

import DragHandleIcon from "@material-ui/icons/DragHandle";
import ItemCheckbox from "components/Cards/DragDrop/ItemComponent/ItemCheckbox";
import ItemInfo from "components/Cards/DragDrop/ItemComponent/ItemInfo";

export default function DndItem({ item, index }) {
  const selected = useSelector((state) => state.cardsReducer.itemContentData);
  return (
    <ItemComponent
      item={item}
      index={index}
      selected={selected?._id === item._id}
    />
  );
}

const ItemComponent = React.memo(function ItemComponent({
  item,
  index,
  selected
}) {
  const dispatch = useDispatch();

  const openItem = useCallback(
    (e) => {
      if (
        e.target.classList.contains("card-item-container") ||
        e.target.classList.contains("item-title-text") ||
        e.target.classList.contains("card-item-action")
      ) {
        dispatch(openCardContent({ item }));
      }
    },
    [item, dispatch]
  );

  const getItemStyle = (provided, snapshot) => {
    return {
      background: snapshot.isDragging ? "#ccc" : "",
      ...provided.draggableProps.style
    };
  };

  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={getItemStyle(provided, snapshot)}
          className={selected ? "card-item card-item-selected" : "card-item"}
          onClick={openItem}
        >
          <div className="flex align-center space-between card-item-container">
            <div className="flex align-center card-item-action">
              <div
                {...provided.dragHandleProps}
                style={{ display: "flex", marginLeft: "5px" }}
              >
                <DragHandleIcon />
              </div>
              <ItemCheckbox item={item} />
              <span className="item-title-text">{item.title}</span>
            </div>
            <div className="flex">
              <div className="card-item-icons">
                <ItemInfo status={item.status} priority={item.priority} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
});

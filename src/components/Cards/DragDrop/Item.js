import React, { useCallback } from "react";

import { Draggable } from "react-beautiful-dnd";

import Title from "components/Common/Title";
import DragHandleIcon from "@material-ui/icons/DragHandle";

import ChevronRight from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import { useDispatch, useSelector } from "react-redux";
import * as CardsService from "services/CardsService";
import { updateItem, openCardContent } from "actions/cardsActions";
import ItemCheckbox from "components/Cards/DragDrop/ItemComponent/ItemCheckbox";
import ItemInfo from "components/Cards/DragDrop/ItemComponent/ItemInfo";

export default function DndItem({ item, index, cardID }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const isOpen = useSelector((state) => state.cardsReducer.isContentOpen);
  const onItemChange = (element, type) => {
    CardsService.updateItem(cardID, item._id, type, element, token);
    dispatch(
      updateItem({
        itemID: item._id,
        cardID: cardID,
        [type]: element
      })
    );

    if (isOpen && type === "title") {
      const elem = document.querySelector(
        `.card-item-content .title-component p`
      );
      elem.textContent = element;
    }
  };

  const openItem = useCallback(() => {
    dispatch(openCardContent({ item }));
  }, [item, dispatch]);

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
          className={`${"card-item"}`}
        >
          <div className="flex align-center space-between">
            <div className="flex align-center">
              <div {...provided.dragHandleProps} style={{ display: "flex" }}>
                <DragHandleIcon />
              </div>
              <ItemCheckbox item={item} />
              <Title title={item.title} onTitleChange={onItemChange} />
            </div>
            <div className="flex">
              <ListItem className="expand-button">
                <ItemInfo status={item.status} priority={item.priority} />
              </ListItem>
              <ListItem button onClick={openItem} className="expand-button">
                <ChevronRight />
              </ListItem>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

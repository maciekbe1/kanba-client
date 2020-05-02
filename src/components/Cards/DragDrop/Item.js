import React, { useState, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import Box from "@material-ui/core/Box";
import Title from "components/Common/Title";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import Content from "components/Cards/DragDrop/ItemComponent/Content";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ListItem from "@material-ui/core/ListItem";
import { useDispatch, useSelector } from "react-redux";
import * as CardsService from "services/CardsService";
import { updateItem } from "actions/cardsActions";
import ItemCheckbox from "components/Cards/DragDrop/ItemComponent/ItemCheckbox";
import ItemInfo from "components/Cards/DragDrop/ItemComponent/ItemInfo";
export default function DndItem({ item, index, cardID }) {
  const [expand, setExpand] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);

  const onItemChange = (element, type) => {
    CardsService.updateItem(cardID, item._id, type, element, token);
    dispatch(
      updateItem({
        itemID: item._id,
        cardID: cardID,
        [type]: element
      })
    );
  };
  const itemToggle = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

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
        <Box
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={getItemStyle(
            provided.draggableProps.style,
            snapshot.isDragging
          )}
          className={`${"card-item"} ${expand ? "expand" : "collapsed"}`}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <div {...provided.dragHandleProps} style={{ display: "flex" }}>
                <DragHandleIcon />
              </div>
              <ItemCheckbox item={item} />
              <Title title={item.title} onTitleChange={onItemChange} />
            </Box>
            <Box display="flex">
              <ListItem className="expand-button">
                {expand ? null : (
                  <ItemInfo status={item.status} priority={item.priority} />
                )}
              </ListItem>
              <ListItem button onClick={itemToggle} className="expand-button">
                {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
            </Box>
          </Box>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Content
              content={item.content}
              itemID={item._id}
              cardID={cardID}
              date={item.date}
              status={item.status}
              priority={item.priority}
              onItemChange={onItemChange}
            />
          </Collapse>
        </Box>
      )}
    </Draggable>
  );
}

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

export default function DndItem({ itemObj, index }) {
  const item = JSON.parse(itemObj);
  const [expand, setExpand] = useState(false);
  const onTitleChange = () => {
    console.log("title changed");
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
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <div {...provided.dragHandleProps} style={{ display: "flex" }}>
                <DragHandleIcon />
              </div>
              <Title title={item.title} onTitleChange={onTitleChange} />
            </Box>
            <ListItem button onClick={itemToggle} className="expand-button">
              {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
          </Box>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Content
              content={item.content}
              itemID={item._id}
              cardID={item.cardID}
            />
          </Collapse>
        </Box>
      )}
    </Draggable>
  );
}

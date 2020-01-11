import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Typography, ListItem } from "@material-ui/core";
const styles = {
  columnStyles: {
    flex: " 0 0 100%",
    maxWidth: "100%",
    position: "relative",
    padding: "0 15px"
  },
  rowStyles: {
    display: "flex",
    flexWrap: "wrap"
  }
};
const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging &&
    {
      // background: "rgb(235,235,235)"
    })
});
export default function DraggableItem({ item, index }) {
  return (
    <Draggable
      key={item.id}
      draggableId={JSON.stringify({
        nodeId: item.id,
        type: "DragItem"
      })}
      index={index}
    >
      {(provided, snapshot) => (
        <ListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div style={styles.columnStyles}>
            <Typography>{item.title}</Typography>
          </div>
        </ListItem>
      )}
    </Draggable>
  );
}

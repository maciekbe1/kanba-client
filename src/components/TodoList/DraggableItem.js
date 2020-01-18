import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Typography, ListItem, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  columnStyles: {
    flex: " 0 0 100%",
    maxWidth: "100%",
    position: "relative",
    padding: "0 15px"
  },
  rowStyles: {
    display: "flex",
    flexWrap: "wrap",
    "&:hover": {
      background: "#b3b1b1",
      borderRadius: "5px"
    }
  }
}));
const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    borderRadius: "5px",
    background: "#9a9797"
  })
});
export default function DraggableItem({ item, index }) {
  const classes = useStyles();

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
          className={classes.rowStyles}
        >
          <Box
            className={classes.columnStyles}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{item.title}</Typography>
            <Button variant="outlined">Usuń</Button>
          </Box>
        </ListItem>
      )}
    </Draggable>
  );
}

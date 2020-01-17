import React from "react";
import { Droppable } from "react-beautiful-dnd";
import {
  CardContent,
  Typography,
  Box,
  List,
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import DraggableItem from "./DraggableItem";
const useStyles = makeStyles(theme => ({
  cardTitle: {
    wordBreak: "break-all"
  }
}));
export default function DroppableContainer({
  droppableId,
  list,
  removeListHandler
}) {
  const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "#212121" : ""
  });
  const classes = useStyles();
  return (
    <Droppable droppableId={droppableId.id} type="LIST">
      {(provided, snapshot) => (
        <CardContent ref={provided.innerRef} {...provided.droppableProps}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography className={classes.cardTitle}>
              {droppableId.title}
            </Typography>
            <IconButton
              aria-label="delete"
              onClick={() => removeListHandler(droppableId)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <List style={getListStyle(snapshot.isDraggingOver)}>
            {list && list.length > 0 ? (
              list.map((item, key) => (
                <DraggableItem key={item.id} item={item} index={key} />
              ))
            ) : (
              <Box>
                <br />
                No Items
              </Box>
            )}
            {provided.placeholder}
          </List>
        </CardContent>
      )}
    </Droppable>
  );
}

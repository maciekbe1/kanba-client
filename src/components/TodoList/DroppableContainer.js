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
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import DraggableItem from "./DraggableItem";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  cardTitle: {
    wordBreak: "break-all"
  },
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}));
export default function DroppableContainer({
  droppableId,
  list,
  removeListHandler,
  modalHandler,
  todoID
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
            <Box display="flex">
              <Tooltip title="Dodaj pozycje do karty" placement="top">
                <IconButton
                  aria-label="add"
                  onClick={() => modalHandler(droppableId)}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Usuń kartę" placement="top">
                <IconButton
                  aria-label="delete"
                  onClick={() => removeListHandler(droppableId)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <List style={getListStyle(snapshot.isDraggingOver)}>
            {list && list.length > 0 ? (
              list.map((item, key) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  cardID={droppableId.id}
                  index={key}
                  todoID={todoID}
                />
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

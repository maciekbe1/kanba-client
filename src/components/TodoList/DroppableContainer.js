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

import DraggableItem from "./DraggableItem";
export default function DroppableContainer({
  droppableId,
  lists,
  info,
  removeListHandler
}) {
  const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "#212121" : ""
  });
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <CardContent ref={provided.innerRef} {...provided.droppableProps}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>{info.title}</Typography>
            <IconButton
              aria-label="delete"
              onClick={() => removeListHandler(info)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <List style={getListStyle(snapshot.isDraggingOver)}>
            {lists && lists.length > 0 ? (
              lists.map((item, key) => (
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

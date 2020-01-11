import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
  Box,
  RootRef,
  Typography,
  Card,
  CardContent
} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InboxIcon from "@material-ui/icons/Inbox";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "../Utils/Modal";
import TodoEditList from "./TodoEditList";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const getListStyle = isDraggingOver => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});
export default function TodoDnd({ todoList, removeListHandler }) {
  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    todoList.forEach(item => {
      const itemsList = reorder(
        item.list,
        result.source.index,
        result.destination.index
      );
      item["list"] = itemsList;
    });
  };
  const [open, setOpen] = useState(false);
  const [listData, setListData] = useState({});
  const modalHandler = () => {
    setOpen(!open);
  };
  const openModalHandler = item => {
    setListData(item);
    setOpen(true);
  };
  return (
    <>
      {todoList.map((item, index) => {
        return (
          <DragDropContext key={index} onDragEnd={onDragEnd}>
            <Card style={{ margin: "10px 0" }}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h3">{item.title}</Typography>
                  <Box>
                    <IconButton onClick={() => openModalHandler(item)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => removeListHandler(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <RootRef rootRef={provided.innerRef}>
                      <List style={getListStyle(snapshot.isDraggingOver)}>
                        {item.list.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <ListItem
                                ContainerComponent="li"
                                ContainerProps={{
                                  ref: provided.innerRef
                                }}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <ListItemIcon>
                                  <InboxIcon />
                                </ListItemIcon>
                                <ListItemText
                                  primary={item.primary}
                                  secondary={item.secondary}
                                >
                                  {item.title}
                                </ListItemText>
                                <ListItemSecondaryAction>
                                  <IconButton>
                                    <EditIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </List>
                    </RootRef>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </DragDropContext>
        );
      })}
      <Modal modalHandler={modalHandler} openProps={open}>
        <TodoEditList modalHandler={modalHandler} listData={listData} />
      </Modal>
    </>
  );
}

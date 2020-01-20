import React, { useRef, useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { cloneDeep } from "lodash";
import {
  CardContent,
  Typography,
  Box,
  List,
  IconButton,
  Button,
  Collapse,
  Tooltip
} from "@material-ui/core";
import {
  DragIndicator,
  Delete,
  Add,
  Done,
  Clear,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import DraggableItem from "./DraggableItem";
import { updateCard } from "actions/TodoActions";
import { useDispatch } from "react-redux";
const useStyles = makeStyles(theme => ({
  cardTitle: {
    wordBreak: "break-all",
    fontWeight: "bold",
    "&:focus": {
      backgroundColor: "#e5e5e5",
      color: "#333232",
      borderRadius: "5px",
      padding: "0 5px",
      outline: "none"
    },
    "&:hover": {
      cursor: "pointer"
    }
  },
  editContentIcons: {
    display: "flex",
    marginTop: "2px",
    zIndex: "10"
  },
  icon: {
    borderRadius: "2px",
    height: "20px",
    width: "20px",
    color: "#676464"
  }
}));
const EXPAND_TEXT = "Rozwiń kartę";
const COLLAPSED_TEXT = "Zwiń kartę";
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
  const cardTitle = useRef();
  const [editable, setEditable] = useState(false);
  const [values, setValues] = useState();
  useOutsideEvent(cardTitle, setEditable);
  const classes = useStyles();
  const dispatch = useDispatch();
  const expandClick = () => {
    dispatch(
      updateCard({
        cardID: droppableId.id,
        expand: !droppableId.expand
      })
    );
  };
  const titleFocusHandler = e => {
    e.stopPropagation();
    cardTitle.current.contentEditable = true;
    cardTitle.current.focus();
    setEditable(true);
  };
  const keyPress = e => {
    if (e.key === "Enter") {
      cardTitle.current.contentEditable = false;
      cardTitle.current.blur();
      setEditable(false);
      dispatch(
        updateCard({
          cardID: droppableId.id,
          title: cardTitle.current.textContent
        })
      );
    }
  };
  useEffect(() => {
    setValues(cardTitle.current.textContent);
  }, []);
  const backContent = () => {
    cardTitle.current.textContent = cloneDeep(values);
  };
  const approveContent = () => {
    cardTitle.current.contentEditable = false;
    cardTitle.current.blur();
    setEditable(false);
    dispatch(
      updateCard({
        cardID: droppableId.id,
        title: cardTitle.current.textContent
      })
    );
  };
  return (
    <Droppable droppableId={droppableId.id} type="LIST">
      {(provided, snapshot) => (
        <CardContent
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ paddingBottom: "16px" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <DragIndicator />
              <Box position="relative">
                <Typography
                  ref={cardTitle}
                  className={classes.cardTitle}
                  variant="h6"
                  onMouseDown={e => titleFocusHandler(e)}
                  onKeyPress={e => keyPress(e)}
                  tabIndex="0"
                >
                  {droppableId.title}
                </Typography>
                {editable ? (
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    className={classes.editContentIcons}
                    position="absolute"
                    right="0px"
                  >
                    <Button
                      size="small"
                      onMouseDown={approveContent}
                      variant="contained"
                      style={{
                        marginRight: "2px",
                        padding: "2px",
                        minWidth: "10px"
                      }}
                    >
                      <Done className={classes.icon} />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onMouseDown={backContent}
                      style={{
                        marginLeft: "2px",
                        padding: "2px",
                        minWidth: "10px"
                      }}
                    >
                      <Clear className={classes.icon} />
                    </Button>
                  </Box>
                ) : null}
              </Box>
            </Box>
            <Box display="flex">
              <Tooltip
                title={droppableId.expand ? COLLAPSED_TEXT : EXPAND_TEXT}
                placement="top"
              >
                <IconButton
                  aria-label={droppableId.expand ? "expandLess" : "expandMore"}
                  onClick={expandClick}
                >
                  {droppableId.expand ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Dodaj pozycje do karty" placement="top">
                <IconButton
                  aria-label="add"
                  onClick={() => modalHandler(droppableId)}
                >
                  <Add />
                </IconButton>
              </Tooltip>

              <Tooltip title="Usuń kartę" placement="top">
                <IconButton
                  aria-label="delete"
                  onClick={() => removeListHandler(droppableId)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Collapse in={droppableId.expand} timeout="auto" unmountOnExit>
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
          </Collapse>
        </CardContent>
      )}
    </Droppable>
  );
}

function useOutsideEvent(ref, setEditable) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      ref.current.setEditable = false;
      ref.current.blur();
      setEditable(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

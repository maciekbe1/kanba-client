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
  Tooltip,
  Badge
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
import { updateCard } from "actions/cardsActions";
import { useDispatch } from "react-redux";

const EXPAND_TEXT = "Rozwiń kartę";
const COLLAPSED_TEXT = "Zwiń kartę";

export default function DroppableContainer({
  droppableId,
  list,
  removeCard,
  modalHandler,
  setDisableDrag
}) {
  const getListStyle = isDraggingOver => ({
    // background: isDraggingOver ? "#212121" : ""
  });

  const cardTitle = useRef();
  const [editable, setEditable] = useState(false);
  const [values, setValues] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const expandClick = () => {
    try {
      dispatch(
        updateCard({
          cardID: droppableId._id,
          expand: !droppableId.expand
        })
      );
      setValues(cardTitle.current.textContent);
    } catch (error) {
      console.log(error);
    }
  };
  const mouseDownCardTitle = e => {
    e.stopPropagation();
    cardTitle.current.contentEditable = true;
    cardTitle.current.focus();
    setEditable(true);
  };
  const keyPressCardTitle = e => {
    if (e.key === "Enter") {
      cardTitle.current.blur();
    }
  };

  useEffect(() => {
    setValues(cardTitle.current.textContent);
  }, []);

  const onClikcDiscard = () => {
    cardTitle.current.textContent = cloneDeep(values);
    cardTitle.current.contentEditable = false;
    setEditable(false);
    cardTitle.current.blur();
  };

  const onClikcAccept = () => {
    cardTitle.current.contentEditable = false;
    setEditable(false);
    cardTitle.current.blur();
    if (cardTitle.current.textContent.length === 0) {
      cardTitle.current.textContent = cloneDeep(values);
    }
    if (cardTitle.current.textContent !== values) {
      dispatch(
        updateCard({
          cardID: droppableId._id,
          title: cardTitle.current.textContent
        })
      );
      setValues(cardTitle.current.textContent);
    }
  };

  const cardTitleOnBlur = e => {
    setEditable(false);
    if (cardTitle.current.textContent.length === 0) {
      cardTitle.current.textContent = cloneDeep(values);
    }
    if (cardTitle.current.textContent !== values) {
      dispatch(
        updateCard({
          cardID: droppableId._id,
          title: cardTitle.current.textContent
        })
      );
      setValues(cardTitle.current.textContent);
    }
  };

  const onPaste = event => {
    event.preventDefault();
    const text = event.clipboardData.getData("text");
    document.execCommand("insertText", false, text);
  };

  useOutsideEvent(cardTitle);

  return (
    <Droppable droppableId={droppableId._id} type="LIST">
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
            className={classes.cardContentBox}
          >
            <Box
              display="flex"
              alignItems="center"
              className={classes.titleBox}
            >
              <DragIndicator />
              <Box position="relative">
                <Typography
                  ref={cardTitle}
                  className={classes.cardTitle}
                  variant="h6"
                  onMouseDown={mouseDownCardTitle}
                  onKeyPress={keyPressCardTitle}
                  tabIndex="0"
                  onBlur={cardTitleOnBlur}
                  onPaste={onPaste}
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
                      onMouseDown={onClikcAccept}
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
                      onMouseDown={onClikcDiscard}
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
            <Box display="flex" className={classes.buttonBox}>
              <Tooltip
                title={droppableId.expand ? COLLAPSED_TEXT : EXPAND_TEXT}
                placement="top"
              >
                <IconButton
                  aria-label={droppableId.expand ? "expandLess" : "expandMore"}
                  onClick={expandClick}
                >
                  <Badge
                    color="primary"
                    badgeContent={list.length}
                    max={99}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                  >
                    {droppableId.expand ? <ExpandLess /> : <ExpandMore />}
                  </Badge>
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
                  onClick={() => removeCard(droppableId)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Collapse in={droppableId.expand} timeout="auto" unmountOnExit>
            <List style={getListStyle(snapshot.isDraggingOver)}>
              {list?.length > 0 ? (
                list.map((item, key) => (
                  <DraggableItem
                    key={item._id}
                    item={item}
                    cardID={droppableId._id}
                    index={key}
                    setDisableDrag={setDisableDrag}
                  />
                ))
              ) : (
                <Box>Karta jest pusta</Box>
              )}
              {provided.placeholder}
            </List>
          </Collapse>
        </CardContent>
      )}
    </Droppable>
  );
}

function useOutsideEvent(ref) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      ref.current.setEditable = false;
      ref.current.blur();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

const useStyles = makeStyles(theme => ({
  cardTitle: {
    fontWeight: "bold",
    "&:focus": {
      backgroundColor: "#e5e5e5",
      color: "#333232",
      borderRadius: "5px",
      padding: "0 5px",
      outline: "none",
      marginLeft: "-5px"
    },
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#e5e5e5",
      borderRadius: "5px",
      color: "#212121",
      padding: "0 5px",
      marginLeft: "-5px"
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
  },
  cardContentBox: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    },
    position: "sticky",
    top: "72px",
    zIndex: 1,
    background: theme.palette.background.paper
  },
  titleBox: {
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  buttonBox: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      justifyContent: "space-between"
    }
  }
}));

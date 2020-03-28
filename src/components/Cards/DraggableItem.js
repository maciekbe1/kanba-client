import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import * as CardsService from "services/CardsService";

import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateItem, setSelectedItems } from "actions/cardsActions";

import Editor from "../Editor/Editor";

import {
  Typography,
  ListItem,
  Box,
  IconButton,
  Paper,
  Button,
  Badge
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ArrowRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { Done, Clear } from "@material-ui/icons";

import { cloneDeep, find } from "lodash";
import parse from "react-html-parser";

export default function DraggableItem({ item, index, cardID }) {
  const [readOnly, setReadOnly] = useState(true);
  const selectedItems = useSelector(state => state.cardsReducer.selectedItems);
  const token = useSelector(state => state.authReducer.token);
  const dark = useSelector(state =>
    state.layoutReducer.darkTheme ? "dark" : "light"
  );
  const useStyles = makeStyles(theme => ({
    listItem: {
      flex: " 0 0 100%",
      maxWidth: "100%",
      position: "relative"
    },
    rowStyles: {
      position: "relative",
      display: "flex",
      flexWrap: "wrap",
      border: "1px solid",
      borderColor: dark === "dark" ? "#616161" : "#E0E0E0",
      borderRadius: "5px",
      backgroundColor: find(selectedItems, ["_id", item._id])
        ? "#919191"
        : dark === "dark"
        ? "#616161"
        : "#E0E0E0",
      color: dark === "dark" ? "#fff" : "#212121",
      "&:hover": {
        backgroundColor: find(selectedItems, ["_id", item._id])
          ? "#919191"
          : dark === "dark"
          ? "#6e6e6e"
          : "#d3d3d3"
      }
    },
    expandItem: {
      padding: "5px",
      borderRadius: "50%",
      width: "auto"
    },
    paper: {
      padding: "5px",
      overflow: "hidden",
      minHeight: "100px",
      "&:hover": {
        border: readOnly ? "2px solid " + theme.palette.primary.main : ""
      }
    },
    saveItemContentBtn: {
      marginRight: "5px"
    },
    itemTitle: {
      wordBreak: "break-all",
      "&:focus": {
        backgroundColor: dark === "dark" ? "#e5e5e5" : "#f2f2f2",
        color: "#333232",
        borderRadius: "5px",
        padding: "0 5px",
        outline: "none",
        marginLeft: "-5px"
      },
      "&:hover": {
        cursor: "pointer",
        backgroundColor: dark === "dark" ? "#e5e5e5" : "#f2f2f2",
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
    addContent: {
      textTransform: "unset"
    }
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editorState, setEditorState] = useState("");
  const [editable, setEditable] = useState(false);
  const [titleText, setTitleText] = useState();
  const itemTitle = useRef();
  const selectedBox = useRef();

  useEffect(() => {
    setEditorState(item.content);
    setTitleText(itemTitle.current.textContent);
  }, [item]);

  const mouseDownItemTitle = e => {
    e.stopPropagation();
    itemTitle.current.contentEditable = true;
    itemTitle.current.focus();
    setEditable(true);
  };

  const keyPressItemTitle = e => {
    if (e.key === "Enter") {
      itemTitle.current.blur();
    }
  };

  const cardItemOnBlur = e => {
    setEditable(false);
    if (itemTitle.current.textContent.length === 0) {
      itemTitle.current.textContent = cloneDeep(titleText);
    }
    if (itemTitle.current.textContent !== titleText) {
      setTitleText(itemTitle.current.textContent);
      postUpdateItem(null, "title", itemTitle.current.textContent);
    }
  };

  const onClikcDiscard = () => {
    itemTitle.current.textContent = cloneDeep(titleText);
    itemTitle.current.contentEditable = false;
    setEditable(false);
  };

  const onClikcAccept = () => {
    itemTitle.current.contentEditable = false;
    setEditable(false);
    if (itemTitle.current.textContent.length === 0) {
      itemTitle.current.textContent = cloneDeep(titleText);
    }
    if (itemTitle.current.textContent !== titleText) {
      postUpdateItem(null, "title", itemTitle.current.textContent);
      setTitleText(itemTitle.current.textContent);
    }
  };

  const expandClick = () => {
    setOpen(!open);
    if (open && !readOnly) {
      setReadOnly(!readOnly);
    }
  };

  const readOnlyHandler = e => {
    let selection = window.getSelection().toString();
    if (selection) {
      setReadOnly(true);
    } else if (e.target.nodeName === "A") {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  };

  const removeItemFromCard = () => {
    CardsService.removeCardItem(cardID, item._id, token)
      .then(() => {
        dispatch(
          removeItem({
            itemID: item._id,
            cardID: cardID
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const postUpdateItem = (readOnlyValue, key, value) => {
    if (readOnlyValue !== null) {
      setReadOnly(readOnlyValue);
    }
    if (
      editorState !== cloneDeep(item.content) ||
      itemTitle.current.textContent !== cloneDeep(item.title)
    ) {
      CardsService.updateItem(cardID, item._id, key, value, token).then(() => {
        dispatch(
          updateItem({
            itemID: item._id,
            cardID: cardID,
            [key]: value
          })
        );
      });
    }
  };

  const cancelUpdateItem = () => {
    setEditorState(cloneDeep(item.content));
    setReadOnly(!readOnly);
  };

  const onPaste = event => {
    event.preventDefault();
    const text = event.clipboardData.getData("text");
    document.execCommand("insertText", false, text);
  };

  useOutsideEvent(itemTitle);

  const selectHandler = (e, itemID) => {
    if (e.target.dataset?.name === "selected") {
      if (!find(selectedItems, ["_id", itemID])) {
        dispatch(setSelectedItems([...selectedItems, item]));
      } else {
        dispatch(
          setSelectedItems(selectedItems.filter(item => item._id !== itemID))
        );
      }
    }
  };

  const setSelectedItemsEmpty = () => {
    dispatch(setSelectedItems([]));
  };

  useOutsideEventRowClick(selectedBox, setSelectedItemsEmpty);
  return (
    <Draggable
      key={item._id}
      draggableId={item._id}
      index={index}
      isDragDisabled={!readOnly}
    >
      {(provided, snapshot) => (
        <ListItem
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            dark
          )}
          className={classes.rowStyles}
        >
          {snapshot.isDragging && selectedItems.length ? (
            <Badge
              color="primary"
              badgeContent={
                find(selectedItems, ["_id", item._id])
                  ? selectedItems.length
                  : selectedItems.length + 1
              }
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
            ></Badge>
          ) : null}
          <Box
            className={classes.listItem}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={e => selectHandler(e, item._id)}
            data-name="selected"
            ref={selectedBox}
            {...provided.dragHandleProps}
          >
            <Box display="flex" alignItems="center" pr={1}>
              <ListItem
                button
                onClick={expandClick}
                className={classes.expandItem}
              >
                {open ? <ExpandMore /> : <ExpandLess />}
              </ListItem>
              <Box position="relative">
                <Typography
                  className={classes.itemTitle}
                  ref={itemTitle}
                  onMouseDown={mouseDownItemTitle}
                  onKeyPress={keyPressItemTitle}
                  onBlur={cardItemOnBlur}
                  onPaste={onPaste}
                >
                  {item.title}
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
            <Box>
              {readOnly ? (
                <IconButton
                  color="secondary"
                  variant="contained"
                  onClick={removeItemFromCard}
                >
                  <HighlightOffIcon />
                </IconButton>
              ) : null}
            </Box>
          </Box>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{
              width: "100%"
            }}
          >
            <Box p={2} pt={0}>
              {!readOnly ? (
                <div>
                  <Editor
                    editorState={editorState}
                    setEditorState={setEditorState}
                    onFocus={true}
                  />
                  <Box display="flex" justifyContent="flex-end" pt={2}>
                    <Button
                      className={classes.saveItemContentBtn}
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        postUpdateItem(true, "content", editorState)
                      }
                    >
                      Zapisz
                    </Button>
                    <Button
                      size="small"
                      onClick={cancelUpdateItem}
                      color="secondary"
                      variant="contained"
                    >
                      Anuluj
                    </Button>
                  </Box>
                </div>
              ) : editorState ? (
                <Paper
                  elevation={3}
                  className={classes.paper}
                  onClick={readOnlyHandler}
                >
                  {parse(editorState)}
                </Paper>
              ) : (
                <Button
                  className={classes.addContent}
                  variant="contained"
                  color="primary"
                  onClick={readOnlyHandler}
                >
                  Dodaj treść
                </Button>
              )}
            </Box>
          </Collapse>
        </ListItem>
      )}
    </Draggable>
  );
}

const getItemStyle = (isDragging, draggableStyle, dark) => ({
  // styles we need to apply on draggables
  padding: "0 0 0 3px",
  margin: "0 0 5px 0",

  ...(isDragging && {
    borderRadius: "5px",
    background: dark === "dark" ? "#807e7e" : "#c6c6c6"
  }),
  ...draggableStyle
});

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

function useOutsideEventRowClick(ref, setSelectedItemsEmpty) {
  function handleClickOutside(event) {
    if (
      ref.current.dataset?.name &&
      !ref.current.dataset?.name.includes(event.target.dataset?.name) &&
      event.target.parentNode.dataset?.name !== "selected"
    ) {
      setSelectedItemsEmpty();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

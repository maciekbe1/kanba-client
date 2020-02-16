import React, { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "actions/cardsActions";
import { setBackdrop } from "actions";
import { request } from "api/API";

import {
  EditorState,
  convertFromRaw,
  ContentState,
  convertToRaw
} from "draft-js";
import EditorContainer from "../Editor/EditorContainer";

import {
  Typography,
  ListItem,
  Box,
  IconButton,
  Paper,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ArrowRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Done, Clear } from "@material-ui/icons";

import Cookie from "js-cookie";
import { cloneDeep } from "lodash";

export default function DraggableItem({ item, index, cardID }) {
  const [readOnly, setReadOnly] = useState(true);
  const useStyles = makeStyles(theme => ({
    columnStyles: {
      flex: " 0 0 100%",
      maxWidth: "100%",
      position: "relative"
    },
    rowStyles: {
      display: "flex",
      flexWrap: "wrap",
      padding: "10px 0px 10px 3px",
      "&:hover": {
        background: theme.palette.type === "dark" ? "#616161" : "#E0E0E0",
        borderRadius: "5px",
        color: theme.palette.type === "dark" ? "#fff" : "#212121"
      }
    },
    expandItem: {
      padding: "5px",
      borderRadius: "50%",
      width: "auto"
    },
    paper: {
      padding: "5px",
      "&:hover": {
        cursor: readOnly ? "pointer" : "text"
      }
    },
    success: {
      backgroundColor: theme.palette.success.main,
      color: "#fff",
      textTransform: "none",
      float: "right",
      "&:hover": { backgroundColor: theme.palette.success.hover }
    },
    itemTitle: {
      wordBreak: "break-all",
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
    }
  }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rawContent, setRawContent] = useState(
    JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  );
  const [editable, setEditable] = useState(false);
  const [titleText, setTitleText] = useState();
  const itemTitle = useRef();

  useEffect(() => {
    const rawEditorData = item.content;
    if (rawEditorData !== null && rawEditorData !== "") {
      const contentState = convertFromRaw(JSON.parse(rawEditorData));
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText("@Brak treści")
        )
      );
    }
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

  const handleClick = () => {
    setOpen(!open);
  };
  const readOnlyHandler = () => {
    setReadOnly(false);
  };
  const removeItemFromCard = () => {
    dispatch(setBackdrop(true));
    request(
      `${process.env.REACT_APP_SERVER}/api/cards/remove-card-item`,
      {
        cardID,
        itemID: item._id
      },
      Cookie.get("token")
    )
      .then(() => {
        dispatch(
          removeItem({
            itemID: item._id,
            cardID: cardID
          })
        );
        dispatch(setBackdrop(false));
      })
      .catch(err => {
        console.log(err);
        dispatch(setBackdrop(false));
      });
  };

  const postUpdateItem = (readOnlyValue, key, value) => {
    if (readOnlyValue !== null) {
      setReadOnly(readOnlyValue);
    }
    if (
      rawContent !== cloneDeep(item.content) ||
      titleText !== cloneDeep(item.title)
    ) {
      request(
        `${process.env.REACT_APP_SERVER}/api/cards/update-item`,
        {
          cardID,
          itemID: item._id,
          item: { [key]: value } //rawContent || titleText
        },
        Cookie.get("token")
      ).then(() => {
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

  useOutsideEvent(itemTitle);

  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
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
            <Box display="flex" alignItems="center" pr={1}>
              <ListItem
                button
                onClick={handleClick}
                className={classes.expandItem}
              >
                {open ? <ExpandMore /> : <ExpandLess />}
              </ListItem>
              <Box position="relative">
                <Typography
                  className={classes.itemTitle}
                  ref={itemTitle}
                  onMouseDown={e => mouseDownItemTitle(e)}
                  onKeyPress={e => keyPressItemTitle(e)}
                  onBlur={e => cardItemOnBlur(e)}
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
              <IconButton
                color="secondary"
                variant="contained"
                onClick={removeItemFromCard}
              >
                <HighlightOffIcon />
              </IconButton>
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
            <Box
              p={2}
              pt={0}
              className={classes.columnStyles}
              style={{
                width: "100%"
              }}
            >
              <Paper
                elevation={3}
                className={classes.paper}
                onClick={readOnlyHandler}
              >
                <EditorContainer
                  toolbarHidden={readOnly}
                  editorState={editorState}
                  readOnly={readOnly}
                  setEditorState={setEditorState}
                  setRawContent={setRawContent}
                  setOnBlur={postUpdateItem}
                />
              </Paper>
            </Box>
            {!readOnly ? (
              <Box pr={2}>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.success}
                >
                  Zapisz
                </Button>
              </Box>
            ) : null}
          </Collapse>
        </ListItem>
      )}
    </Draggable>
  );
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    borderRadius: "5px",
    background: "#807e7e"
  })
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

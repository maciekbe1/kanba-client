import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useDispatch } from "react-redux";
import { removeItem } from "actions/cardsActions";
import { setBackdrop } from "actions";
import { request } from "api/API";

import { Editor, EditorState, convertFromRaw } from "draft-js";

import { Typography, ListItem, Box, IconButton, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ArrowRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import Cookie from "js-cookie";

export default function DraggableItem({ item, index, cardID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    const rawEditorData = item.content;
    if (rawEditorData !== null && rawEditorData !== "") {
      const contentState = convertFromRaw(JSON.parse(rawEditorData));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [item]);
  const handleClick = () => {
    setOpen(!open);
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
              <Typography style={{ wordBreak: "break-all" }}>
                {item.title}
              </Typography>
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box p={2} pt={0} className={classes.columnStyles}>
              <List component="div" disablePadding>
                {/* <ListItemText>{item.content}</ListItemText> */}
                <Editor editorState={editorState} readOnly={true} />
              </List>
            </Box>
          </Collapse>
        </ListItem>
      )}
    </Draggable>
  );
}

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
  }
}));
const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    borderRadius: "5px",
    background: "#807e7e"
  })
});

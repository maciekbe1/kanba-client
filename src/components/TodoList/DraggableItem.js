import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Typography, ListItem, Box, Button, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { removeItem } from "actions/cardsActions";
import { setBackdrop } from "actions";
import { request } from "api/API";
import Cookie from "js-cookie";

import ExpandLess from "@material-ui/icons/ArrowRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  columnStyles: {
    flex: " 0 0 100%",
    maxWidth: "100%",
    position: "relative"
  },
  rowStyles: {
    display: "flex",
    flexWrap: "wrap",
    padding: "10px 8px 10px 3px",
    "&:hover": {
      background: "#616161",
      borderRadius: "5px",
      color: "#fff"
    }
  },
  expandItem: {
    padding: "5px",
    borderRadius: "50%"
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
export default function DraggableItem({ item, index, cardID }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

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
            <Box display="flex" alignItems="center">
              <ListItem
                button
                onClick={handleClick}
                className={classes.expandItem}
              >
                {open ? <ExpandMore /> : <ExpandLess />}
              </ListItem>
              <Typography>{item.title}</Typography>
            </Box>
            <Button
              color="secondary"
              variant="contained"
              onClick={removeItemFromCard}
            >
              Usuń
            </Button>
          </Box>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemText>{item.content}</ListItemText>
            </List>
          </Collapse>
        </ListItem>
      )}
    </Draggable>
  );
}

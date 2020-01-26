import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Typography, ListItem, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { removeItem } from "actions/cardsActions";
import { setBackdrop } from "actions";
import { request } from "api/API";
import Cookie from "js-cookie";
const useStyles = makeStyles(theme => ({
  columnStyles: {
    flex: " 0 0 100%",
    maxWidth: "100%",
    position: "relative"
  },
  rowStyles: {
    display: "flex",
    flexWrap: "wrap",
    "&:hover": {
      background: "#e5e5e5",
      borderRadius: "5px",
      color: "#333232"
    }
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
  useEffect(() => {
    dispatch(setBackdrop(false));
  }, [dispatch]);
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
            <Typography>{item.title}</Typography>
            <Button
              color="secondary"
              variant="outlined"
              onClick={removeItemFromCard}
            >
              Usuń
            </Button>
          </Box>
        </ListItem>
      )}
    </Draggable>
  );
}

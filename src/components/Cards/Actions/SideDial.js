import React from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import * as CardsService from "services/CardsService";
import * as CardsHelper from "helper/CardsHelper";
import { Typography } from "@material-ui/core";

import { setCards, setSelectedItems } from "actions/cardsActions";
export default function SideDial({ onCreateCard, onRemoveItems }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const cards = useSelector((state) => state.cardsReducer.cardsState);

  const selectedItems = useSelector(
    (state) => state.cardsReducer.selectedItems
  );
  const removeAction = () => {
    onRemoveItems({
      remove: () => {
        const newCards = CardsHelper.removeSelectedItems(cards, selectedItems);
        const selected = selectedItems.map((item) => {
          return {
            itemID: item._id,
            cardID: item.cardID
          };
        });
        CardsService.removeSelectedItems(token, selected);
        dispatch(setCards({ cards: newCards }));
        dispatch(setSelectedItems([]));
      },
      dialogTitle: "Czy chcesz usunąć zadania?",
      dialogText: selectedItems.map((item, index) => (
        <Typography key={index}>{item.title}</Typography>
      ))
    });
  };
  return (
    <div className={classes.dialWrapper}>
      {!selectedItems.length ? (
        <SpeedDial
          ariaLabel="create"
          onClick={onCreateCard}
          className={`${classes.speedDial} ${classes.speedDialAdd}`}
          open={false}
          icon={<SpeedDialIcon />}
        />
      ) : (
        <SpeedDial
          ariaLabel="remove"
          onClick={removeAction}
          className={`${classes.speedDial} ${classes.speedDialRemove}`}
          open={false}
          data-name="selected"
          icon={<DeleteForeverIcon data-name="selected" edge="end" />}
        />
      )}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  dialWrapper: {
    position: "fixed",
    marginTop: theme.spacing(3),
    right: 0,
    bottom: 0,
    zIndex: 2
  },
  speedDial: {
    position: "absolute",
    opacity: "0.4",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2)
    },
    "&:hover": {
      opacity: 1
    }
  },
  speedDialAdd: {
    "&.MuiFab-label": {
      width: "auto"
    }
  },
  speedDialRemove: {
    "&.MuiSpeedDial-root .MuiFab-primary": {
      backgroundColor: theme.palette.error.main
    },
    "&.MuiSpeedDial-root .MuiSvgIcon-root": {
      width: "100%",
      height: "53px",
      padding: "14px"
    }
  }
}));

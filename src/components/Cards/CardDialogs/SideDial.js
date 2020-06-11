import React, { useState } from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import * as CardsService from "services/CardsService";
import * as CardsHelper from "helper/CardsHelper";
import { Typography } from "@material-ui/core";
import SimpleModal from "components/Utils/Modal";
import {
  setCards,
  setSelectedItems,
  createCard,
  closeCardContent
} from "store/actions/cardsActions";
import CreateCard from "components/Cards/CardDialogs/CreateCardDialog";

export default function SideDial({ onRemoveItems }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cardsReducer.cardsState);
  const userID = useSelector((state) => state.authReducer.data._id);
  const content = useSelector((state) => state.cardsReducer.itemContentData);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState();

  const selectedItems = useSelector(
    (state) => state.cardsReducer.selectedItems
  );
  const removeAction = () => {
    onRemoveItems({
      remove: () => {
        const newCards = CardsHelper.removeSelectedItems(cards, selectedItems);
        const selected = selectedItems.map((item) => {
          if (item._id === content?._id) {
            dispatch(closeCardContent());
          }
          return {
            itemID: item._id,
            cardID: item.cardID
          };
        });
        CardsService.removeSelectedItems(selected);
        dispatch(setCards({ cards: newCards }));
        dispatch(setSelectedItems([]));
      },
      dialogTitle: "Czy chcesz usunąć zadania?",
      dialogText: selectedItems.map((item, index) => (
        <Typography key={index}>{item.title}</Typography>
      ))
    });
  };

  const createCardHandle = async () => {
    return await CardsService.createCard(data)
      .then((res) => {
        dispatch(createCard(res.data));
        return true;
      })
      .catch((error) => {
        setError(true);
        setMessage(error.response.data);
        return false;
      });
  };
  return (
    <div className={classes.dialWrapper}>
      {!selectedItems.length ? (
        <SimpleModal
          onDialogAccept={createCardHandle}
          error={error}
          setError={setError}
          activator={({ setOpen }) => (
            <SpeedDial
              ariaLabel="create"
              onClick={() => setOpen(true)}
              className={`${classes.speedDial} ${classes.speedDialAdd}`}
              open={false}
              icon={<SpeedDialIcon />}
            />
          )}
        >
          <CreateCard
            error={error}
            setData={setData}
            message={message}
            user={userID}
          />
        </SimpleModal>
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

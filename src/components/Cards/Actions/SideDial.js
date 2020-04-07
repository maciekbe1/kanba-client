import React from "components/Cards/Actions/node_modules/react";
import SpeedDialIcon from "components/Cards/Actions/node_modules/@material-ui/lab/SpeedDialIcon";
import DeleteForeverIcon from "components/Cards/Actions/node_modules/@material-ui/icons/DeleteForever";
import { makeStyles } from "components/Cards/Actions/node_modules/@material-ui/core/styles";

export default function SideDial({
  onCreateCard,
  onRemoveItems,
  selectedItems
}) {
  const classes = useStyles();

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
          onClick={onRemoveItems}
          className={`${classes.speedDial} ${classes.speedDialRemove}`}
          open={false}
          data-name="selected"
          icon={<DeleteForeverIcon data-name="selected" edge="end" />}
        />
      )}
    </div>
  );
}
const useStyles = makeStyles(theme => ({
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

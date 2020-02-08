import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Grid } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

export default function SimpleModal({ openProps, modalHandler, children }) {
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    modalHandler();
  };
  const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: "fit-content",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 2, 2)
    }
  }));
  const classes = useStyles();

  return (
    <Modal open={openProps} onClose={handleClose}>
      <Grid
        container
        display="flex"
        justify="center"
        style={modalStyle}
        className={classes.paper}
      >
        <Grid item lg={10} xs={10}>
          {children}
        </Grid>
      </Grid>
    </Modal>
  );
}

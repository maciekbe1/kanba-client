import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top - 10}%`,
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
      width: "auto",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }));
  const classes = useStyles();

  return (
    <Modal open={openProps} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
        {children}
      </div>
    </Modal>
  );
}

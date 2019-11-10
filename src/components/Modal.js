import React, { useEffect } from "react";
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

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

export default function SimpleModal({ openProps, loginHandleOpen, children }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(openProps);
    }, [openProps]);

    const handleClose = () => {
        setOpen(!openProps);
        loginHandleOpen();
    };

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                    {children}
                </div>
            </Modal>
        </div>
    );
}

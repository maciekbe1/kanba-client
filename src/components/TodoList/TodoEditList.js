import React from "react";
import { Button, Typography } from "@material-ui/core";

export default function TodoEditList({ modalHandler, listData }) {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                {listData.title}
            </Typography>
            <Button onClick={modalHandler} variant="outlined" color="secondary">
                Cancel
            </Button>
        </div>
    );
}

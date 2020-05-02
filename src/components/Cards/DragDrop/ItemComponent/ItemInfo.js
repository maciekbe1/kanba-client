import React from "react";
import ItemHelper from "helper/ItemHelper";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { isNil } from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
export default function ItemInfo({ status, priority }) {
  const useStyles = makeStyles((theme) => ({
    avatar: {
      color: "#fff",
      width: theme.spacing(3),
      height: theme.spacing(3)
    },
    status: {
      backgroundColor: ItemHelper.statusButtonStyler(status).color.background,
      marginLeft: theme.spacing(1)
    },
    priority: {
      backgroundColor: ItemHelper.priorityButtonStyler(priority).color
        .background
    }
  }));
  const classes = useStyles();

  return (
    <div className="item-info-container">
      {isNil(priority) || priority.label === "Brak" ? null : (
        <Tooltip title={`Priorytet: ${priority.label}`}>
          <Avatar className={`${classes.priority} ${classes.avatar}`}>
            {ItemHelper.priorityButtonStyler(priority).icon}
          </Avatar>
        </Tooltip>
      )}
      {isNil(status) || status.label === "Brak" ? null : (
        <Tooltip title={`Status: ${status.label}`}>
          <Avatar className={`${classes.status} ${classes.avatar}`}>
            {ItemHelper.statusButtonStyler(status).icon}
          </Avatar>
        </Tooltip>
      )}
    </div>
  );
}

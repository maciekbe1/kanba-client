import React from "react";
import ItemHelper from "helper/ItemHelper";
import Avatar from "@material-ui/core/Avatar";
import { isNil } from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
export default function ItemInfo({ status, priority }) {
  const statusStyles = {
    backgroundColor: ItemHelper.statusButtonStyler(status)?.color?.background,
    marginLeft: "8px"
  };
  const priorityStyles = {
    backgroundColor: ItemHelper.priorityButtonStyler(priority)?.color
      ?.background
  };

  return (
    <div className="item-info-container">
      {isNil(priority) || priority.label === "Brak" ? null : (
        <Tooltip title={`Priorytet: ${priority.label}`}>
          <Avatar className="item-icon" style={priorityStyles}>
            {ItemHelper.priorityButtonStyler(priority)?.icon}
          </Avatar>
        </Tooltip>
      )}
      {isNil(status) || status.label === "Brak" ? null : (
        <Tooltip title={`Status: ${status.label}`}>
          <Avatar className="item-icon" style={statusStyles}>
            {ItemHelper.statusButtonStyler(status)?.icon}
          </Avatar>
        </Tooltip>
      )}
    </div>
  );
}

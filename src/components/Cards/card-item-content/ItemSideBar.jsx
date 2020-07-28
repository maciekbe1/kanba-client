import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import moment from "moment";
import { STATUSES, PRIORITES } from "constants/cards";

import PopoverMenu from "components/Cards/card-item-content/ItemPopoverMenu";
import ItemHelper from "helper/ItemHelper";
import ItemTags from "components/Cards/card-item-content/ItemTags";

export default function ItemSideBar({
  status,
  date,
  priority,
  onItemChange,
  tags
}) {
  return (
    <div style={{ width: "204px" }}>
      <List disablePadding>
        <ListItem style={{ textAlign: "right" }} divider disableGutters>
          <ListItemText secondary="Utworzone" />
          <ListItemText primary={moment(date).format("DD/MM/YYYY")} inset />
        </ListItem>

        <ListItem divider disableGutters>
          <ListItemText secondary="Status" />
          <PopoverMenu
            array={STATUSES}
            elem={ItemHelper.statusButtonStyler(status)}
            onItemChange={onItemChange}
            type="status"
          />
        </ListItem>

        <ListItem divider disableGutters>
          <ListItemText secondary="Priorytet" />
          <PopoverMenu
            array={PRIORITES}
            elem={ItemHelper.priorityButtonStyler(priority)}
            onItemChange={onItemChange}
            type="priority"
          />
        </ListItem>
        <ListItem disableGutters>
          <ItemTags tags={tags || []} />
        </ListItem>
      </List>
    </div>
  );
}

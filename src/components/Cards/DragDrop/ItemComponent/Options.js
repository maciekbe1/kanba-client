import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import moment from "moment";
import { STATUSES, PRIORITES } from "constants/index";

import PopoverMenu from "components/Cards/DragDrop/ItemComponent/PopoverMenu";
import ItemHelper from "helper/ItemHelper";

export default function Options({ status, date, priority, onItemChange }) {
  return (
    <div style={{ margin: "0 auto" }}>
      <List disablePadding>
        <ListItem style={{ textAlign: "right" }} divider disableGutters>
          <ListItemText secondary="Utworzone" />
          <ListItemText primary={moment(date).format("DD/MM/YYYY")} inset />
        </ListItem>

        <ListItem divider disableGutters>
          <ListItemText secondary="Status" />
          <PopoverMenu
            array={STATUSES}
            elem={ItemHelper.statusStyler(status)}
            onItemChange={onItemChange}
            type="status"
          />
        </ListItem>

        <ListItem divider disableGutters>
          <ListItemText secondary="Priorytet" />
          <PopoverMenu
            array={PRIORITES}
            elem={priority}
            onItemChange={onItemChange}
            type="priority"
          />
        </ListItem>
      </List>
    </div>
  );
}

import React, { useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import StatusButton from "components/Cards/DragDrop/ItemComponent/StatusButton";
import ItemHelper from "helper/ItemHelper";
import { isNil } from "lodash";

export default function PopoverMenu({ array, elem, onItemChange, type }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [element, setElement] = useState(
    isNil(elem) ? { value: 0, label: "Brak" } : elem
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const elementChange = (element) => {
    onItemChange(element, type);
    setElement(element);
    setAnchorEl(null);
  };

  return (
    <div>
      <div onClick={handleClick}>
        <StatusButton
          element={
            type === "status" ? ItemHelper.statusStyler(element) : element
          }
        >
          {element.label}
        </StatusButton>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => elementChange(element)}
      >
        <MenuItem onClick={() => elementChange({ value: 0, label: "Brak" })}>
          Brak
        </MenuItem>
        {array.map((element) => {
          return (
            <MenuItem
              key={element.value}
              onClick={() => elementChange(element)}
            >
              {element.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

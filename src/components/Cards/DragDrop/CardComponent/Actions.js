import React from "react";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

import { CARD_COLLAPSED, CARD_EXPANDED } from "constants/index";
export default function Actions({
  expand,
  listLength,
  onRemoveCard,
  onToggle
}) {
  const editorIsOpen = false;
  const onEditorHandler = () => {};
  return (
    <Box display="flex">
      <Tooltip title={expand ? CARD_COLLAPSED : CARD_EXPANDED} placement="top">
        <IconButton
          aria-label={expand ? "expandLess" : "expandMore"}
          onClick={onToggle}
        >
          <Badge
            color="primary"
            badgeContent={listLength}
            max={99}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            {expand ? <ExpandLess /> : <ExpandMore />}
          </Badge>
        </IconButton>
      </Tooltip>
      {editorIsOpen ? (
        <Tooltip title="Zamknij okno" placement="top">
          <IconButton aria-label="close" onClick={onEditorHandler}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Dodaj pozycje do karty" placement="top">
          <IconButton aria-label="add" onClick={onEditorHandler}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Usuń kartę" placement="top">
        <IconButton aria-label="delete" onClick={onRemoveCard}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

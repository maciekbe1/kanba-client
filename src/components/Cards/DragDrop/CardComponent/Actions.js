import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateItem from "components/Cards/Actions/CreateItem";
import SimpleModal from "components/Utils/Modal";
import * as CardsService from "services/CardsService";
import { useSelector, useDispatch } from "react-redux";
import { createItem } from "actions/cardsActions";
import { CARD_COLLAPSED, CARD_EXPANDED } from "constants/index";
export default function Actions({
  expand,
  listLength,
  onRemoveCard,
  onToggle,
  cardID
}) {
  const token = useSelector((state) => state.authReducer.token);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const createCardItem = () => {
    CardsService.createItem(cardID, data, token)
      .then((res) => {
        dispatch(
          createItem({
            cardID: cardID,
            values: {
              title: data.title,
              content: data.content,
              cardID: cardID,
              allert: data.allert,
              priority: data.priority
            },
            itemID: res.data.id
          })
        );
      })
      .catch((error) => {
        setError(true);
        setMessage(error.response.data);
      });
  };

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

      <SimpleModal
        onDialogAccept={createCardItem}
        error={error}
        setError={setError}
        activator={({ setOpen }) => (
          <Tooltip title="Dodaj pozycje do karty" placement="top">
            <IconButton aria-label="add" onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      >
        <CreateItem error={error} setData={setData} message={message} />
      </SimpleModal>

      <Tooltip title="Usuń kartę" placement="top">
        <IconButton aria-label="delete" onClick={onRemoveCard}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

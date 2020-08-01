import React, { useState } from "react";

import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateItem from "components/Cards/card-dialogs/CreateItemDialog";
import SimpleModal from "components/Utils/Modal";
import * as CardsService from "services/CardsService";
import { useDispatch } from "react-redux";
import { createItem } from "store/actions/cardsActions";
import { CARD_COLLAPSED, CARD_EXPANDED } from "constants/cards";

interface Props {
  expand: boolean;
  listLength: number;
  onRemoveCard: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  cardID: string;
}

export default function Actions({
  expand,
  listLength,
  onRemoveCard,
  onToggle,
  cardID
}: Props) {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const createCardItem = async () => {
    return await CardsService.createItem(cardID, data)
      .then((res) => {
        dispatch(createItem(res.data.item));
        return true;
      })
      .catch((error) => {
        setError(true);
        setMessage(error.response.data);
        return false;
      });
  };

  return (
    <div className="card-component-navbar-actions">
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
        setError={setError}
        activator={({ setOpen }: any) => (
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
    </div>
  );
}

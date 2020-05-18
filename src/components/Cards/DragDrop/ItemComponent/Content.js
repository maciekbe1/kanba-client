import React, { useState } from "react";
import Options from "components/Cards/DragDrop/ItemComponent/Options";
import Card from "@material-ui/core/Card";
import Description from "components/Cards/DragDrop/ItemComponent/Description";

import { Resizable } from "re-resizable";
import Title from "components/Common/Title";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Attachments from "components/Cards/DragDrop/ItemComponent/Attachments";
import { useSelector, useDispatch } from "react-redux";
import * as CardsService from "services/CardsService";
import { updateItem, closeCardContent } from "actions/cardsActions";

export default function Content() {
  const isOpen = useSelector((state) => state.cardsReducer.isContentOpen);
  return isOpen ? <ContentView /> : null;
}

function ContentView() {
  const [width, setWidth] = useState();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cardsReducer.itemContentData);
  const token = useSelector((state) => state.authReducer.token);

  const onItemChange = (element, type) => {
    CardsService.updateItem(item.cardID, item._id, type, element, token);
    dispatch(
      updateItem({
        itemID: item._id,
        cardID: item.cardID,
        [type]: element
      })
    );
    if (type === "title") {
      const elem = document.querySelector(
        `.card-item[data-rbd-draggable-id="${item._id}"] p`
      );
      elem.textContent = element;
    }
  };

  const onClose = () => {
    dispatch(closeCardContent());
  };

  return (
    <Resizable
      defaultSize={{
        width: "60%"
      }}
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: true,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
      minWidth="50%"
      maxWidth="80%"
      className="card-item-content-wraper"
      onResizeStop={(e, direction, ref, d) => {
        setWidth(width + d.width);
      }}
    >
      <Card className="card-item-content">
        <div className="card-item-title-container">
          <Title title={item.title} onTitleChange={onItemChange} />
          <Tooltip title="Zamknij" placement="top">
            <IconButton variant="contained" color="default" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex space-between">
          <Attachments />
          <Options
            date={item.date}
            status={item.status}
            priority={item.priority}
            onItemChange={onItemChange}
          />
        </div>
        <Description
          content={item.content}
          cardID={item.cardID}
          itemID={item._id}
        />
      </Card>
    </Resizable>
  );
}

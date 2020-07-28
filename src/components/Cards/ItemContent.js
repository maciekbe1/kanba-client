import React, { useState } from "react";

import { Resizable } from "re-resizable";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { useSelector, useDispatch } from "react-redux";
import { updateItem, closeItemContent } from "store/actions/cardsActions";
import * as CardsService from "services/CardsService";

import Title from "components/Common/Title";
import Description from "components/Cards/card-item-content/ItemDescription";
import Attachments from "components/Cards/card-item-content/ItemAttachments";
import ItemSiteBar from "components/Cards/card-item-content/ItemSideBar";
export default function ItemContent() {
  const isOpen = useSelector((state) => state.cardsReducer.isContentOpen);
  return isOpen ? <ContentView /> : null;
}

function ContentView() {
  const [width, setWidth] = useState();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cardsReducer.itemContentData);

  const onItemChange = (element, type) => {
    CardsService.updateItem(item._id, type, element);
    dispatch(
      updateItem({
        itemID: item._id,
        [type]: element
      })
    );
  };

  const onClose = () => {
    dispatch(closeItemContent());
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
          <Attachments itemID={item._id} attachments={item.attachments} />
          <ItemSiteBar
            date={item.date}
            status={item.status}
            priority={item.priority}
            onItemChange={onItemChange}
            tags={item.labels || null}
          />
        </div>
        <Description content={item.content} itemID={item._id} />
      </Card>
    </Resizable>
  );
}

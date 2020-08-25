import React, { useState } from "react";
import { Resizable } from "re-resizable";
import Card from "@material-ui/core/Card";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { List, ListItemText } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  updateItem,
  closeItemContent,
  addAttachment
} from "store/actions/cardsActions";

import * as CardsService from "services/CardsService";

import Title from "components/Common/Title";
import Description from "components/Cards/content-item/ItemDescription";
import Attachments from "components/Cards/content-item/ItemAttachments";
import ItemSiteBar from "components/Cards/content-item/ItemSideBar";
import NewContent from "./content-item/NewContent";
import axios from "axios";

export default function ItemContent() {
  const isContentOpen = useSelector(
    (state: any) => state.cardsReducer.isContentOpen
  );
  const isNewContentOpen = useSelector(
    (state: any) => state.cardsReducer.isNewContentOpen
  );
  return isContentOpen ? (
    <ContentView />
  ) : isNewContentOpen ? (
    <NewContent />
  ) : null;
}

function ContentView() {
  const [width, setWidth] = useState(0);
  const dispatch = useDispatch();
  const item = useSelector((state: any) => state.cardsReducer.itemContentData);

  const onItemChange = (element: any, type: string) => {
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

  const saveContent = (editorContent: string) => {
    CardsService.updateItem(item._id, "content", editorContent);
    dispatch(
      updateItem({
        itemID: item._id,
        content: editorContent
      })
    );
  };

  const postAttachments = (acceptedFiles: Array<any>) => {
    let fileArray: any[] = [];
    acceptedFiles.forEach((file: any) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("itemID", item._id);
      fileArray.push(formData);
    });
    axios.all(
      fileArray.map(async (file) => {
        return await CardsService.addFileToItem(file).then((res) => {
          dispatch(
            addAttachment({
              itemID: res.data.itemID,
              file: res.data.file
            })
          );
        });
      })
    );
  };

  return (
    <Resizable
      defaultSize={{
        width: "60%",
        height: "auto"
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
      className="item-content-wraper"
      onResizeStop={(e, direction, ref, d) => {
        setWidth(width + d.width);
      }}
    >
      <Card className="item-content-card">
        <div className="item-content-title">
          <List>
            <ListItemText
              primary={
                <Title title={item.title} onTitleChange={onItemChange} />
              }
              secondary={item.cardTitle}
            />
          </List>
          <Tooltip title="Close" placement="top">
            <IconButton color="default" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex space-between">
          <Attachments
            itemID={item._id}
            attachments={item.attachments}
            postAttachments={postAttachments}
          />
          <ItemSiteBar
            date={item.date}
            status={item.status}
            priority={item.priority}
            onItemChange={onItemChange}
            tags={item.labels || null}
          />
        </div>
        <Description content={item.content} onSaveContent={saveContent} />
      </Card>
    </Resizable>
  );
}

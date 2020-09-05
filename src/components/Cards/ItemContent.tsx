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
  addAttachment,
  removeAttachment
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

  const onSaveDescription = (editorValue: string) => {
    CardsService.updateItem(item._id, "description", editorValue);
    dispatch(
      updateItem({
        itemID: item._id,
        description: editorValue
      })
    );
  };

  const onPostAttachments = (acceptedFiles: Array<any>) => {
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
  const onRemoveAttachment = (index: number) => {
    const file = item.attachments[index];
    CardsService.removeFileFromItem(file.storageName, item._id, file._id).then(
      () => {
        dispatch(removeAttachment({ itemID: item._id, index }));
      }
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
            attachments={item.attachments}
            onPostAttachments={onPostAttachments}
            onRemoveAttachment={onRemoveAttachment}
            isNew={false}
          />
          <ItemSiteBar
            date={item.date}
            status={item.status}
            priority={item.priority}
            onItemChange={onItemChange}
            tags={item.labels || null}
          />
        </div>
        <Description
          description={item.description}
          onSaveDescription={onSaveDescription}
        />
      </Card>
    </Resizable>
  );
}

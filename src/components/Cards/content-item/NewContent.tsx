import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateNewItem,
  cancelNewContent,
  createItem,
  addAttachment,
  openItemContent
} from "store/actions/cardsActions";

import axios from "axios";

import { Resizable } from "re-resizable";

import Card from "@material-ui/core/Card";
import { List, ListItemText, Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import * as CardsService from "services/CardsService";

import Title from "components/Common/Title";
import Description from "components/Cards/content-item/ItemDescription";
import Attachments from "components/Cards/content-item/ItemAttachments";
import ItemSiteBar from "components/Cards/content-item/ItemSideBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff"
    }
  })
);
export default function NewContent() {
  const { itemContentData } = useSelector((state: any) => state.cardsReducer);
  const classes = useStyles();
  const [width, setWidth] = useState(0);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(cancelNewContent());
  };

  const onItemChange = (element: any, type: any) => {
    dispatch(
      updateNewItem({
        [type]: element
      })
    );
  };

  const onSaveDescription = (editorValue: any) => {
    dispatch(
      updateNewItem({
        description: editorValue
      })
    );
  };

  const createCardItem = async () => {
    setOpen(true);
    return await CardsService.createItem(
      itemContentData.cardID,
      itemContentData
    )
      .then((responseItem) => {
        dispatch(createItem(responseItem.data.item));

        let array: Array<any> = [];
        itemContentData.attachments.forEach((file: any) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("itemID", responseItem.data.item._id);
          array.push(formData);
        });

        axios
          .all(
            array.map(async (file) => {
              return await CardsService.addFileToItem(file).then((res) => {
                dispatch(
                  addAttachment({
                    itemID: res.data.itemID,
                    file: res.data.file
                  })
                );
              });
            })
          )
          .then(() => {
            setOpen(false);
            onClose();
            dispatch(openItemContent({ itemID: responseItem.data.item._id }));
          });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const onPostAttachments = (acceptedFiles: Array<any>) => {
    dispatch(
      updateNewItem({
        attachments: acceptedFiles
      })
    );
  };

  const onRemoveAttachment = (index: number) => {
    const newAttachments = itemContentData.attachments.filter(
      (item: any, i: number) => index !== i
    );
    dispatch(
      updateNewItem({
        attachments: newAttachments
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
                <Title
                  title={itemContentData.title}
                  onTitleChange={onItemChange}
                  isDefaultEdit={true}
                />
              }
              secondary={itemContentData.cardTitle}
            />
          </List>
          <div>
            <Button onClick={createCardItem}>save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
        <div className="flex space-between">
          <Attachments
            attachments={itemContentData.attachments}
            onPostAttachments={onPostAttachments}
            onRemoveAttachment={onRemoveAttachment}
            isNew={true}
          />

          <ItemSiteBar
            date={itemContentData.date}
            status={itemContentData.status}
            priority={itemContentData.priority}
            onItemChange={onItemChange}
            tags={itemContentData.labels || null}
          />
        </div>
        <Description
          description={itemContentData.description}
          onSaveDescription={onSaveDescription}
        />
      </Card>
      <Backdrop open={open} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Resizable>
  );
}

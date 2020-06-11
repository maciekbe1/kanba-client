import React, { useState } from "react";
import Options from "components/Cards/Content/Options";
import Card from "@material-ui/core/Card";
import Description from "components/Cards/Content/Description";

import { Resizable } from "re-resizable";
import Title from "components/Common/Title";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Attachments from "components/Cards/Content/Attachments";
import { useSelector, useDispatch } from "react-redux";
import * as CardsService from "services/CardsService";
import {
  updateItem,
  closeCardContent,
  addAttachment,
  removeAttachment
} from "store/actions/cardsActions";

export default function Content() {
  const isOpen = useSelector((state) => state.cardsReducer.isContentOpen);
  return isOpen ? <ContentView /> : null;
}

function ContentView() {
  const [width, setWidth] = useState();
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cardsReducer.itemContentData);

  const onItemChange = (element, type) => {
    CardsService.updateItem(item.cardID, item._id, type, element);
    dispatch(
      updateItem({
        itemID: item._id,
        cardID: item.cardID,
        [type]: element
      })
    );
  };

  const onClose = () => {
    dispatch(closeCardContent());
  };
  const onUpload = async (e, input) => {
    const upload = e.target.files[0];
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", upload);
    formData.append("cardID", item.cardID);
    formData.append("itemID", item._id);
    setPending(true);
    CardsService.uploadFileToItem(formData)
      .then((res) => {
        dispatch(
          addAttachment({
            cardID: item.cardID,
            itemID: item._id,
            file: res.data
          })
        );
        setPending(false);
        input.current.value = null;
      })
      .catch((err) => {
        input.current.value = null;
        setPending(false);
      });
  };
  const onRemove = (fileID, fileName) => {
    CardsService.removeFileFromItem(fileName, item.cardID, item._id, fileID)
      .then((res) => {
        dispatch(
          removeAttachment({ cardID: item.cardID, itemID: item._id, fileID })
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Attachments
            onUpload={onUpload}
            onRemove={onRemove}
            attachments={item.attachments}
            pending={pending}
          />
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

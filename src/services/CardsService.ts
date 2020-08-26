import { request, sendFile } from "api/API";
import store from "store/store";

export const getCards = (userID: string) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/get-user-cards`,
    { userID },
    store.getState().authReducer.token
  );
};

export const createCard = (data: any) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/create-card`,
    data,
    store.getState().authReducer.token
  );
};

export const createItem = (cardID: string, item: any) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/create-card-item`,
    { cardID, item },
    store.getState().authReducer.token
  );
};

export const updateCard = (
  card: any,
  cardID: string,
  type: string,
  name: string
) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-card`,
    {
      card: { [name]: card[name] },
      cardID,
      type
    },
    store.getState().authReducer.token
  );
};

export const cardItemChange = (result: any) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-card`,
    {
      card: {
        destination: result.destination.index,
        itemID: result.draggableId,
        cardID: result.destination.droppableId
      },
      type: "inside_list"
    },
    store.getState().authReducer.token
  );
};
export const updateItem = (itemID: string, key: string, value: any) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-item`,
    {
      itemID,
      item: { [key]: value }
    },
    store.getState().authReducer.token
  );
};
export const cardItemShared = (start: any, end: any, result: any) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-card`,
    {
      card: {
        start: start._id,
        end: end._id,
        destination: result.destination.index,
        draggableId: result.draggableId
      },
      type: "all_lists"
    },
    store.getState().authReducer.token
  );
};

export const removeCardItem = (cardID: string, itemID: string) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-card-item`,
    {
      cardID,
      itemID
    },
    store.getState().authReducer.token
  );
};

export const updateManyItems = (
  destination: string,
  selectedItems: Array<any>,
  position: number
) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-many-items`,
    {
      destination,
      selectedItems,
      position
    },
    store.getState().authReducer.token
  );
};

export const removeSelectedItems = (selected: Array<any>) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-many-items`,
    { selected },
    store.getState().authReducer.token
  );
};

export const removeCard = (cardID: string, userID: string) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-card`,
    { cardID, userID },
    store.getState().authReducer.token
  );
};

export const addFileToItem = (files: any) => {
  return sendFile(
    `${process.env.REACT_APP_SERVER}/api/cards/upload-file`,
    files,
    store.getState().authReducer.token
  );
};

export const removeFileFromItem = (
  name: string,
  itemID: string,
  fileID: string
) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-file`,
    { name, itemID, fileID },
    store.getState().authReducer.token
  );
};

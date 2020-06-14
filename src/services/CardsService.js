import { request, sendFile } from "api/API";
import store from "store/store";

export const getCards = (userID) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/get-user-cards`,
    { userID },
    store.getState().authReducer.token
  );
};

export const createCard = (data) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/create-card`,
    data,
    store.getState().authReducer.token
  );
};

export const createItem = (cardID, item) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/create-card-item`,
    { cardID, item },
    store.getState().authReducer.token
  );
};

export const updateCard = (card, cardID, type, name) => {
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

export const cardItemChange = (result) => {
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
export const updateItem = (itemID, key, value) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-item`,
    {
      itemID,
      item: { [key]: value }
    },
    store.getState().authReducer.token
  );
};
export const cardItemShared = (start, end, result) => {
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

export const removeCardItem = (cardID, itemID) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-card-item`,
    {
      cardID,
      itemID
    },
    store.getState().authReducer.token
  );
};

export const updateManyItems = (destination, selectedItems, position) => {
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

export const removeSelectedItems = (selected) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-many-items`,
    { selected },
    store.getState().authReducer.token
  );
};

export const removeCard = (cardID, userID) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-card`,
    { cardID, userID },
    store.getState().authReducer.token
  );
};

export const uploadFileToItem = (formData) => {
  return sendFile(
    `${process.env.REACT_APP_SERVER}/api/cards/upload-file`,
    formData,
    store.getState().authReducer.token
  );
};

export const removeFileFromItem = (fileName, itemID, fileID) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-file`,
    { fileName, itemID, fileID },
    store.getState().authReducer.token
  );
};

import { request } from "api/API";

export const getCards = (userID, token) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/get-user-cards`,
    { userID },
    token
  );
};

export const createItem = (cardID, item, token) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/create-card-item`,
    { cardID, item },
    token
  );
};

export const updateCardPosition = (result, token) => {
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
    token
  );
};
export const updateItem = (cardID, itemID, key, value, token) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-item`,
    {
      cardID,
      itemID,
      item: { [key]: value }
    },
    token
  );
};
export const cardItemShared = (start, end, result, token) => {
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
    token
  );
};

export const removeCardItem = (cardID, itemID, token) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-card-item`,
    {
      cardID,
      itemID
    },
    token
  );
};

export const updateManyItems = (
  destination,
  selectedItems,
  position,
  token
) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-many-items`,
    {
      destination,
      selectedItems,
      position
    },
    token
  );
};

export const removeSelectedItems = (token, selected) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-many-items`,
    { selected },
    token
  );
};

export const removeCard = (cardID, userID, token) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-card`,
    { cardID, userID },
    token
  );
};

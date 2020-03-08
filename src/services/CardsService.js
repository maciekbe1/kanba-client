import { request } from "api/API";
import Cookie from "js-cookie";

export const getCards = userID => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/get-user-cards`,
    { userID },
    Cookie.get("token")
  );
};
export const updateCard = result => {
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
    Cookie.get("token")
  );
};
export const updateItem = (cardID, itemID, key, value) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/update-item`,
    {
      cardID,
      itemID,
      item: { [key]: value } //rawContent || titleText
    },
    Cookie.get("token")
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
    Cookie.get("token")
  );
};

export const removeCardItem = (cardID, itemID) => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/remove-card-item`,
    {
      cardID,
      itemID
    },
    Cookie.get("token")
  );
};

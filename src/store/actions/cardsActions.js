import * as CardsService from "services/CardsService";

export const setCards = ({ cards }) => ({
  type: "SET_CARDS_STATE",
  cardsState: cards
});

export const updateCard = (payload) => {
  const name = Object.keys(payload)[1];
  CardsService.updateCard(payload, payload.cardID, payload.type, name);
  return {
    type: "UPDATE_CARD",
    payload
  };
};

export const removeCard = ({ cardID }) => ({
  type: "REMOVE_CARD",
  cardID
});

export const createCard = (values) => ({
  type: "CREATE_CARD",
  payload: values
});

export const createItem = (payload) => ({
  type: "CREATE_ITEM",
  payload
});

export const removeItem = (payload) => ({
  type: "REMOVE_ITEM",
  payload
});

export const updateItem = (payload) => ({
  type: "UPDATE_ITEM",
  payload
});

export const setSelectedItems = (payload) => ({
  type: "SELECTED_ITEMS",
  payload
});

export const setCardsLoaded = (payload) => ({
  type: "SET_CARDS_LOADED",
  payload
});

export const openCardContent = (payload) => ({
  type: "OPEN_CARD_CONTENT",
  payload
});

export const closeCardContent = (payload) => ({
  type: "CLOSE_CARD_CONTENT",
  payload
});

export const addAttachment = (payload) => ({
  type: "ADD_ATTACHMENT",
  payload
});

export const removeAttachment = (payload) => ({
  type: "REMOVE_ATTACHMENT",
  payload
});

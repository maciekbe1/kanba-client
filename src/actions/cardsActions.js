export const setCards = ({ cards }) => ({
  type: "SET_CARDS_STATE",
  cardsState: cards
});

export const updateCard = payload => ({
  type: "UPDATE_CARD",
  payload
});

export const removeCard = ({ cardID }) => ({
  type: "REMOVE_CARD",
  cardID
});

export const createCard = values => ({
  type: "CREATE_CARD",
  payload: values
});

export const createItem = payload => ({
  type: "CREATE_ITEM",
  payload
});

export const removeItem = payload => ({
  type: "REMOVE_ITEM",
  payload
});

export const updateItem = payload => ({
  type: "UPDATE_ITEM",
  payload
});

export const setSelectedItems = payload => ({
  type: "SELECTED_ITEMS",
  payload
});

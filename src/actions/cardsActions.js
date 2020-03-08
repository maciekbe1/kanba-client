export const getCards = ({ cards }) => {
  return {
    type: "SET_CARDS_STATE",
    cardsState: cards
  };
};

export const cardItemChange = ({ cards }) => {
  return {
    type: "SET_CARDS_STATE",
    cardsState: cards
  };
};

export const cardItemShared = ({ cards }) => {
  return {
    type: "SET_CARDS_STATE",
    cardsState: cards
  };
};

export const cardChange = ({ cards }) => {
  return {
    type: "SET_CARDS_STATE",
    cardsState: cards
  };
};

export const updateCard = payload => {
  return {
    type: "UPDATE_CARD",
    payload
  };
};

export const removeCard = ({ cardID }) => {
  return {
    type: "REMOVE_CARD",
    cardID
  };
};

export const createCard = values => {
  return {
    type: "CREATE_CARD",
    payload: values
  };
};

export const createItem = payload => {
  return {
    type: "CREATE_ITEM",
    payload
  };
};

export const removeItem = payload => {
  return {
    type: "REMOVE_ITEM",
    payload
  };
};

export const updateItem = payload => {
  return {
    type: "UPDATE_ITEM",
    payload
  };
};

export const setSelectedItems = payload => {
  return {
    type: "SELECTED_ITEMS",
    payload
  };
};

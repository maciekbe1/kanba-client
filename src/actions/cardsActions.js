import { request } from "api/API";
import Cookie from "js-cookie";
import { signOut } from "actions/UserActions";
import { find } from "lodash";

export const getCards = ({ userID }) => async dispatch => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/cards/get-user-cards`,
    { userID },
    Cookie.get("token")
  )
    .then(res => {
      return dispatch({
        type: "SET_CARDS_STATE",
        cardsState: res.data
      });
    })
    .catch(error => {
      alert("Twoja sesja wygasła, zaloguj sie ponownie");
      dispatch(signOut());
      console.log(error);
    });
};

export const cardItemChange = ({ cards, result }) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  cards.map(card => {
    const data = reorder(
      card.list,
      result.source.index,
      result.destination.index
    );
    if (card._id === result.source.droppableId) {
      card.list = data;
    }
    return data;
  });
  return {
    type: "SET_CARDS_STATE",
    cardsState: cards
  };
};

export const cardItemShared = ({ cards, result }) => {
  let start = find(cards, o => {
    return o._id === result.source.droppableId;
  });
  let end = find(cards, o => {
    return o._id === result.destination.droppableId;
  });
  const [removed] = start.list.splice(result.source.index, 1);
  end.list.splice(result.destination.index, 0, removed);
  return {
    type: "SET_CARDS_STATE",
    cardsState: cards
  };
};

export const cardChange = ({ cards, result }) => {
  const [removed] = cards.splice(result.source.index, 1);
  cards.splice(result.destination.index, 0, removed);
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

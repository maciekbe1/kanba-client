import { remove, find, set } from "lodash";
import Card from "model/Card";
import { request } from "api/API";
import Cookie from "js-cookie";

const INITIAL_DATA = {
  cardsState: []
};
export default (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "SET_CARDS_STATE": {
      return {
        ...state,
        cardsState: action.cardsState
      };
    }

    case "REMOVE_CARD": {
      remove(state.cardsState, item => item._id === action.cardID);

      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }

    case "CREATE_CARD": {
      const cards = [action.payload, ...state.cardsState];
      return {
        ...state,
        cardsState: cards
      };
    }

    case "CREATE_ITEM": {
      find(state.cardsState, { _id: action.payload.cardID }).list.push({
        _id: action.payload.itemID,
        ...action.payload.values
      });
      return {
        ...state,
        cardsState: state.cardsState
      };
    }

    case "REMOVE_ITEM": {
      remove(
        find(state.cardsState, { _id: action.payload.cardID }).list,
        item => item._id === action.payload.itemID
      );
      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }

    case "UPDATE_ITEM": {
      const name = Object.keys(action.payload)[2];
      const value = Object.values(action.payload)[2];
      const obj = find(
        find(state.cardsState, { _id: action.payload.cardID }).list,
        item => item._id === action.payload.itemID
      );
      set(obj, [name], value);

      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }

    case "UPDATE_CARD": {
      const name = Object.keys(action.payload)[1];
      const o = find(state.cardsState, { _id: action.payload.cardID });
      o[name] = action.payload[name];
      request(
        `${process.env.REACT_APP_SERVER}/api/cards/update-card`,
        {
          card: { [name]: action.payload[name] },
          cardID: action.payload.cardID,
          type: action.payload.type
        },
        Cookie.get("token")
      )
        .then(() => {
          return;
        })
        .catch(error => {
          console.log(error);
        });
      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }
    default:
      return state;
  }
};

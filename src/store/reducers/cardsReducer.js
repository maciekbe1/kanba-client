import { remove, find, set } from "lodash";
import Card from "model/Card";
import ItemHelper from "helper/ItemHelper";

const INITIAL_DATA = {
  isCardsLoaded: false,
  selectedItems: [],
  cardsState: [],
  isContentOpen: false,
  itemContentData: null
};

export default (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "SET_CARDS_STATE": {
      return {
        ...state,
        cardsState: new Card(action.cardsState).cards
      };
    }

    case "REMOVE_CARD": {
      remove(state.cardsState, (item) => item._id === action.cardID);

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
        ...action.payload
      });
      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }

    case "REMOVE_ITEM": {
      remove(
        find(state.cardsState, { _id: action.payload.cardID }).list,
        (item) => item._id === action.payload.itemID
      );
      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }

    case "UPDATE_ITEM": {
      const name = Object.keys(action.payload)[1];
      const value = Object.values(action.payload)[1];
      const obj = ItemHelper.findItem(action.payload.itemID, state.cardsState);
      set(obj, [name], value);

      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }

    case "UPDATE_CARD": {
      const name = Object.keys(action.payload)[1];
      const o = state.cardsState[action.payload.index];
      o[name] = action.payload[name];

      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }

    case "SELECTED_ITEMS": {
      return {
        ...state,
        selectedItems: action.payload
      };
    }

    case "SET_CARDS_LOADED": {
      return {
        ...state,
        isCardsLoaded: action.payload
      };
    }

    case "OPEN_ITEM_CONTENT": {
      const item = ItemHelper.findItem(action.payload.itemID, state.cardsState);
      return {
        ...state,
        isContentOpen: true,
        itemContentData: item
      };
    }

    case "CLOSE_ITEM_CONTENT": {
      return {
        ...state,
        isContentOpen: false,
        itemContentData: null
      };
    }

    case "ADD_ATTACHMENT": {
      ItemHelper.findItem(
        action.payload.itemID,
        state.cardsState
      ).attachments.push(action.payload.file);
      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }

    case "REMOVE_ATTACHMENT": {
      const item = ItemHelper.findItem(action.payload.itemID, state.cardsState);
      remove(item.attachments, (file) => file._id === action.payload.fileID);
      return {
        ...state,
        cardsState: new Card(state.cardsState).cards
      };
    }
    default:
      return state;
  }
};

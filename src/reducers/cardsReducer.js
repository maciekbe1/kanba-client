import { remove, find } from "lodash";
import Card from "model/Card";
import { request } from "api/API";
import Cookie from "js-cookie";

const INITIAL_DATA = {
  todoState: []
};
export default (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "SET_CARDS_STATE": {
      return {
        ...state,
        todoState: action.todoState
      };
    }

    case "REMOVE_CARD": {
      remove(state.todoState, item => item._id === action.cardID);

      return {
        ...state,
        todoState: new Card(state.todoState).cards
      };
    }

    case "CREATE_CARD": {
      const cards = [action.payload, ...state.todoState];
      return {
        ...state,
        todoState: cards
      };
    }

    case "CREATE_ITEM": {
      find(state.todoState, { _id: action.payload.cardID }).list.push({
        _id: action.payload.itemID,
        ...action.payload.values
      });
      return {
        ...state,
        todoState: state.todoState
      };
    }

    case "REMOVE_ITEM": {
      remove(
        find(state.todoState, { _id: action.payload.cardID }).list,
        item => item._id === action.payload.itemID
      );
      return {
        ...state,
        todoState: new Card(state.todoState).cards
      };
    }
    case "UPDATE_CARD": {
      const name = Object.keys(action.payload)[1];
      const o = find(state.todoState, { _id: action.payload.cardID });
      o[name] = action.payload[name];
      request(
        `${process.env.REACT_APP_SERVER}/api/todo/update-card`,
        {
          card: { [name]: action.payload[name] },
          cardID: action.payload.cardID
        },
        Cookie.get("token")
      )
        .then(() => {
          console.log("card updated");
        })
        .catch(error => {
          console.log(error);
        });
      return {
        ...state,
        todoState: new Card(state.todoState).cards
      };
    }
    default:
      return state;
  }
};

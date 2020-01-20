import { remove, find } from "lodash";
import Todo from "model/Todo";
import { request } from "api/API";
import Cookie from "js-cookie";

const INITIAL_DATA = {
  todoState: []
};
export default (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "SET_TODO_STATE": {
      return {
        ...state,
        todoState: action.todoState
      };
    }

    case "REMOVE_CARD": {
      const cards = remove(
        state.todoState.cards,
        item => item.id !== action.cardID
      );
      return {
        ...state,
        todoState: new Todo(state.todoState._id, cards)
      };
    }

    case "CREATE_CARD": {
      action.payload.values.list = [];
      const cards = [action.payload.values, ...state.todoState.cards];
      return {
        ...state,
        todoState: new Todo(state.todoState._id, cards)
      };
    }

    case "CREATE_ITEM": {
      find(state.todoState.cards, { id: action.payload.cardID }).list.push(
        action.payload.values
      );
      return {
        ...state,
        todoState: new Todo(state.todoState._id, state.todoState.cards)
      };
    }

    case "REMOVE_ITEM": {
      remove(
        find(state.todoState.cards, { id: action.payload.cardID }).list,
        item => item.id === action.payload.itemID
      );
      return {
        ...state,
        todoState: new Todo(state.todoState._id, state.todoState.cards)
      };
    }
    case "UPDATE_CARD": {
      const name = Object.keys(action.payload)[1];
      const o = find(state.todoState.cards, { id: action.payload.cardID });
      o[name] = action.payload[name];
      request(
        `${process.env.REACT_APP_SERVER}/api/todo/update-todo-card`,
        {
          card: { [name]: action.payload[name] },
          cardID: action.payload.cardID,
          todoID: state.todoState._id
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
        todoState: new Todo(state.todoState._id, state.todoState.cards)
      };
    }
    default:
      return state;
  }
};

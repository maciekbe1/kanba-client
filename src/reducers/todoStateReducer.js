import { remove, find } from "lodash";
import Todo from "model/Todo";
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
    default:
      return state;
  }
};

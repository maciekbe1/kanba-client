import { remove, find } from "lodash";

const INITIAL_DATA = {
  todoState: []
};
export default (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case "SET_TODO_STATE":
      return {
        ...state,
        todoState: action.todoState
      };
    case "REMOVE_CARD":
      return {
        ...state,
        todoState: {
          cards: remove(
            state.todoState.cards,
            item => item.id !== action.cardID
          ),
          _id: state.todoState._id
        }
      };
    case "CREATE_CARD":
      action.payload.values.list = [];
      return {
        ...state,
        todoState: {
          cards: [action.payload.values, ...state.todoState.cards],
          _id: state.todoState._id
        }
      };
    case "CREATE_ITEM":
      find(state.todoState.cards, { id: action.payload.cardID }).list.push(
        action.payload.values
      );
      return {
        ...state,
        todoState: {
          cards: state.todoState.cards,
          _id: state.todoState._id
        }
      };
    case "REMOVE_ITEM":
      remove(
        find(state.todoState.cards, { id: action.payload.cardID }).list,
        item => item.id === action.payload.itemID
      );
      return {
        ...state,
        todoState: {
          cards: state.todoState.cards,
          _id: state.todoState._id
        }
      };
    default:
      return state;
  }
};

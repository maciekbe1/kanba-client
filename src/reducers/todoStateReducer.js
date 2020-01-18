import { remove } from "lodash";

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
    default:
      return state;
  }
};

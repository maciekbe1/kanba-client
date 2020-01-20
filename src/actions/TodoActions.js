import { request } from "api/API";
import Cookie from "js-cookie";
import { signOut } from "actions/UserActions";
import { find } from "lodash";
import Todo from "model/Todo";

export const setTodo = ({ userID }) => async dispatch => {
  return request(
    `${process.env.REACT_APP_SERVER}/api/todo/get-user-todo-cards`,
    { userID },
    Cookie.get("token")
  )
    .then(res => {
      return dispatch({
        type: "SET_TODO_STATE",
        todoState: res.data
      });
    })
    .catch(error => {
      if (error.response.data === "Invalid token") {
        alert("Twoja sesja wygasła, zaloguj sie ponownie");
        dispatch(signOut());
      }
    });
};

export const cardItemChange = ({ todo, result }) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  todo.cards.map(card => {
    const data = reorder(
      card.list,
      result.source.index,
      result.destination.index
    );
    if (card.id === result.source.droppableId) {
      card.list = data;
    }
    return data;
  });
  return {
    type: "SET_TODO_STATE",
    todoState: new Todo(todo._id, todo.cards)
  };
};

export const cardItemShared = ({ todo, result }) => {
  let start = find(todo.cards, o => {
    return o.id === result.source.droppableId;
  });
  let end = find(todo.cards, o => {
    return o.id === result.destination.droppableId;
  });
  const [removed] = start.list.splice(result.source.index, 1);
  end.list.splice(result.destination.index, 0, removed);
  return {
    type: "SET_TODO_STATE",
    todoState: new Todo(todo._id, todo.cards)
  };
};

export const cardChange = ({ todo, result }) => {
  const [removed] = todo.cards.splice(result.source.index, 1);
  todo.cards.splice(result.destination.index, 0, removed);
  return {
    type: "SET_TODO_STATE",
    todoState: new Todo(todo._id, todo.cards)
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

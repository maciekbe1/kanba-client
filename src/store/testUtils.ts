// import { createStore } from "redux";
// import rootReducer from "store/reducers";
import store from "store/store";

export function storeFactory() {
  // return createStore(rootReducer, initialState);
  // Set user
  store.dispatch({
    type: "SIGNIN_USER",
    isAuth: true,
    data: { _id: 1 },
    token: "token",
    byGoogle: false
  });
  // Set cards state
  // store.dispatch({
  //   type: "SET_CARDS_STATE",
  //   cardsState: []
  // });
  // //Set Secected items
  // store.dispatch({
  //   type: "SELECTED_ITEMS",
  //   selectedItems: []
  // });
  return store;
}

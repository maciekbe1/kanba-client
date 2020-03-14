import { combineReducers } from "redux";
import authReducer from "./authReducer";
import layoutReducer from "./layoutReducer";
import cardsReducer from "./cardsReducer";
const appReducer = combineReducers({
  authReducer,
  layoutReducer,
  cardsReducer
});

const rootReducer = (state, action) => {
  if (action.type === "SIGNOUT_USER") {
    state.cardsReducer = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;

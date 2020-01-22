import { combineReducers } from "redux";
import authReducer from "./authReducer";
import layoutReducer from "./layoutReducer";
import cardsReducer from "./cardsReducer";
export default combineReducers({
  authReducer,
  layoutReducer,
  cardsReducer
});

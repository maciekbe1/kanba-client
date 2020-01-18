import { combineReducers } from "redux";
import authReducer from "./authReducer";
import layoutReducer from "./layoutReducer";
import todoStateReducer from "./todoStateReducer";
export default combineReducers({
  authReducer,
  layoutReducer,
  todoStateReducer
});

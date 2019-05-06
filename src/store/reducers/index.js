import { combineReducers } from "redux";
import contactReducers from "./contactReducers";
import messageReducers from "./messageReducers";
export default combineReducers({
  contactReducers,
  messageReducers
});

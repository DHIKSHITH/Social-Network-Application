import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import gregister from "./gregister";

export default combineReducers({
  alert,
  auth,
  gregister,
});

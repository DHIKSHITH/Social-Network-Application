import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import gregister from "./gregister";
import profile from "./profile";
import post from "./post";
import avatarRegister from "./avatarRegister";

export default combineReducers({
  alert,
  auth,
  gregister,
  profile,
  post,
  avatarRegister,
});

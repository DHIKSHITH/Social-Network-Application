import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GREGISTER_SUCCESS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/v1/user/protect");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = ({ name, email, password, passwordConfirm }) => async (
  dispatch
) => {
  try {
    const newUser = {
      name,
      email,
      password,
      passwordConfirm,
    };
    const res = await axios.post("/api/v1/user/signup", newUser);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
export const Gregister = (gname, gemail, gurl) => async (dispatch) => {
  try {
    const newUser = {
      gname,
      gemail,
      gurl,
    };
    console.log(gname);
    dispatch({
      type: GREGISTER_SUCCESS,
      payload: newUser,
    });
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  try {
    const user = {
      email,
      password,
    };
    const res = await axios.post("/api/v1/user/login", user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.error;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

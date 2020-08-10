import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETE,
  GET_PROFILES,
  CLEAR_PROFILE,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profile/me`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get(`/api/v1/profile/findAll`);
    dispatch({
      type: GET_PROFILES,
      payload: res.data.profiles,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const createProfile = (FormData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.post("/api/v1/profile/create", FormData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert(edit ? "profile updated" : "profile created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const addExperience = (FormData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/v1/profile/addExperience", FormData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
export const addEducation = (FormData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/v1/profile/addEducation", FormData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/v1/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    const errors = err.msg;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/v1/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    dispatch(setAlert("Education removed", "success"));
  } catch (err) {
    const errors = err.response;
    if (errors) {
      dispatch(setAlert(errors, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure?This cant be undone")) {
    try {
      await axios.delete(`api/v1/user/delete`);
      dispatch({
        type: ACCOUNT_DELETE,
      });
      dispatch(setAlert("Account Deleted", "success"));
    } catch (err) {
      const errors = err.response;
      if (errors) {
        dispatch(setAlert(errors, "danger"));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response, status: err.response },
      });
    }
  }
};

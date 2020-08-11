import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/post/");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;

    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/post/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.like },
    });
  } catch (err) {
    console.log(err);
    const errors = err.response;

    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/post/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    const errors = err.response;

    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("post removed", "danger"));
  } catch (err) {
    const errors = err.response;

    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const post = {
      text: formData,
    };
    const res = await axios.post(`/api/v1/post/`, post);
    dispatch({
      type: ADD_POST,
      payload: res.data.post,
    });
    dispatch(setAlert("post created", "success"));
  } catch (err) {
    const errors = err.response;

    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/post/${id}`);
    console.log(res);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    const errors = err.response;

    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/post/comment/${postId}`, formData);
    dispatch({
      type: ADD_COMMENT,
      payload: res.comment,
    });
    dispatch(setAlert("comment added", "success"));
  } catch (err) {
    console.log(err);
    const errors = err.response;

    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/v1/post/comment/${postId}/${commentId}`
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("comment removed", "success"));
  } catch (err) {
    const errors = err.response;

    if (errors) {
      dispatch(setAlert(errors.statusText, "danger"));
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

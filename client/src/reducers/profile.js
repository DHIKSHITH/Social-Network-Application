import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  SEND_REQUEST,
  ACCEPT_REQUEST,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return { ...state, profiles: payload, profile: null, loading: false };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case SEND_REQUEST:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case ACCEPT_REQUEST:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

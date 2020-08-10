import { GREGISTER_SUCCESS, LOGOUT } from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GREGISTER_SUCCESS:
      return { ...state, payload };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        state: null,
      };

    default:
      return state;
  }
}

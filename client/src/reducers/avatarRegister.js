import { AVATARREGISTER_SUCCESS } from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AVATARREGISTER_SUCCESS:
      return { ...state, payload };

    default:
      return state;
  }
}

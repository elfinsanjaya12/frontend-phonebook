import { GET_CONTACT } from "../types";

const initialState = {
  contacts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
};

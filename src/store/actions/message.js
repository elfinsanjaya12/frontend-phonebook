import axios from "../../axios";

import { GET_MESSAGE } from "../types";

export const getMessage = () => dispatch => {
  axios
    .get(`messages`)
    .then(res => {
      // console.log(res.data.data);
      dispatch({
        type: GET_MESSAGE,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

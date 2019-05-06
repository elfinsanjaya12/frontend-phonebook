import axios from "../../axios";

import { GET_CONTACT } from "../types";

export const getContacts = () => dispatch => {
  axios
    .get(`contacts`)
    .then(res => {
      // console.log(res.data.data);
      dispatch({
        type: GET_CONTACT,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

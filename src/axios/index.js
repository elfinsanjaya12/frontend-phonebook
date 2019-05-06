import axios from "axios";

// const url = "http://localhost:3000/api/v1/";
// const url = "https://warm-dusk-36116.herokuapp.com/api/v1/";
const url = "https://backend-test-decode.herokuapp.com/api/v1/";

export default axios.create({
  baseURL: url
});

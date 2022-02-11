import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

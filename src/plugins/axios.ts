import Vue from "vue";
import axios from "axios";

const HTTPClient = axios.create({
  baseURL: "https://randomuser.me/api",
  timeout: 3000,
  headers: {
    "Content-type": "application/json",
  },
});

HTTPClient.interceptors.request.use(
  (request) => request,
  (response) => Promise.reject(response)
);

HTTPClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default HTTPClient;
Vue.prototype.$api = HTTPClient;

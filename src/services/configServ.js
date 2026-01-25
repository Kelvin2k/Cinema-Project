import axios from "axios";
import { getLocalStorage } from "../utils/local";

const dataUser = getLocalStorage("userInfo");
export const https = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  timeout: 15000,
  headers: {
    Authorization: "Bearer " + (dataUser ? dataUser.accessToken : null),
    TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
  },
});

console.log("Axios headers:", https.defaults.headers);

axios.interceptors.request.use(
  function (config) {
    if (dataUser) {
      config.headers.Authorization = getLocalStorage("userInfo").accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const adminHttps = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn",
  timeout: 15000,
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_AUTHORIZATION_TOKEN,
    TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
  },
});

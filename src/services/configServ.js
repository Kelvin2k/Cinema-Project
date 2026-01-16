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

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

// const refreshToken = async () => {
//   console.log("refresh again");
// };

// https.interceptors.response.use(undefined, async (error) => {
//   if (error.response?.status === 401) {
//     // error.config._retry = true;
//     error.config._retry = 0;
//     if (error.response?.status === 401 && error.config._retry < 3) {
//       error.config._retry += 1;
//       await refreshToken();
//       return https(error.config);
//     }
//   }

//   throw error;
// });

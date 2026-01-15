import axios from "axios";
import { https } from "./configServ";

export const userServ = {
  loginServ: (data) => {
    console.log("data", data);
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  signUpServ: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
  },

  updateUserInfo_User: async (data) => {
    try {
      const result = await axios.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION_TOKEN}`,
            TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
          },
        }
      );
      console.log("result", result.data.content);

      return result.data.content;
    } catch (error) {
      console.log("error", error);
    }
  },
  findUser: (key) => {
    return https.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${key}`
    );
  },
  fetchUserDataList: () => {
    return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
  },
  removeUser: (userAccount) => {
    return https.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userAccount}`
    );
  },
  addUser: (data) => {
    return https.post("/api/QuanLyNguoiDung/ThemNguoiDung", data);
  },
  fetchUserData_User: async (accountId) => {
    try {
      const result = await axios.post(
        `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${accountId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION_TOKEN}`,
            TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  },
  fetchUserData_Admin: (accountId) => {
    return https.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${accountId}`
    );
  },
  updatUserInfo_Admin: (data) => {
    return https.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },
};

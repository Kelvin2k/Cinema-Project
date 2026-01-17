import { adminHttps, https } from "./configServ";

export const userServ = {
  loginServ: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", data);
  },
  signUpServ: (data) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", data);
  },

  updateUserInfo_User: (data) => {
    return adminHttps.post(
      "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      data,
    );
  },

  findUser: (key) => {
    return https.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${key}`,
    );
  },
  fetchUserDataList: () => {
    return https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
  },
  removeUser: (userAccount) => {
    return https.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userAccount}`,
    );
  },
  addUser: (data) => {
    return https.post("/api/QuanLyNguoiDung/ThemNguoiDung", data);
  },
  fetchUserData_Admin: (accountId) => {
    return https.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${accountId}`,
    );
  },
  fetchUserData_User: (accountId) => {
    return adminHttps.post(
      `/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${accountId}`,
    );
  },
};

import { https } from "./configServ";

export const filmServManagement = {
  getAllBanner: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovie: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  deleteMovie: (movieCode) => {
    return https.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${movieCode}`);
  },
  addMovie: (data) => {
    return https.post("/api/QuanLyPhim/ThemPhimUploadHinh", data);
  },
  getCinemaShowTime: (cinemaCode) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaCode}&maNhom=GP01`
    );
  },
  getMovieList: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  getMovieInfo: (movieId) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  },
  updateMovieInfo: (data) => {
    return https.post("/api/QuanLyPhim/CapNhatPhimUpload", data);
  },
};

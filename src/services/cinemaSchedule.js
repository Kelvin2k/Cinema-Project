import { https } from "./configServ";

export const cinemaSchedule = {
  getAllCinema: () => {
    return https.get("/api/QuanLyRap/LayThongTinHeThongRap");
  },
  getMovieShowTime: (movieCode) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieCode}`
    );
  },
  getShowTimeSeat: (showTimeCode) => {
    return https.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeCode}`
    );
  },
  bookTicket: (data) => {
    return https.post("/api/QuanLyDatVe/DatVe", data);
  },
};

import dayjs from "dayjs";
import React from "react";

const TicketHistoryTab = ({ userData }) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {userData.thongTinDatVe?.map((item, index) => {
        const cinemaSystemId = item.danhSachGhe[0].maHeThongRap;
        const cinemaSystemName = item.danhSachGhe[0].tenHeThongRap;
        return (
          <div className="grid grid-cols-2 gap-5" key={index}>
            <img
              src={item.hinhAnh}
              alt=""
              className="w-full h-60 object-cover"
            />
            <div className="content_left space-y-1 py-2">
              <div className="content_up space-y-1">
                <h2 className="text-base font-bold">{cinemaSystemId}</h2>
                <p className="text-gray-400">{cinemaSystemName}</p>
              </div>
              <div className="content_down space-y-1 ">
                <p className="font-bold">
                  Booking date:
                  <br />
                  <span className="text-red-500">
                    {dayjs(item.ngayDat).format("DD/MM/YYYY")} ~{" "}
                    {dayjs(item.ngayDat).format("HH:mm")}
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {item.danhSachGhe?.map((seat, index) => {
                    return (
                      <p className="text-green-500 line-clamp-3" key={index}>
                        Screen: {seat.tenCumRap}{" "}
                        <span> ~ Seat: {seat.tenGhe}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* <div className="grid grid-cols-2 gap-5">
        <img
          src="https://substackcdn.com/image/fetch/$s_!SjlY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289ad232-bb03-4b07-848c-d0dad888a4dc_2000x2963.png"
          alt=""
          className="grid-cols-1"
        />
        <div className="content_left space-y-1 py-2">
          <div className="content_up space-y-1">
            <h2 className="text-base font-bold">GLX - Nguyen Du</h2>
            <p className="text-gray-400">25 Huynh Thuc Khang</p>
          </div>
          <div className="content_down space-y-1 ">
            <p className="font-bold">
              Booking date:
              <br />
              <span className="text-red-500">1-10-2025 19:50:00 </span>
            </p>
            <span className="text-green-500">Screen 1 Seat 15</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <img
          src="https://substackcdn.com/image/fetch/$s_!SjlY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289ad232-bb03-4b07-848c-d0dad888a4dc_2000x2963.png"
          alt=""
          className="grid-cols-1"
        />
        <div className="content_left space-y-1 py-2">
          <div className="content_up space-y-1">
            <h2 className="text-base font-bold">GLX - Nguyen Du</h2>
            <p className="text-gray-400">25 Huynh Thuc Khang</p>
          </div>
          <div className="content_down space-y-1 ">
            <p className="font-bold">
              Booking date:
              <br />
              <span className="text-red-500">1-10-2025 19:50:00 </span>
            </p>
            <span className="text-green-500">Screen 1 Seat 15</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <img
          src="https://substackcdn.com/image/fetch/$s_!SjlY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289ad232-bb03-4b07-848c-d0dad888a4dc_2000x2963.png"
          alt=""
          className="grid-cols-1"
        />
        <div className="content_left space-y-1 py-2">
          <div className="content_up space-y-1">
            <h2 className="text-base font-bold">GLX - Nguyen Du</h2>
            <p className="text-gray-400">25 Huynh Thuc Khang</p>
          </div>
          <div className="content_down space-y-1 ">
            <p className="font-bold">
              Booking date:
              <br />
              <span className="text-red-500">1-10-2025 19:50:00 </span>
            </p>
            <span className="text-green-500">Screen 1 Seat 15</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TicketHistoryTab;

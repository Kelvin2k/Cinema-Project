import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cinemaSchedule } from "../../services/cinemaSchedule";
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { endedLoading, startedLoading } from "../../redux/Slice/loadingSlice";

const BookingTicket = () => {
  console.log("rerender");

  const params = useParams();
  const { showTimeId } = params;
  const seat = new Array(160).fill("");
  const [seatLayout, setSeatLayout] = useState([]);
  const [movieInfo, setmovieInfo] = useState({});
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [total, setTotal] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Congratulations! You booking has been confirmed!",
      duration: 5,
    });
  };

  const seatTypeNormal = [
    "w-10 h-10 rounded-sm bg-gray-300 flex items-center justify-center text-black cursor-pointer hover:bg-gray-600 duration-300",
  ];
  const seatTypeVip = [
    "w-10 h-10 rounded-sm bg-orange-400 flex items-center justify-center text-black cursor-pointer hover:bg-gray-500 duration-300",
  ];
  const seatTaken = [
    "w-10 h-10 rounded-sm bg-gray-700 flex items-center justify-center cursor-not-allowed font-bold",
  ];
  const seatSelected = [
    "w-10 h-10 rounded-sm bg-green-700 text-white flex items-center justify-center font-bold cursor-pointer",
  ];

  useEffect(() => {
    dispatch(startedLoading());

    cinemaSchedule
      .getShowTimeSeat(showTimeId)
      .then((result) => {
        dispatch(endedLoading());
        console.log("result", result.data.content);
        setSeatLayout(result.data.content.danhSachGhe);
        setmovieInfo(result.data.content.thongTinPhim);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  useEffect(() => {
    setTotal(selectedSeat.reduce((sum, seat) => sum + (seat.giaVe || 0), 0));
  }, [selectedSeat]);

  console.log("selectedSeat", selectedSeat);

  return (
    <div>
      {contextHolder}
      <div className="content container mx-auto grid grid-cols-5 gap-x-20 my-10">
        <div
          className="seat_booking grid grid-cols-10 col-span-3 gap-2 p-5 rounded-2xl"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          {seatLayout.map((seat, index) => {
            const isSlected = selectedSeat.some(
              (s) => s.tenGhe === seat.tenGhe
            );
            return (
              <div key={index}>
                {seat.taiKhoanNguoiDat === null && seat.loaiGhe === "Thuong" ? (
                  <button
                    className={isSlected ? seatSelected : seatTypeNormal}
                    key={index}
                    name={seat.tenGhe}
                    value={seat.tenGhe}
                    onClick={(e) => {
                      setSelectedSeat((prev) => {
                        const exists = prev.some(
                          (s) => s.tenGhe === seat.tenGhe
                        );
                        if (exists)
                          return prev.filter((s) => s.tenGhe !== seat.tenGhe);
                        return [
                          ...prev,
                          {
                            maGhe: seat.maGhe,
                            tenGhe: seat.tenGhe,
                            giaVe: seat.giaVe,
                          },
                        ];
                      });
                    }}
                  >
                    {index + 1}
                  </button>
                ) : null}
                {seat.taiKhoanNguoiDat === null && seat.loaiGhe === "Vip" ? (
                  <button
                    className={isSlected ? seatSelected : seatTypeVip}
                    key={index}
                    name={seat.tenGhe}
                    value={seat.tenGhe}
                    onClick={(e) => {
                      setSelectedSeat((prev) => {
                        const exists = prev.some(
                          (s) => s.tenGhe === seat.tenGhe
                        );
                        if (exists)
                          return prev.filter((s) => s.tenGhe !== seat.tenGhe);
                        return [
                          ...prev,
                          {
                            maGhe: seat.maGhe,
                            tenGhe: seat.tenGhe,
                            giaVe: seat.giaVe,
                          },
                        ];
                      });
                    }}
                  >
                    {index + 1}
                  </button>
                ) : null}
                {seat.taiKhoanNguoiDat ? (
                  <button
                    className={seatTaken}
                    key={index}
                    name={seat.tenGhe}
                    value={seat.tenGhe}
                  >
                    X
                  </button>
                ) : null}
              </div>
            );
          })}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="h-8 w-8 rounded bg-gray-400 "></div>
              <span className="font-medium">Sold Out</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-gray-200"></div>
              <span className="font-medium">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-orange-400"></div>
              <span className="font-medium">VIP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-green-500"></div>
              <span className="font-medium">Selecting</span>
            </div>
          </div>
        </div>
        <div
          className="provisional_invoice p-10 rounded-lg col-span-2"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <div>
            <section className="bg-white antialiased dark:bg-gray-900">
              <form
                action=""
                className="mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("hellO");
                  const payload = {
                    maLichChieu: Number(showTimeId),
                    danhSachVe: selectedSeat.map(({ maGhe, giaVe }) => ({
                      maGhe,
                      giaVe,
                    })),
                  };

                  cinemaSchedule
                    .bookTicket(payload)
                    .then((result) => {
                      success();
                    })
                    .catch((err) => {
                      console.log("err", err);
                    });

                  cinemaSchedule
                    .getShowTimeSeat(showTimeId)
                    .then((result) => {
                      dispatch(endedLoading());
                      console.log("result", result.data.content);
                      setSeatLayout(result.data.content.danhSachGhe);
                      setmovieInfo(result.data.content.thongTinPhim);
                      setSelectedSeat([]);
                      setTotal(0);
                    })
                    .catch((err) => {
                      console.log("err", err);
                    });
                }}
              >
                <div className="mx-auto max-w-3xl">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 text-center uppercase">
                    Provisional Invoice
                  </h2>
                  <img
                    src={movieInfo.hinhAnh}
                    alt=""
                    className="w-3/4 h-96 object-cover container mx-auto rounded-lg"
                  />
                  <div className="mt-6 sm:mt-8">
                    <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                      <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                          <tr className="table-row">
                            <td className="whitespace-nowrap py-4 md:w-full">
                              <p className="font-bold text-lg">
                                Theater System:
                              </p>
                            </td>
                            <td className="p-4 text-right text-base font-bold dark:text-white md:w-full text-green-500">
                              {movieInfo.tenCumRap}
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="whitespace-nowrap py-4 md:w-full">
                              <p className="font-bold text-lg">
                                Theater Addresss:
                              </p>
                            </td>
                            <td className="p-4 text-right text-base font-bold dark:text-white md:w-full text-green-500">
                              {movieInfo.diaChi}
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="whitespace-nowrap py-4 md:w-full">
                              <p className="font-bold text-lg">
                                Screen Number:
                              </p>
                            </td>
                            <td className="p-4 text-right text-base font-bold dark:text-white md:w-full text-green-500">
                              {movieInfo.tenRap}
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="whitespace-nowrap py-4 md:w-full">
                              <p className="font-bold text-lg">Show Time:</p>
                            </td>
                            <td className="p-4 text-right text-base font-bold dark:text-white md:w-full text-green-500">
                              {movieInfo.ngayChieu} ~{" "}
                              <span className="text-red-500">
                                {movieInfo.gioChieu}
                              </span>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="whitespace-nowrap py-4 md:w-full">
                              <p className="font-bold text-lg">Movie Name:</p>
                            </td>
                            <td className="p-4 text-right text-base font-bold dark:text-white md:w-full text-green-500">
                              {movieInfo.tenPhim}
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="whitespace-nowrap py-4 md:w-full">
                              <p className="font-bold text-lg">
                                Seats selected:
                              </p>
                            </td>
                            <td className="p-4 text-right text-base font-bold dark:text-white md:w-full text-green-500 flex justify-end">
                              <div className="flex w-fit gap-x-2">
                                {selectedSeat?.map((seat, index) => {
                                  console.log("seat", seat);
                                  return (
                                    <p className="" key={index}>
                                      Seat {seat.tenGhe}
                                    </p>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 space-y-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Order summary
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500 dark:text-gray-400">
                              Original price
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                              {total}
                            </dd>
                          </dl>
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500 dark:text-gray-400">
                              Savings
                            </dt>
                            <dd className="text-base font-medium text-green-500">
                              0
                            </dd>
                          </dl>
                        </div>
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                          <dt className="text-lg font-bold text-gray-900 dark:text-white">
                            Total
                          </dt>
                          <dd className="text-lg font-bold text-gray-900 dark:text-white">
                            {total} VND
                          </dd>
                        </dl>
                      </div>
                      {/* <div className="flex items-start sm:items-center">
                        <input
                          id="terms-checkbox-2"
                          type="checkbox"
                          defaultValue
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                        <label
                          htmlFor="terms-checkbox-2"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {" "}
                          I agree with the{" "}
                          <a
                            href="#"
                            title
                            className="text-primary-700 underline hover:no-underline dark:text-primary-500"
                          >
                            Terms and Conditions
                          </a>{" "}
                          of use of the Flowbite marketplace{" "}
                        </label>
                      </div> */}
                      <div className="gap-4 sm:flex sm:items-center">
                        <button
                          type="button"
                          className="w-full rounded-lg  border border-gray-200 px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 cursor-pointer duration-300 bg-gray-200"
                        >
                          Return
                        </button>
                        <button
                          type="submit"
                          className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0 bg-red-500 hover:bg-red-700 cursor-pointer duration-300"
                        >
                          Click to buy!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTicket;

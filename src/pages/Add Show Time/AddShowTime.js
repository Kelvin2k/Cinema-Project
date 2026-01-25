import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { filmServManagement } from "../../services/filmServManagement";
import dayjs from "dayjs";
import { DatePicker, notification } from "antd";
import { useFormik } from "formik";
import { cinemaSchedule } from "../../services/cinemaSchedule";
import { validateCreateShowTime } from "../../utils/validation";

const AddShowTime = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [clusterList, setClusterList] = useState([]);
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title = "", description = "") => {
    api[type]({
      title: title,
      description: description,
    });
  };
  useEffect(() => {
    filmServManagement
      .getMovieInfo(movieId)
      .then((result) => {
        setMovieDetail(result.data.content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [movieId]);

  const formik = useFormik({
    initialValues: {
      maHeThongRap: "",
      maRap: "",
      ngayChieuGioChieu: "",
      giaVe: "",
      maPhim: "",
    },
    validationSchema: validateCreateShowTime,
    onSubmit: (values, { resetForm }) => {
      cinemaSchedule
        .createShowTime(values)
        .then((result) => {
          openNotificationWithIcon(
            "success",
            "Success!",
            "Showtime has been scheduled successfully!",
          );
          resetForm();
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        })
        .catch((err) => {
          const errMsg =
            err?.response?.data?.content ||
            "Unable to schedule showtime. Please check your inputs and try again.";
          openNotificationWithIcon("error", "Scheduling Failed", errMsg);
        });
    },
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (values.maHeThongRap) {
      cinemaSchedule
        .getClusterInfoBySystem(values.maHeThongRap)
        .then((result) => {
          console.log("result", result);
          setClusterList(result.data.content);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      setClusterList([]);
    }
  }, [values.maHeThongRap]);

  values.maPhim = movieId;

  return (
    <div className="flex justify-center items-center flex-col">
      {contextHolder}
      <div className="movie_detail bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs mb-10">
        <h3 className="text-lg font-bold text-center">{movieDetail.tenPhim}</h3>

        <img
          className="rounded-base w-full h-auto mt-2"
          src={movieDetail.hinhAnh}
          alt="Movie Poster"
        />

        <p className="mb-6 text-gray-700 text-base font-semibold mt-3">
          {movieDetail.moTa}
        </p>
      </div>
      <h2 className="text-3xl font-bold uppercase mb-10">Schedule Showtime</h2>

      <form className="w-full mb-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 mb-5">
          <label
            htmlFor="maHeThongRap"
            className="block mb-2.5 text-sm font-medium text-heading col-span-1 self-center"
          >
            Cinema System
          </label>
          <select
            id="maHeThongRap"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body col-span-2 mb-1"
            name="maHeThongRap"
            value={values.maHeThongRap}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Cinema System</option>
            <option value="BHDStar">BHD Star Cineplex</option>
            <option value="CGV">CGV</option>
            <option value="CineStar">CineStar</option>
            <option value="Galaxy">Galaxy Cinema</option>
            <option value="LotteCinima">Lotte Cinema</option>
            <option value="MegaGS">MegaGS</option>
          </select>
          {touched.maHeThongRap && errors.maHeThongRap ? (
            <p className="text-red-500 italic col-start-2 col-span-2">
              {errors.maHeThongRap}
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-3">
          <label
            htmlFor="maRap"
            className="block mb-2.5 text-sm font-medium text-heading col-span-1 self-center"
          >
            Cinema Cluster
          </label>
          <select
            id="maRap"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body col-span-2 mb-5"
            name="maRap"
            value={values.maRap}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Cinema Cluster</option>
            {clusterList.map((item, index) => {
              return (
                <option key={index} value={item.maCumRap}>
                  {item.tenCumRap}
                </option>
              );
            })}
          </select>
          {touched.maRap && errors.maRap ? (
            <p className="text-red-500 italic col-start-2 col-span-2">
              {errors.maRap}
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-3">
          <label
            htmlFor="ngayChieuGioChieu"
            className="block text-sm font-medium text-heading self-center"
          >
            Show Date and Time
          </label>
          <DatePicker
            className="w-full col-span-2 pb-5!"
            showTime={{
              format: "HH:mm",
              defaultValue: dayjs("00:00", "HH:mm"),
            }}
            onChange={(date, dateString) => {
              setFieldValue("ngayChieuGioChieu", dateString);
            }}
            onBlur={() => {
              setFieldTouched("ngayChieuGioChieu", true);
            }}
            value={
              values.ngayChieuGioChieu
                ? dayjs(values.ngayChieuGioChieu, "DD/MM/YYYY HH:mm:ss")
                : null
            }
            format={"DD/MM/YYYY HH:mm:ss"}
          />
          {touched.ngayChieuGioChieu && errors.ngayChieuGioChieu ? (
            <p className="text-red-500 italic col-start-2 col-span-2">
              {errors.ngayChieuGioChieu}
            </p>
          ) : null}
        </div>
        <div className="grid grid-cols-3 mt-5">
          <label
            htmlFor="giaVe"
            className="block text-sm font-medium text-heading col-span-1 self-center"
          >
            Ticket Price
          </label>
          <input
            type="number"
            id="giaVe"
            name="giaVe"
            value={values.giaVe}
            onBlur={handleBlur}
            onChange={handleChange}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body col-span-2"
            placeholder="Enter Ticket Price"
          />
          {touched.giaVe && errors.giaVe ? (
            <p className="text-red-500 italic col-start-2 col-span-2">
              {errors.giaVe}
            </p>
          ) : null}
        </div>
        <button
          type="submit"
          className="flex w-fit items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0 bg-red-500 hover:bg-red-700 cursor-pointer duration-300 mx-auto mt-5!"
          onClick={() => {
            // showModal(true);
          }}
        >
          Create Showtime
        </button>
      </form>
    </div>
  );
};

export default AddShowTime;

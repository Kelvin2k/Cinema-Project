import {
  Button,
  DatePicker,
  Flex,
  notification,
  Rate,
  Space,
  Switch,
} from "antd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import { filmServManagement } from "../../services/filmServManagement";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      // values.ngayKhoiChieu = moment(values.ngayKhoiChieu).format("DD-MM-YYYY");
      const formData = new FormData();
      for (let key in values) {
        if (key === "hinhAnh") {
          formData.append("File", values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }
      formData.append("maNhom", "GP01");
      console.log([...formData.entries()]);

      filmServManagement
        .addMovie(formData)
        .then((result) => {
          console.log("result", result);
          openNotificationWithIcon(
            "success",
            "Add Movie Successful",
            "Movie has been created successfully."
          );
          resetForm();
          setImage("");
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        })
        .catch((err) => {
          console.log("err", err);
          const errMsg =
            err.response?.data?.content ||
            "Failed to add movie. Please try again.";
          openNotificationWithIcon("error", "Add Movie Failed", errMsg);
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
    resetForm,
    setFieldValue,
    setFieldTouched,
  } = formik;

  const [image, setImage] = useState("");
  console.log("values", values);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title = "", description = "") => {
    api[type]({
      title: title,
      description: description,
    });
  };

  return (
    <div>
      {contextHolder}
      <h2 className="font-bold text-3xl capitalize mb-5">Create new film</h2>
      <form action="" onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="tenPhim"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Movie Name
          </label>
          <input
            type="text"
            id="tenPhim"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="John"
            name="tenPhim"
            value={values.tenPhim}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.tenPhim && errors.tenPhim ? (
            <p className="text-red-500 italic">{errors.tenPhim}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="trailer"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Trailer
          </label>
          <input
            type="text"
            id="trailer"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="John"
            name="trailer"
            value={values.trailer}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.trailer && errors.trailer ? (
            <p className="text-red-500 italic">{errors.trailer}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="moTa"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Description
          </label>
          <input
            type="text"
            id="moTa"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="John"
            name="moTa"
            value={values.moTa}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.moTa && errors.moTa ? (
            <p className="text-red-500 italic">{errors.moTa}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="ngayKhoiChieu"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Release Date
          </label>
          <DatePicker
            onChange={(date, dateString) => {
              console.log(date);
              console.log(dateString);
              setFieldValue("ngayKhoiChieu", dateString);
            }}
            onBlur={() => {
              setFieldTouched("ngayKhoiChieu", true);
            }}
            value={
              values.ngayKhoiChieu
                ? dayjs(values.ngayKhoiChieu, "DD-MM-YYYY")
                : null
            }
            format={"DD-MM-YYYY"}
          />
          {touched.ngayKhoiChieu && errors.ngayKhoiChieu ? (
            <p className="text-red-500 italic">{errors.ngayKhoiChieu}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="dangChieu"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Is Releasing
          </label>
          <Switch
            onChange={(checked, boolean) => {
              setFieldValue("dangChieu", checked);
            }}
            value={values.dangChieu}
          />
          {touched.dangChieu && errors.dangChieu ? (
            <p className="text-red-500 italic">{errors.dangChieu}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="sapChieu"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Will Release
          </label>
          <Switch
            defaultChecked
            onChange={(checked, boolean) => {
              setFieldValue("sapChieu", checked);
            }}
            value={values.sapChieu}
          />
          {touched.sapChieu && errors.sapChieu ? (
            <p className="text-red-500 italic">{errors.sapChieu}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="hot"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Hot
          </label>
          <Switch
            defaultChecked
            onChange={(checked, boolean) => {
              setFieldValue("hot", checked);
            }}
            value={values.hot}
          />
          {touched.hot && errors.hot ? (
            <p className="text-red-500 italic">{errors.hot}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="danhGia"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Star
          </label>
          <Rate
            allowHalf
            value={values.danhGia}
            onChange={(value) => {
              setFieldValue("danhGia", value);
            }}
          />
          {touched.danhGia && errors.danhGia ? (
            <p className="text-red-500 italic">{errors.danhGia}</p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="hinhAnh"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Image
          </label>
          <img src={image} alt="" className="my-5 w-1/2" />
          <input
            type="file"
            className=""
            name="hinhAnh"
            onBlur={handleBlur}
            accept="image/*"
            onChange={(event) => {
              console.log(event.target.files[0]);
              const img = event.target.files[0];
              if (img) {
                const urlImg = URL.createObjectURL(img);
                console.log(urlImg);
                setImage(urlImg);
              }
              setFieldValue("hinhAnh", img);
            }}
          />
          {touched.hinhAnh && errors.hinhAnh ? (
            <p className="text-red-500 italic">{errors.hinhAnh}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="text-white bg-black py-2 px-5 rounded-md mt-5"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addUserValidation,
  signUpValidation,
  updateUserValidation_Admin,
} from "../../utils/validation";
import { userServ } from "../../services/userServ";
import { saveLocalStore } from "../../utils/local";
import { useDispatch } from "react-redux";
import { loginUser, saveInfoUser } from "../../redux/Slice/userSlice";
import { message } from "antd";

const Manager_UpdateUser = ({ userDataUpdate, setOpenUpdate, setUserList }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    validationSchema: updateUserValidation_Admin,
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);
      userServ
        .updatUserInfo_Admin(values)
        .then((result) => {
          console.log("result", result);
          setOpenUpdate(false);
          messageApi.success({ content: "Update User Successfully" });
          userServ
            .fetchUserDataList()
            .then((result) => {
              console.log("result", result.data.content);
              setUserList(result.data.content);
            })
            .catch((err) => {
              console.log("err", err);
            });
        })
        .catch((err) => {
          console.log("err", err);
          messageApi.error({ content: err.response.data.message });
        });
    },
  });

  const {
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
    setValues,
  } = formik;
  console.log("values", values);
  console.log("errors", errors);

  useEffect(() => {
    setValues(userDataUpdate);
  }, [userDataUpdate]);

  return (
    <div className="min-h-200 container mx-auto flex justify-center items-center">
      {contextHolder}
      <div className="w-full">
        <h1 className="text-center font-bold uppercase text-3xl mb-10">
          Update User Form
        </h1>

        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="taiKhoan"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Account Name
            </label>
            <input
              type="text"
              id="taiKhoan"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Enter account name"
              name="taiKhoan"
              value={values.taiKhoan}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.taiKhoan && errors.taiKhoan ? (
              <span className="italic text-red-500">{errors.taiKhoan}</span>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="matKhau"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="••••••••"
                name="matKhau"
                value={values.matKhau}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute top-1/4 right-3 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <i
                  className={
                    showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                  }
                ></i>
              </button>
              {touched.matKhau && errors.matKhau ? (
                <span className="italic text-red-500">{errors.matKhau}</span>
              ) : null}
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="hoTen"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              User Name
            </label>
            <input
              type="text"
              id="hoTen"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="Full name"
              name="hoTen"
              value={values.hoTen}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.hoTen && errors.hoTen ? (
              <span className="italic text-red-500">{errors.hoTen}</span>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              User Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="email@example.com"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.email && errors.email ? (
              <span className="italic text-red-500">{errors.email}</span>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="soDT"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="soDT"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="0977123456"
              name="soDT"
              value={values.soDT}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.soDT && errors.soDT ? (
              <span className="italic text-red-500">{errors.soDT}</span>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Select an option
            </label>
            <select
              id="countries"
              className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              name="maLoaiNguoiDung"
              value={values.maLoaiNguoiDung}
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="">Select User Type</option>
              <option value="KhachHang">Customer</option>
              <option value="QuanTri">Admin</option>
            </select>
            {touched.maLoaiNguoiDung && errors.maLoaiNguoiDung ? (
              <span className="italic text-red-500">
                {errors.maLoaiNguoiDung}
              </span>
            ) : null}
            {/* <h2>hello</h2> */}
          </div>
          <input
            type="hidden"
            name="maNhom"
            value={values.maNhom}
            onChange={handleChange}
          />
          <input
            type="hidden"
            name="maLoaiNguoiDung"
            value={values.maLoaiNguoiDung}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="cursor-pointer text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Manager_UpdateUser;

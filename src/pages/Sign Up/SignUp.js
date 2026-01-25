import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpValidation } from "../../utils/validation";
import { userServ } from "../../services/userServ";
import { saveLocalStore } from "../../utils/local";
import { useDispatch } from "react-redux";
import { loginUser, saveInfoUser } from "../../redux/Slice/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "Khach Hang",
      hoTen: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      userServ
        .signUpServ(values)
        .then((result) => {
          saveLocalStore(values, "userInfo");
          dispatch(saveInfoUser(values));
          dispatch(loginUser(values))
            .unwrap()
            .then((result) => {
              navigate("/");
            })
            .catch((err) => {});
        })
        .catch((err) => {
        });
    },
  });

  const { touched, handleBlur, handleChange, handleSubmit, values, errors } =
    formik;
  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-center font-bold uppercase text-2xl sm:text-3xl mb-6 sm:mb-10 text-white">
          User Sign Up Form
        </h1>

        <form className="w-full px-4 sm:px-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="taiKhoan"
              className="block mb-2.5 text-sm font-medium text-white"
            >
              Account Name
            </label>
            <input
              type="text"
              id="taiKhoan"
              className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
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
              className="block mb-2.5 text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="matKhau"
                className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
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
              htmlFor="password"
              className="block mb-2.5 text-sm font-medium text-white"
            >
              Input Password Again
            </label>
            <div className="relative mb-5">
              <input
                type={showPasswordAgain ? "text" : "password"}
                id="nhapLaiMatKhau"
                className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="••••••••"
                name="nhapLaiMatKhau"
                value={values.nhapLaiMatKhau}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute top-1/4 right-3 cursor-pointer"
                onClick={() => {
                  setShowPasswordAgain(!showPasswordAgain);
                }}
              >
                <i
                  className={
                    showPasswordAgain
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash"
                  }
                ></i>
              </button>
              {touched.nhapLaiMatKhau && errors.nhapLaiMatKhau ? (
                <span className="italic text-red-500">
                  {errors.nhapLaiMatKhau}
                </span>
              ) : null}
            </div>
            <div className="mb-5">
              <label
                htmlFor="hoTen"
                className="block mb-2.5 text-sm font-medium text-white"
              >
                User Name
              </label>
              <input
                type="text"
                id="hoTen"
                className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
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
                className="block mb-2.5 text-sm font-medium text-white"
              >
                User Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
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
                htmlFor="soDt"
                className="block mb-2.5 text-sm font-medium text-white"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="soDt"
                className="bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="0977123456"
                name="soDt"
                value={values.soDt}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.soDt && errors.soDt ? (
                <span className="italic text-red-500">{errors.soDt}</span>
              ) : null}
            </div>
          </div>
          {/* Hidden fields to match initialValues */}
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

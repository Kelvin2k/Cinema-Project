import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserValidation } from "../../utils/validation";
import { updateUserName } from "../../redux/Slice/userSlice";
import { getLocalStorage, saveLocalStore } from "../../utils/local";
import { userServ } from "../../services/userServ";
import { notification } from "antd";

const UpdateUserInformation = ({ userData }) => {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title = "", description = "") => {
    api[type]({
      title: title,
      description: description,
    });
  };

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: getLocalStorage("userInfo")?.maNhom || "GP01",
      maLoaiNguoiDung: getLocalStorage("userInfo")?.maLoaiNguoiDung || "",
      hoTen: "",
    },
    validationSchema: updateUserValidation,
    onSubmit: (values, { resetForm }) => {
      userServ
        .updateUserInfo_User(values)
        .then((result) => {
          saveLocalStore("userInfo", result);
          dispatch(updateUserName(result.hoTen));
          openNotificationWithIcon(
            "success",
            "Update User Successful",
            "Your information has been updated successfully.",
          );
          resetForm();
        })
        .catch((err) => {
          const errMsg =
            err?.response?.data?.message ||
            "Failed to add user. Please try again.";
          openNotificationWithIcon("error", "Update User Failed", errMsg);
        });
    },
  });

  const {
    values,
    setValues,
    touched,
    handleBlur,
    handleChange,
    errors,
    handleSubmit,
  } = formik;

  useEffect(() => {
    if (userData) {
      setValues(userData);
    }
  }, [userData, setValues]);

  return (
    <div className="bg-neutral-primary-soft shadow-xs rounded-base border border-default p-6 grid grid-cols-2 ">
      {contextHolder}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-base font-medium">{values.hoTen}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-base font-medium">{values.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Phone Number</p>
          <p className="text-base font-medium">{values.soDT}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Account</p>
          <p className="text-base font-medium">{values.taiKhoan}</p>
        </div>
        <div className="space-y-1 md:col-span-2">
          <p className="text-sm text-gray-500">Password</p>
          <p className="text-base font-medium">{values.matKhau}</p>
        </div>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your email
            </label>
            <input
              type="text"
              id="email"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="name@flowbite.com"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <p className="text-red-500 italic">{errors.email}</p>
            ) : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="taiKhoan"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Account
            </label>
            <input
              type="text"
              id="taiKhoan"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="name@flowbite.com"
              name="taiKhoan"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.taiKhoan}
            />
            {touched.taiKhoan && errors.taiKhoan ? (
              <p className="text-red-500 italic">{errors.taiKhoan}</p>
            ) : null}
          </div>
          <div className="mb-2">
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
              placeholder="name@flowbite.com"
              name="hoTen"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.hoTen}
            />
            {touched.hoTen && errors.hoTen ? (
              <p className="text-red-500 italic">{errors.hoTen}</p>
            ) : null}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Password
            </label>
            <input
              type="text"
              id="matKhau"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="name@flowbite.com"
              name="matKhau"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.matKhau}
            />
            {touched.matKhau && errors.matKhau ? (
              <p className="text-red-500 italic">{errors.matKhau}</p>
            ) : null}
          </div>
          <div className="mb-2">
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
              placeholder="name@flowbite.com"
              name="soDT"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.soDT}
            />
            {touched.soDT && errors.soDT ? (
              <p className="text-red-500 italic">{errors.soDT}</p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="text-white cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none mt-3"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUserInformation;

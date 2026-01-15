import * as yup from "yup";

export const userValidation = yup.object({
  taiKhoan: yup.string().required("Please enter the user name"),
  matKhau: yup.string().required("Please input password"),
});

export const signUpValidation = yup.object({
  taiKhoan: yup.string().required("Please do not leave this field empty"),
  matKhau: yup.string().required("Please do not leave this field empty"),
  nhapLaiMatKhau: yup
    .string()
    .required("Please do not leave this field empty")
    .oneOf([yup.ref("matKhau"), null], "Password must match"),
  hoTen: yup.string().required("Please do not leave this field empty"),
  email: yup
    .string()
    .required("Please do not leave this field empty")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  soDt: yup
    .string()
    .required("Please do not leave this field empty")
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid Vietnamese phone number"),
});

export const updateUserValidation = yup.object({
  taiKhoan: yup.string().required("Please do not leave this field empty"),
  matKhau: yup.string().required("Please do not leave this field empty"),
  hoTen: yup.string().required("Please do not leave this field empty"),
  email: yup
    .string()
    .required("Please do not leave this field empty")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  soDT: yup
    .string()
    .required("Please do not leave this field empty")
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid Vietnamese phone number"),
});

export const addUserValidation = yup.object({
  taiKhoan: yup.string().required("Please do not leave this field empty"),
  matKhau: yup.string().required("Please do not leave this field empty"),
  hoTen: yup.string().required("Please do not leave this field empty"),
  email: yup
    .string()
    .required("Please do not leave this field empty")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  soDt: yup
    .string()
    .required("Please do not leave this field empty")
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid Vietnamese phone number"),
  maLoaiNguoiDung: yup
    .string()
    .required("Please do not leave this field empty"),
});

export const updateUserValidation_Admin = yup.object({
  taiKhoan: yup.string().required("Please do not leave this field empty"),
  matKhau: yup.string().required("Please do not leave this field empty"),
  hoTen: yup.string().required("Please do not leave this field empty"),
  email: yup
    .string()
    .required("Please do not leave this field empty")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  soDT: yup
    .string()
    .required("Please do not leave this field empty")
    .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Invalid Vietnamese phone number"),
  maLoaiNguoiDung: yup
    .string()
    .required("Please do not leave this field empty"),
});

import React from "react";
import loginAnimation from "./../../assets/animation/loginAnimation.json";
// import Lottie from "react-lottie";
import Lottie from "lottie-react";
import { useFormik } from "formik";
import { userValidation } from "../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { getLocalStorage, saveLocalStore } from "../../utils/local";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/Slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title = "", description = "") => {
    api[type]({
      title: title,
      description: description,
    });
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    style: { height: 400, width: "100%" },
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // const [notification, setnotification] = useState("");
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values, { resetForm }) => {

      dispatch(loginUser(values))
        .unwrap()
        .then((result) => {
          openNotificationWithIcon("success", "Login Successful!", "");
          saveLocalStore(result, "userInfo");
          const userInformation = getLocalStorage("userInfo");
          setTimeout(() => {
            if (userInformation.maLoaiNguoiDung === "QuanTri") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }, 2000);
        })
        .catch((err) => {
          const errMsg =
            err?.response?.data?.message ||
            "Failed to add user. Please try again.";
          openNotificationWithIcon("error", "Log In Failed!", errMsg);
        });

      resetForm();
    },
    validationSchema: userValidation,
  });

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    formik;

  // useEffect(() => {
  //   setTimeout(() => {
  //     setnotification("");
  //   }, 3000);
  // }, [notification]);

  return (
    <>
      {contextHolder}
      <div className="container mx-auto relative w-screen md:h-[70vh] h-screen flex justify-center items-center">
        {/* <div className="absolute top-100 right-96">
        {notification === "success" && (
          <div
            id="toast-success"
            className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default"
            role="alert"
          >
            <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-success bg-success-soft rounded">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 11.917 9.724 16.5 19 7.5"
                />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">Login Successfully!</div>
            <button
              type="button"
              className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
              data-dismiss-target="#toast-success"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </button>
          </div>
        )}

        {notification === "fail" && (
          <div
            id="toast-danger"
            className="flex items-center w-full max-w-sm p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-default"
            role="alert"
          >
            <div className="inline-flex items-center justify-center shrink-0 w-7 h-7 text-fg-danger bg-danger-soft rounded">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">Login Failed!</div>
            <button
              type="button"
              className="ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none"
              data-dismiss-target="#toast-danger"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
            </button>
          </div>
        )}
      </div> */}

        <div className="grid md:grid-cols-[2fr_3fr] grid-cols-1">
          <div className="col_left">
            <Lottie {...defaultOptions} />
            {/* <Lottie options={defaultOptions} height={400} width={400} /> */}
            {/* <Lottie
            animationData={loginAnimation}
            loop={true}
            autoplay={true}
            style={{ height: 400, width: 400 }}
          /> */}
          </div>
          <div className="col_right md:p-5 px-5">
            <form action="" onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold capitalize">Login Movie</h2>
              <div className="flex flex-col space-y-5 mt-5">
                <div>
                  <label
                    htmlFor="taiKhoan"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="taiKhoan"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="John"
                    name="taiKhoan"
                    value={values.taiKhoan}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.taiKhoan && errors.taiKhoan ? (
                    <p className="text-red-500 italic">{errors.taiKhoan}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="taiKhoan"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    id="matKhau"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    placeholder="John"
                    name="matKhau"
                    value={values.matKhau}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.matKhau && errors.matKhau ? (
                    <p className="text-red-500 italic">{errors.matKhau}</p>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md bg-green-500 text-white hover:bg-green-700 duration-500 cursor-pointer py-2 px-5 mt-3"
              >
                Log in
              </button>
              <button
                type="button"
                className="ml-3 rounded-md bg-orange-500 text-white hover:bg-orange-700 duration-500 cursor-pointer py-2 px-5 mt-3"
              >
                <Link to={"/sign_up"}>Sign Up</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

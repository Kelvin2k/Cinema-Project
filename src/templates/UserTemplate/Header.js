import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeKeyLocalStorage } from "../../utils/local";
import { updateUserName } from "../../redux/Slice/userSlice";

const Header = () => {
  const { userName } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              data-slot="icon"
              aria-hidden="true"
              className="size-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <el-popover-group className="hidden lg:flex lg:gap-x-12">
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive
                ? "text-sm/6 font-semibold text-red-500 cursor-pointer"
                : "text-sm/6 font-semibold text-gray-900 cursor-pointer";
            }}
            to={"/"}
          >
            Home Page
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive
                ? "text-sm/6 font-semibold text-red-500 cursor-pointer "
                : "text-sm/6 font-semibold text-gray-900 cursor-pointer";
            }}
            to={"/cinema"}
          >
            Cinema
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive
                ? "text-sm/6 font-semibold text-red-500 cursor-pointer"
                : "text-sm/6 font-semibold text-gray-900 cursor-pointer";
            }}
            to={"/news"}
          >
            News
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) => {
              return isActive
                ? "text-sm/6 font-semibold text-red-500 cursor-pointer"
                : "text-sm/6 font-semibold text-gray-900 cursor-pointer";
            }}
            to={"/application"}
          >
            Application
          </NavLink>
        </el-popover-group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userName ? (
            <p
              className="text-emerald-600 cursor-pointer hover:text-lg hover:text-emerald-800 uppercase duration-200"
              onClick={() => {
                console.log("hello");
                navigate("/profile");
              }}
            >
              Hello, {userName}
              <button
                type="button"
                className="font-semibold text-red-500 text-base cursor-pointer ml-3  duration-200 hover:text-lg"
                onClick={(e) => {
                  console.log("hello");
                  e.stopPropagation();
                  removeKeyLocalStorage("userInfo");
                  dispatch(updateUserName(""));
                  navigate("/login");
                }}
              >
                Log out
              </button>
            </p>
          ) : (
            <NavLink
              to={"/login"}
              className={({ isActive, isPending }) =>
                "text-sm/6 font-semibold text-gray-900 cursor-pointer hover:text-red-500 duration-200"
              }
            >
              Login / Sign up
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="space-y-1 px-6 pb-6 pt-4">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block rounded-lg px-3 py-2 text-base font-semibold text-red-500"
                  : "block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              }
            >
              Home Page
            </NavLink>
            <NavLink
              to="/cinema"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block rounded-lg px-3 py-2 text-base font-semibold text-red-500"
                  : "block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              }
            >
              Cinema
            </NavLink>
            <NavLink
              to="/news"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block rounded-lg px-3 py-2 text-base font-semibold text-red-500"
                  : "block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              }
            >
              News
            </NavLink>
            <NavLink
              to="/application"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block rounded-lg px-3 py-2 text-base font-semibold text-red-500"
                  : "block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
              }
            >
              Application
            </NavLink>
            <div className="border-t border-gray-200 pt-4 mt-4">
              {userName ? (
                <div className="space-y-2">
                  <p
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-emerald-600 cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Hello, {userName}
                  </p>
                  <button
                    type="button"
                    className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-red-500 hover:bg-gray-50"
                    onClick={() => {
                      removeKeyLocalStorage("userInfo");
                      dispatch(updateUserName(""));
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Login / Sign up
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

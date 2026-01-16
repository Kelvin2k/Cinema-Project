import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { removeKeyLocalStorage } from "../../utils/local";
import { updateUserName } from "../../redux/Slice/userSlice";
import { notification } from "antd";

const Header = () => {
  const { userName } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title = "", description = "") => {
    api[type]({
      title: title,
      description: description,
    });
  };

  const goToSection = (id, e) => {
    e?.preventDefault();
    const elementId = document.getElementById(id);
    if (location.pathname === "/") {
      elementId.scrollIntoView({ behavior: "smooth" });
      return;
    }
    navigate("/", { state: { scrollTo: id } });
  };

  return (
    <header className="bg-white shadow-sm">
      {contextHolder}
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="sr-only">Movie123</span>
            <img
              src="https://static.vecteezy.com/system/resources/previews/022/580/623/non_2x/movie-media-letter-logo-design-illustration-free-vector.jpg"
              className="h-12 w-auto"
              alt="Movie123 Logo"
            />
          </a>
        </div>
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:space-x-8">
          <NavLink
            className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
            to={"/"}
          >
            Home Page
          </NavLink>
          <button
            className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
            onClick={(e) => goToSection("now_showing", e)}
          >
            Hot Movie
          </button>
          <button
            className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
            onClick={(e) => goToSection("hot_movie", e)}
          >
            Now Showing
          </button>
          <button
            className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors"
            onClick={(e) => goToSection("new_release", e)}
          >
            New Release
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center">
          {userName ? (
            <div className="flex items-center space-x-4">
              <p
                className="text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Hello, {userName}
              </p>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 transition-colors font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  removeKeyLocalStorage("userInfo");
                  dispatch(updateUserName(""));
                  openNotificationWithIcon(
                    "success",
                    "Log Out Successful",
                    "You have been log out"
                  );
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <NavLink
              to={"/login"}
              className="text-sm font-semibold text-gray-900 hover:text-red-500 transition-colors"
            >
              Login / Sign up
            </NavLink>
          )}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            <div className="w-full">
              <NavLink
                className="block px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                to={"/"}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home Page
              </NavLink>
            </div>

            <button
              className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              onClick={(e) => {
                goToSection("now_showing", e);
                setMobileMenuOpen(false);
              }}
            >
              Hot Movie
            </button>
            <button
              className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              onClick={(e) => {
                goToSection("hot_movie", e);
                setMobileMenuOpen(false);
              }}
            >
              Now Showing
            </button>
            <button
              className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              onClick={(e) => {
                goToSection("new_release", e);
                setMobileMenuOpen(false);
              }}
            >
              New Release
            </button>
            <div className="pt-4 border-t border-gray-200">
              {userName ? (
                <div className="space-y-2">
                  <p
                    className="block px-3 py-2 text-base font-semibold text-emerald-600 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                    onClick={() => {
                      navigate("/profile");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Hello, {userName}
                  </p>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 text-base font-semibold text-red-500 hover:bg-gray-100 rounded-md transition-colors"
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
                  className="block px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
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

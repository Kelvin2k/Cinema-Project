import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { removeKeyLocalStorage } from "../../utils/local";
import { updateUserName } from "../../redux/Slice/userSlice";
import { notification } from "antd";
import "./Header.css";

const Header = () => {
  const { userName } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [api, contextHolder] = notification.useNotification();
  const menuRef = useRef(null);
  
  const openNotificationWithIcon = (type, title = "", description = "") => {
    api[type]({
      title: title,
      description: description,
    });
  };

  // Use vanilla JS to ensure menu toggle works
  useEffect(() => {
    const menuElement = menuRef.current;
    if (menuElement) {
      if (mobileMenuOpen) {
        menuElement.classList.add("open");
        menuElement.style.display = "block";
        console.log("Menu opened via vanilla JS");
      } else {
        menuElement.classList.remove("open");
        menuElement.style.display = "none";
        console.log("Menu closed via vanilla JS");
      }
    }
  }, [mobileMenuOpen]);

  const handleToggleMenu = () => {
    console.log("Toggle clicked, current state:", mobileMenuOpen);
    setMobileMenuOpen((prev) => !prev);
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
    <header style={{ backgroundColor: "white", position: "relative", zIndex: 50 }}>
      {contextHolder}
      <nav
        aria-label="Global"
        style={{
          margin: "0 auto",
          display: "flex",
          maxWidth: "80rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              src="https://static.vecteezy.com/system/resources/previews/022/580/623/non_2x/movie-media-letter-logo-design-illustration-free-vector.jpg"
              className="h-20 w-auto"
              alt="Flowbite Logo"
            />
          </a>
        </div>
        <div style={{ display: "flex" }} className="lg:hidden">
          <button
            type="button"
            onClick={handleToggleMenu}
            style={{
              margin: "-0.625rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.375rem",
              padding: "0.625rem",
              color: "#374151",
              position: "relative",
              zIndex: 51,
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <span style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", borderWidth: 0 }}>
              Open main menu
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className="hamburger-icon"
              style={{ height: "24px", width: "24px" }}
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink
            className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
            to={"/"}
          >
            Home Page
          </NavLink>
          <button
            className="text-sm/6 font-semibold text-gray-900 cursor-pointer hover:text-gray-600"
            onClick={(e) => goToSection("now_showing", e)}
          >
            Hot Movie
          </button>
          <button
            className="text-sm/6 font-semibold text-gray-900 cursor-pointer hover:text-gray-600"
            onClick={(e) => goToSection("hot_movie", e)}
          >
            Now Showing
          </button>
          <button
            className="text-sm/6 font-semibold text-gray-900 cursor-pointer hover:text-gray-600"
            onClick={(e) => goToSection("new_release", e)}
          >
            New Release
          </button>
        </div>

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

      <div
        ref={menuRef}
        id="mobile-menu"
        className="mobile-menu-container"
        data-open={mobileMenuOpen}
      >
        <div className="mobile-menu-content">
          <NavLink
            className="mobile-menu-item"
            to={"/"}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home Page
          </NavLink>

          <button
            className="mobile-menu-item"
            onClick={(e) => {
              goToSection("now_showing", e);
              setMobileMenuOpen(false);
            }}
          >
            Hot Movie
          </button>
          
          <button
            className="mobile-menu-item"
            onClick={(e) => {
              goToSection("hot_movie", e);
              setMobileMenuOpen(false);
            }}
          >
            Now Showing
          </button>
          
          <button
            className="mobile-menu-item"
            onClick={(e) => {
              goToSection("new_release", e);
              setMobileMenuOpen(false);
            }}
          >
            New Release
          </button>

          <div className="mobile-menu-divider">
            {userName ? (
              <>
                <div
                  className="mobile-menu-item mobile-menu-user"
                  onClick={() => {
                    navigate("/profile");
                    setMobileMenuOpen(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Hello, {userName}
                </div>
                <button
                  className="mobile-menu-item mobile-menu-logout"
                  onClick={() => {
                    removeKeyLocalStorage("userInfo");
                    dispatch(updateUserName(""));
                    openNotificationWithIcon(
                      "success",
                      "Log Out Successful",
                      "You have been logged out"
                    );
                    setTimeout(() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }, 1000);
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-menu-item"
              >
                Login / Sign up
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

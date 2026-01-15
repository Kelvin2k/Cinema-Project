import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";

const UserTemplate = () => {
  const { isActive } = useSelector((state) => state.loadingSlice);

  return (
    <>
      {isActive ? <Loading /> : null}
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default UserTemplate;

import React, { useEffect, useState } from "react";
import { filmServManagement } from "../../services/filmServManagement";
import { Rate, Tabs } from "antd";
import pic1 from "./../../assets/Film Poster/1.jpeg";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";
import dayjs from "dayjs";

const images = require.context(
  "./../../assets/Film Poster/",
  false,
  /\.(png|jpe?g|svg)$/
);

const CinemaShowTime = ({ cinemaCode }) => {
  const [cinemaDetail, setCinemaDetail] = useState([]);
  const [filmDetail, setFilmDetail] = useState([]);

  useEffect(() => {
    filmServManagement
      .getCinemaShowTime(cinemaCode)
      .then((result) => {
        setCinemaDetail(result.data.content[0].lstCumRap);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const renderFilmShowTime = () => {
    console.log("hello");
  };
  const imageKeys = images.keys();

  return (
    <div className="">
      <Tabs
        defaultActiveKey="1"
        tabPlacement={"start"}
        onChange={() => {
          renderFilmShowTime();
        }}
        //   style={{ height: 220 }}
        items={cinemaDetail?.map((theater, index) => {
          return {
            label: (
              <div className="text-left" key={theater.index}>
                <h2 className="uppercase text-green-500 text-base">
                  {theater.tenCumRap}
                </h2>
                <p className="text-gray-400">{theater.diaChi}</p>
                <p className="text-red-500">[Details]</p>
              </div>
            ),
            key: theater.maCumRap,
            // disabled: i === 28,
            children: (
              <div className="space-y-5">
                {/* <img src={pic1} alt="" /> */}

                {theater.danhSachPhim?.slice(0, 5).map((film, index) => {
                  const randomIndex = Math.floor(Math.random() * 11 + 1);
                  let randomKey = imageKeys[randomIndex];
                  let randomImage = images(randomKey);

                  return (
                    <div className="grid grid-cols-3 gap-x-2" key={index}>
                      <img
                        src={randomImage}
                        alt=""
                        className="w-full object-cover col-span-1"
                      />
                      <div className="header col-span-2 mt-1 w-full ">
                        <p className="font-bold mb-3">
                          <span className="rounded-sm bg-red-500 px-2 py-2 mb-2 w-fit text-white mr-1">
                            C18
                          </span>
                          {film.tenPhim}
                        </p>
                        <div className="grid grid-cols-2 w-full lg:w-2/3 md:gap-3">
                          {film.lstLichChieuTheoPhim
                            ?.slice(0, 5)
                            .map((filmShowTime, index) => {
                              const formattedDate = dayjs(
                                filmShowTime.ngayChieuGioChieu
                              ).format("DD/MM/YYYY");
                              const formattedTime = dayjs(
                                filmShowTime.ngayChieuGioChieu
                              ).format("HH:mm");
                              return (
                                <div className="mt-2 col-span-1" key={index}>
                                  <Link to={"/"} className="">
                                    <p className="rounded-sm! bg-gray-100! text-green-500! w-fit! px-2! py-1!">
                                      {formattedDate} ~
                                      <span className="text-red-500 ml-1">
                                        {formattedTime}
                                      </span>
                                    </p>
                                  </Link>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ),
          };
        })}
      />
    </div>
  );
};

export default CinemaShowTime;

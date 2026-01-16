import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { cinemaSchedule } from "../../services/cinemaSchedule";
import CinemaShowTime from "./CinemaShowTime";

const CinemaSchedule = () => {
  const [cinema, setCinema] = useState([]);
  useEffect(() => {
    cinemaSchedule
      .getAllCinema()
      .then((result) => {
        console.log("result", result);
        setCinema(result.data.content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const renderFilmShowTime = (key) => {
    console.log("key", key);
  };
  return (
    <div className="py-10 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4" id="now_showing">
      <div className="max-w-7xl mx-auto">
        <Tabs
          defaultActiveKey="1"
          tabPlacement={window.innerWidth < 768 ? "top" : "left"}
          onChange={(key) => {
            renderFilmShowTime();
          }}
          //   style={{ height: 220 }}
          items={cinema?.map((item, index) => {
            return {
              label: (
                <img
                  src={item.logo}
                  className="w-12 sm:w-16 md:w-20"
                  alt={item.tenHeThongRap || "Cinema logo"}
                />
              ),
              key: item.maHeThongRap,
              // disabled: i === 28,
              children: <CinemaShowTime cinemaCode={item.maHeThongRap} />,
            };
          })}
        />
      </div>
    </div>
  );
};

export default CinemaSchedule;

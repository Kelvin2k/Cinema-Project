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
        setCinema(result.data.content);
      })
      .catch((err) => {});
  }, []);
  const renderFilmShowTime = (key) => {};
  return (
    <div className="py-20" id="now_showing">
      <div className="lg:container lg:mx-auto">
        <Tabs
          defaultActiveKey="1"
          tabPlacement={"start"}
          onChange={(key) => {
            renderFilmShowTime();
          }}
          //   style={{ height: 220 }}
          items={cinema?.map((item, index) => {
            return {
              label: (
                <img
                  src={item.logo}
                  className="w-20"
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

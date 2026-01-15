import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { cinemaSchedule } from "../../services/cinemaSchedule";
import { filmServManagement } from "../../services/filmServManagement";
import CinemaShowTime from "./CinemaShowTime";

const CinemaSchedule = () => {
  const [cinema, setCinema] = useState([]);
  const [cinemaCode, setcinemaCode] = useState("");
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
    <div className="py-20">
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
              label: <img src={item.logo} className="w-20" />,
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

import React from "react";
import Banner from "./Banner";
import CinemaSchedule from "./CinemaSchedule";
import HotMovie from "./HotMovie";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <HotMovie />
      <CinemaSchedule />
    </div>
  );
};

export default HomePage;

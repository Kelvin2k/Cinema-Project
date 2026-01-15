import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { filmServManagement } from "../../services/filmServManagement";
import { useDispatch } from "react-redux";
import { endedLoading, startedLoading } from "../../redux/Slice/loadingSlice";

const Banner = () => {
  // const contentStyle = {
  //   margin: 0,
  //   height: "160px",
  //   color: "#fff",
  //   lineHeight: "160px",
  //   textAlign: "center",
  //   background: "#364d79",
  // };

  const dispatch = useDispatch();

  const [listBanner, setListBanner] = useState([]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", transform: "scale(2)" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", transform: "scale(2)" }}
        onClick={onClick}
      />
    );
  }

  const setting = {
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
  };

  useEffect(() => {
    // filmServManagement
    //   .getAllBanner()
    //   .then((result) => {
    //     console.log("result");
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
    dispatch(startedLoading());

    const fetchBanners = async () => {
      try {
        const data = await filmServManagement.getAllBanner();
        console.log("data", data);
        setListBanner(data.data.content);
        dispatch(endedLoading());
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchBanners();
  }, []);
  console.log("listBanner", listBanner);

  return (
    <Carousel
      // afterChange={onChange}
      //   effect="fade"
      //   autoplay={true}
      {...setting}
    >
      {listBanner?.map((item, index) => {
        return (
          <div key={item.maBanner}>
            <img
              src={item.hinhAnh}
              alt=""
              className="w-full h-175 object-cover"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default Banner;

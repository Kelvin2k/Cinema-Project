import React, { useEffect, useState } from "react";
import { Carousel, Modal } from "antd";
import { filmServManagement } from "../../services/filmServManagement";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./hotMovie.css";
import { Link, useLocation } from "react-router-dom";

const HotMovie = () => {
  const [hotMovie, setHotMovie] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const location = useLocation();
  console.log("location", location.pathname);

  const handlePlayClick = (movie) => {
    // Thêm function này
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const contentStyle = {
    margin: 0,
    minHeight: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  useEffect(() => {
    filmServManagement
      .getMovieList()
      .then((result) => {
        console.log("result", result.data.content);
        setHotMovie(result.data.content);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-2xl text-center my-5">Hot Movie</h2>
      <Slider {...settings}>
        {hotMovie?.map((movie, index) => {
          return (
            <div key={index} className="px-2">
              <div className="relative rounded-lg overflow-hidden">
                <div
                  className="cover absolute top-0 left-0 w-full h-full bg-gray-900 hover:opacity-50 opacity-0 duration-300 cursor-pointer"
                  onClick={() => {
                    handlePlayClick(movie);
                  }}
                >
                  <div className="flex justify-center items-center w-full h-full">
                    <i className="fa-regular fa-circle-play text-5xl text-white"></i>
                  </div>
                </div>
                <img
                  src={movie.hinhAnh}
                  alt=""
                  className="h-50 w-full object-cover"
                />
              </div>
              <p className="my-4 font-bold hover:text-green-500 duration-300">
                <span className="text-white bg-red-500 rounded-sm px-2 py-2 mr-3">
                  C18
                </span>
                <Link to={`/detail_movie/${movie.maPhim}`}>
                  {movie.tenPhim}
                </Link>
              </p>
              <p className="description line-clamp-3 text-gray-500">
                {movie.moTa}
              </p>
              <Link to={`/detail_movie/${movie.maPhim}`}>
                <button className="bg-red-500 text-white px-4 py-2 rounded mt-5 cursor-pointer hover:bg-red-700 duration-300">
                  Buy Now
                </button>
              </Link>
            </div>
          );
        })}
      </Slider>
      <Modal
        title={selectedMovie?.tenPhim}
        open={isModalOpen}
        closable={{ "aria-label": "Custom Close Button" }}
        onCancel={handleCancel}
        width={800}
        centered
        footer={null}
        style={{ color: "white" }}
      >
        {selectedMovie && (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${
              selectedMovie.trailer.split("v=")[1]?.split("&")[0]
            }?autoplay=1`}
            title={selectedMovie.tenPhim}
            allow="autoplay"
          ></iframe>
        )}
      </Modal>
    </div>
  );
};

export default HotMovie;

import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { reviewServ } from "../../services/reviewServ";
import "./MovieReview.css";

const MovieReviews = () => {
  const [listReviews, setListReviews] = useState([]);
  const [listHotMovie, setListHotMovie] = useState([]);

  const innerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    (async () => {
      try {
        const popularMovie = await reviewServ.fetchPopularData();
        const listHotMovie = popularMovie.results.slice(4, 6);
        setListHotMovie(listHotMovie);

        const listFilmReview = [];
        for (const movie of listHotMovie) {
          const reviews = await reviewServ.fetchUserReviewBasedOnFilmId(
            movie.id
          );
          listFilmReview.push({
            ...reviews,
            poster_path: movie.poster_path,
            title: movie.title,
          });
        }

        setListReviews(listFilmReview);
      } catch (error) {
      }
    })();
  }, []);


  return (
    <div className="my-10 space-y-8" id="new_release">
      <h2 className="text-5xl text-center font-bold uppercase text-red-500">
        New Release
      </h2>
      {listReviews?.map((item, index) => {
        const newListHotMovie = listHotMovie.filter(
          (movie) => movie.id === item.id
        );


        return (
          <div key={index} className="mb-10 ">
            <div className="mb-4 ">
              <div className="grid grid-cols-2 gap-10">
                <img
                  src={`https://image.tmdb.org/t/p/original${newListHotMovie[0].backdrop_path}`}
                  alt={item.title || "Movie Poster"}
                  className="w-full object-center rounded-lg"
                />
                <div className="space-y-5">
                  <h2 className="text-3xl font-bold text-white">
                    {newListHotMovie[0].original_title}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {newListHotMovie[0].overview}
                  </p>
                  <p className="text-red-500 font-bold">
                    Release Day:{" "}
                    <span className="text-lime-400">
                      {newListHotMovie[0].release_date}
                    </span>
                  </p>
                  <div className="h-30 w-30 rounded-full border-8 bg-lime-500 text-white flex items-center justify-center text-2xl font-bold ">
                    {newListHotMovie[0].vote_average}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* <h3 className="text-2xl text-white text-center font-bold my-5">
                User Review
              </h3> */}
              <Slider {...innerSettings}>
                {item.results?.map((review, reviewIndex) => {
                  let imgURL = "";
                  if (review.author_details.avatar_path) {
                    imgURL = `https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`;
                  } else {
                    imgURL = "https://picsum.photos/185";
                  }
                  return (
                    <div key={reviewIndex} className="px-2">
                      <Card
                        size="default"
                        title={
                          <div className="grid grid-cols-2 py-3 gap-3">
                            <img
                              src={imgURL}
                              alt=""
                              className="rounded-lg w-full h-50 object-cover"
                            />
                            <div className="content space-y-1">
                              <h2 className="font-bold text-base text-white">
                                User Author:
                              </h2>
                              <p className="text-gray-400 text-xs">
                                {review.author || "anonymous"}
                              </p>
                              <h2 className="font-bold text-base text-white">
                                User Name:
                              </h2>
                              <p className="text-gray-500 text-xs ">
                                {review.author_details.name || "anonymous"}
                              </p>
                              <div className="flex space-x-4">
                                <p className="self-center font-bold text-white">
                                  Rating:
                                </p>
                                <p className="rounded-full bg-amber-400 h-10 w-10 flex items-center justify-center text-white">
                                  {review.author_details.rating || ""}
                                </p>
                              </div>
                            </div>
                          </div>
                        }
                        style={{ width: 300 }}
                      >
                        <p className="line-clamp-6 text-white">
                          {review.content}
                        </p>
                      </Card>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieReviews;

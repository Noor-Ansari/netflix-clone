import React, { useState, useEffect } from "react";
import request from "../request";
import axios from "../axios";
import "./Banner.css";

// if the movie description is longer than 150 characters, it will truncate that
const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

function Banner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(request.fetchNetflixOriginals);
      setBanner(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      // after every 10 seconds the banner will change automatically  
      setInterval(() => {
        setBanner(
          response.data.results[
            Math.floor(Math.random() * response.data.results.length - 1)
          ]
        );
      }, 10000);

    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${banner?.backdrop_path}"
          )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {banner?.name || banner?.title || banner?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(banner?.overview, 150)}
        </h1>
      </div>
    </header>
  );
}

export default Banner;

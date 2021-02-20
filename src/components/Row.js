import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const IMAGE_PATH = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "370",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container">
      <h2>{title}</h2>
      <div className="poster__rows">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`poster__row ${isLarge && "poster__large"}`}
            src={`${IMAGE_PATH}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={()=>handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <Youtube opts={opts} videoId={trailerUrl} />}
    </div>
  );
}

export default Row;

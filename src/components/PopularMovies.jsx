import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "f55d798f";
const API_URL = "https://www.omdbapi.com/";

const POPULAR_MOVIE_TITLES = [
  "Marvel",
  "Titanic",
  "Avatar",
  "The Dark Knight",
  "Interstellar",
  "The Avengers",
  "Joker",
  "Gladiator",
];

function PopularMovies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch multiple popular movies
  useEffect(() => {
    const fetchMovies = async () => {
      const promises = POPULAR_MOVIE_TITLES.map((title) =>
        fetch(`${API_URL}?apikey=${API_KEY}&t=${title}`).then((res) => res.json())
      );
      const results = await Promise.all(promises);
      setPopularMovies(results.filter((movie) => movie.Response === "True"));
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (popularMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % popularMovies.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [popularMovies]);

  return (
    <div className="popular-movies">
      <h2>Trending Movies</h2>
      {popularMovies.length > 0 && (
        <Link to={`/movie/${popularMovies[currentIndex].imdbID}`} className="carousel-container">
          <img
            src={popularMovies[currentIndex].Poster}
            alt={popularMovies[currentIndex].Title}
            className="carousel-image"
          />
          <p className="carousel-title">{popularMovies[currentIndex].Title}</p>
          <p className="carousel-genre">{popularMovies[currentIndex].Genre}</p>

        </Link>
      )}
    </div>
  );
}

export default PopularMovies;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PopularMovies from "./PopularMovies"; 

const API_KEY = "f55d798f";
const API_URL = "https://www.omdbapi.com/";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    if (query.length > 1) {
      fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`)
        .then(response => response.json())
        .then(data => {
          if (data.Search) setMovies(data.Search);
        });
    }
  }, [query]);

  const toggleFavorite = (movie) => {
    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
    const updatedFavorites = isFav
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      <h1>IMDB Clone</h1>
    
      <PopularMovies />
      
      <input
        type="text"
        className="search-box"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
       <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="movie-item">
            <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} className="movie-poster-small" /></Link>
            <Link to={`/movie/${movie.imdbID}`} className="movie-link">{movie.Title}</Link>
            <button
              className={`fav-button ${favorites.some((fav) => fav.imdbID === movie.imdbID) ? "selected" : ""}`}
              onClick={() => toggleFavorite(movie)}
            >
              {favorites.some((fav) => fav.imdbID === movie.imdbID) ? "🖤" : "🤍"}
            </button>
          </li>
        ))}
      </ul>
      {}
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "f55d798f";
const API_URL = "https://www.omdbapi.com/";

function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    fetch(`${API_URL}?apikey=${API_KEY}&i=${movieId}`)
      .then(response => response.json())
      .then(data => setMovie(data));
  }, [movieId]);

  const toggleFavorite = () => {
    if (!movie) return;
    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
    const updatedFavorites = isFav
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-container">
      <h1 className="movie-title">{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} className="movie-poster-large" />
      <p>Realeased on : {movie.Released}</p>
      <p>{movie.Genre}</p>
      <p>Available Audio: {movie.Language}</p>
      <p>{movie.Plot}</p>
      <p>IMDB Rating: {movie.imdbRating}</p>
      <button className="fav-button" onClick={toggleFavorite}>
        {favorites.some((fav) => fav.imdbID === movie.imdbID) ? "🖤" : "🤍"}
      </button>

    </div>
  );
}

export default MoviePage;

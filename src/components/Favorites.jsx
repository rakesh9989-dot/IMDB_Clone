import React, { useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((m) => m.imdbID !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="fav-container">
      <h1>My Favorite Movies</h1>
      <ul className="fav-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <li key={movie.imdbID} className="fav-item">
              <Link to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} className="movie-poster-small" /></Link>
              <Link to={`/movie/${movie.imdbID}`} className="movie-link">{movie.Title}</Link>
              <button className="remove-button" onClick={() => removeFromFavorites(movie.imdbID)}>🖤</button>
            </li>
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </ul>
    </div>
  );
}

export default Favorites;

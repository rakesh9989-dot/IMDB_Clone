import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MoviePage from "./components/MoviePage";
import Favorites from "./components/Favorites";
import Header from "./components/Header";
import Navigation from "./components/Navigation";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes> 
    </Router>
  );
}

export default App;

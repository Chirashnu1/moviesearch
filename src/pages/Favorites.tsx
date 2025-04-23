
import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="py-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center my-12">
          <p className="text-white/80 mb-4">You haven't added any movies to your favorites yet.</p>
          <Link to="/search" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors">
            Search for movies
          </Link>
        </div>
      ) : (
        <>
          <p className="text-white/70 mb-4 text-center">
            You have {favorites.length} favorite {favorites.length === 1 ? "movie" : "movies"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;

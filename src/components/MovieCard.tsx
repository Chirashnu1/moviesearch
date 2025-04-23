
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Movie } from "../services/movieApi";
import { useFavorites } from "../context/FavoritesContext";
import placeholderImage from "/placeholder.svg";

interface MovieCardProps {
  movie: Movie;
  showFavoriteButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showFavoriteButton = true }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(movie.imdbID);
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <div className="movie-card-hover glass-card rounded-lg overflow-hidden h-full flex flex-col">
        <div className="relative">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
            alt={movie.Title}
            className="w-full h-[300px] object-cover"
            loading="lazy"
          />
          {showFavoriteButton && (
            <button
              onClick={handleFavorite}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                isFav ? "bg-primary text-white" : "bg-black/50 text-white hover:bg-black/70"
              } transition-colors`}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={20} fill={isFav ? "white" : "none"} />
            </button>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg line-clamp-1">{movie.Title}</h3>
          <div className="mt-1 text-white/70 text-sm flex justify-between">
            <span>{movie.Year}</span>
            <span className="uppercase">{movie.Type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

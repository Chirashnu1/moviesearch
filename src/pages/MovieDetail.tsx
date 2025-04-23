import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { fetchMovieDetails, MovieDetail } from "../services/movieApi";
import { useFavorites } from "../context/FavoritesContext";
import placeholderImage from "/placeholder.svg";

// Add URLs for the image gallery
const galleryImages = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=400&q=80"
];

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const getMovieDetails = async () => {
      if (id) {
        setLoading(true);
        const details = await fetchMovieDetails(id);
        setMovie(details);
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  const handleFavorite = () => {
    if (!movie) return;
    
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center my-12">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <Link to="/search" className="text-primary hover:underline">
          Back to search
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(movie.imdbID);

  return (
    <div className="py-6 animate-fade-in">
      <Link to={-1 as any} className="flex items-center text-primary hover:underline mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="glass-card rounded-lg overflow-hidden">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : placeholderImage}
              alt={movie.Title}
              className="w-full h-auto"
            />
          </div>

          {/* IMAGE GALLERY BELOW POSTER */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {galleryImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Movie Gallery ${idx + 1}`}
                className="rounded-lg object-cover h-24 w-full"
                loading="lazy"
              />
            ))}
          </div>

          <button
            onClick={handleFavorite}
            className={`mt-4 w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
              isFav
                ? "bg-primary text-white"
                : "bg-secondary hover:bg-secondary/80 text-white"
            }`}
          >
            <Heart size={20} fill={isFav ? "white" : "none"} />
            {isFav ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>

        <div className="md:col-span-2">
          <div className="glass-card rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                {movie.Year}
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {movie.Runtime}
              </span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {movie.imdbRating !== "N/A" ? `Rated: ${movie.imdbRating}` : "Not Rated"}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="text-white/80">{movie.Plot !== "N/A" ? movie.Plot : "No plot available."}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-white/60">Genre</dt>
                    <dd>{movie.Genre !== "N/A" ? movie.Genre : "Unknown"}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Released</dt>
                    <dd>{movie.Released !== "N/A" ? movie.Released : "Unknown"}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Director</dt>
                    <dd>{movie.Director !== "N/A" ? movie.Director : "Unknown"}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Box Office</dt>
                    <dd>{movie.BoxOffice !== "N/A" ? movie.BoxOffice : "Unknown"}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Cast & Ratings</h2>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-white/60">Actors</dt>
                    <dd>{movie.Actors !== "N/A" ? movie.Actors : "Unknown"}</dd>
                  </div>
                  <div>
                    <dt className="text-white/60">IMDb Rating</dt>
                    <dd className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      {movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"} / 10
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/60">Awards</dt>
                    <dd>{movie.Awards !== "N/A" ? movie.Awards : "None"}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;

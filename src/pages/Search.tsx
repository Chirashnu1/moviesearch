
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useMovieSearch } from "../services/movieApi";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const [inputValue, setInputValue] = useState("");
  const { movies, loading, error, totalResults, setQuery, page, setPage } = useMovieSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="py-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Movies</h1>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for movies, TV shows, or episodes..."
            className="w-full bg-secondary/50 border border-white/10 rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary/80 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {error && !loading && (
        <div className="text-center my-12 text-white/80">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <p className="text-white/70 mb-4 text-center">
            Found {totalResults} results
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && inputValue === "" && (
        <div className="text-center my-12 text-white/80">
          <p>Enter a search term to find movies</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

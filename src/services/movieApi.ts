import { useState, useEffect } from "react";
import { toast } from "sonner";

// Replace with your own OMDb API key
// This is a sample key and might not be active
const API_KEY = "97d51583";
const BASE_URL = "https://www.omdbapi.com";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Plot: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  BoxOffice: string;
  Awards: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const useMovieSearch = (initialQuery: string = "", initialPage: number = 1) => {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (searchQuery: string, pageNum: number) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}&page=${pageNum}`
      );
      const data: SearchResponse = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setError(data.Error || "No movies found");
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err) {
      setError("Failed to fetch movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchMovies(query, page);
    }
  }, [query, page]);

  return {
    movies,
    loading,
    error,
    totalResults,
    setQuery,
    page,
    setPage,
  };
};

export const fetchMovieDetails = async (imdbID: string): Promise<MovieDetail | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    const data = await response.json();

    if (data.Response === "True") {
      return data as MovieDetail;
    } else {
      toast.error(data.Error || "Failed to fetch movie details");
      return null;
    }
  } catch (error) {
    toast.error("Failed to fetch movie details");
    console.error(error);
    return null;
  }
};

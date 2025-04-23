
import React, { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../services/movieApi";
import { toast } from "sonner";

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("movieFavorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Error parsing favorites:", error);
        localStorage.removeItem("movieFavorites");
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    if (!isFavorite(movie.imdbID)) {
      setFavorites((prev) => [...prev, movie]);
      toast.success(`Added "${movie.Title}" to favorites`);
    }
  };

  const removeFavorite = (id: string) => {
    const movie = favorites.find(fav => fav.imdbID === id);
    setFavorites((prev) => prev.filter((movie) => movie.imdbID !== id));
    if (movie) {
      toast.success(`Removed "${movie.Title}" from favorites`);
    }
  };

  const isFavorite = (id: string) => {
    return favorites.some((movie) => movie.imdbID === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};


import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, Home } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-movie-dark/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <Link to="/" className="text-primary font-bold text-2xl mb-2 sm:mb-0">
            Film Fanatic
          </Link>
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                location.pathname === "/" 
                  ? "bg-primary/20 text-primary" 
                  : "hover:bg-white/5 text-white/80 hover:text-white"
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/search" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                location.pathname === "/search" 
                  ? "bg-primary/20 text-primary" 
                  : "hover:bg-white/5 text-white/80 hover:text-white"
              }`}
            >
              <Search size={18} />
              <span>Search</span>
            </Link>
            <Link 
              to="/favorites" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                location.pathname === "/favorites" 
                  ? "bg-primary/20 text-primary" 
                  : "hover:bg-white/5 text-white/80 hover:text-white"
              }`}
            >
              <Heart size={18} />
              <span>Favorites</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-movie-dark border-t border-white/10 py-4">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm">
          <p>Film Fanatic © {new Date().getFullYear()} - Data from OMDb API</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

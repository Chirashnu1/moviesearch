
import React from "react";
import { Link } from "react-router-dom";
import { Search, Heart } from "lucide-react";

const Home = () => {
  return (
    <div className="py-8 animate-fade-in">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent">
          Welcome to Film Fanatic
        </h1>
        <p className="text-xl text-white/80 mb-8">
          Discover, explore, and save your favorite movies
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Link to="/search" className="block">
            <div className="glass-card rounded-xl p-8 h-full flex flex-col items-center justify-center movie-card-hover">
              <Search size={48} className="text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Search Movies</h2>
              <p className="text-white/70 text-center">
                Find movies by title, year, or type
              </p>
            </div>
          </Link>
          
          <Link to="/favorites" className="block">
            <div className="glass-card rounded-xl p-8 h-full flex flex-col items-center justify-center movie-card-hover">
              <Heart size={48} className="text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your Favorites</h2>
              <p className="text-white/70 text-center">
                View and manage your favorite movies
              </p>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="mt-16 glass-card rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">About Film Fanatic</h2>
        <p className="text-white/80 text-center max-w-2xl mx-auto">
          Film Fanatic is your personal movie companion. Search for films, view detailed information,
          and create your own collection of favorites. Powered by the OMDb API, our app gives you
          access to a vast database of movies, all in one place.
        </p>
      </div>
    </div>
  );
};

export default Home;

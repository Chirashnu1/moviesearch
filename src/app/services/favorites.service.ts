
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Movie[] = [];
  private favoritesSubject = new BehaviorSubject<Movie[]>([]);

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      try {
        this.favorites = JSON.parse(storedFavorites);
        this.favoritesSubject.next(this.favorites);
      } catch (error) {
        console.error('Error parsing favorites:', error);
        localStorage.removeItem('movieFavorites');
      }
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('movieFavorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }

  getFavorites(): Observable<Movie[]> {
    return this.favoritesSubject.asObservable();
  }

  addFavorite(movie: Movie): void {
    if (!this.isFavorite(movie.imdbID)) {
      this.favorites = [...this.favorites, movie];
      this.saveFavorites();
    }
  }

  removeFavorite(id: string): void {
    this.favorites = this.favorites.filter(movie => movie.imdbID !== id);
    this.saveFavorites();
  }

  isFavorite(id: string): boolean {
    return this.favorites.some(movie => movie.imdbID === id);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie, MovieDetail, SearchResponse } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // Replace with your own OMDb API key
  private API_KEY = '97d51583';
  private BASE_URL = 'https://www.omdbapi.com';

  constructor(private http: HttpClient) {}

  searchMovies(query: string, page: number = 1): Observable<{ movies: Movie[], totalResults: number }> {
    if (!query.trim()) {
      return of({ movies: [], totalResults: 0 });
    }

    return this.http.get<SearchResponse>(`${this.BASE_URL}?apikey=${this.API_KEY}&s=${query}&page=${page}`)
      .pipe(
        map(response => {
          if (response.Response === 'True') {
            return {
              movies: response.Search,
              totalResults: parseInt(response.totalResults)
            };
          } else {
            throw new Error(response.Error || 'No movies found');
          }
        }),
        catchError(error => {
          console.error('Error searching movies:', error);
          return of({ movies: [], totalResults: 0 });
        })
      );
  }

  getMovieDetails(imdbID: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.BASE_URL}?apikey=${this.API_KEY}&i=${imdbID}&plot=full`)
      .pipe(
        map(response => {
          if (response.Response === 'True') {
            return response as MovieDetail;
          } else {
            throw new Error('Failed to fetch movie details');
          }
        }),
        catchError(error => {
          console.error('Error fetching movie details:', error);
          throw error;
        })
      );
  }
}

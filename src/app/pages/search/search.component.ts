
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl('');
  movies: Movie[] = [];
  loading = false;
  error = '';
  totalResults = 0;
  currentPage = 1;
  
  constructor(private movieService: MovieService) {}
  
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        this.currentPage = 1;
        this.loading = true;
      }),
      switchMap(query => this.movieService.searchMovies(query || '', this.currentPage))
    ).subscribe({
      next: (result) => {
        this.movies = result.movies;
        this.totalResults = result.totalResults;
        this.loading = false;
        this.error = '';
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch movies';
        this.loading = false;
        this.movies = [];
        this.totalResults = 0;
      }
    });
  }
  
  search(): void {
    this.loading = true;
    this.movieService.searchMovies(this.searchControl.value || '', this.currentPage)
      .subscribe({
        next: (result) => {
          this.movies = result.movies;
          this.totalResults = result.totalResults;
          this.loading = false;
          this.error = '';
        },
        error: (err) => {
          this.error = err.message || 'Failed to fetch movies';
          this.loading = false;
          this.movies = [];
          this.totalResults = 0;
        }
      });
  }
  
  changePage(newPage: number): void {
    if (newPage < 1 || newPage > this.totalPages) return;
    
    this.currentPage = newPage;
    this.search();
  }
  
  get totalPages(): number {
    return Math.ceil(this.totalResults / 10);
  }
}

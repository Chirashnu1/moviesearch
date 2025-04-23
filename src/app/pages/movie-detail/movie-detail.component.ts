
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetail } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { FavoritesService } from '../../services/favorites.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: MovieDetail | null = null;
  loading = true;
  error = '';
  placeholderImage = '/placeholder.svg';
  
  galleryImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=400&q=80"
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private movieService: MovieService,
    private favoritesService: FavoritesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovieDetails(id);
    } else {
      this.router.navigate(['/search']);
    }
  }

  loadMovieDetails(id: string): void {
    this.loading = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load movie details';
        this.loading = false;
        this.toastService.error(this.error);
      }
    });
  }

  isFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id);
  }

  toggleFavorite(): void {
    if (!this.movie) return;
    
    if (this.isFavorite(this.movie.imdbID)) {
      this.favoritesService.removeFavorite(this.movie.imdbID);
      this.toastService.success(`Removed "${this.movie.Title}" from favorites`);
    } else {
      this.favoritesService.addFavorite(this.movie);
      this.toastService.success(`Added "${this.movie.Title}" to favorites`);
    }
  }
}


import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { FavoritesService } from '../../services/favorites.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() showFavoriteButton = true;
  
  placeholderImage = '/placeholder.svg';

  constructor(
    private favoritesService: FavoritesService,
    private toastService: ToastService
  ) {}

  isFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id);
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.isFavorite(this.movie.imdbID)) {
      this.favoritesService.removeFavorite(this.movie.imdbID);
      this.toastService.success(`Removed "${this.movie.Title}" from favorites`);
    } else {
      this.favoritesService.addFavorite(this.movie);
      this.toastService.success(`Added "${this.movie.Title}" to favorites`);
    }
  }
}

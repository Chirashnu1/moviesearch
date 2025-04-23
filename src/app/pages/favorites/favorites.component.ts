
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Movie[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }
}


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

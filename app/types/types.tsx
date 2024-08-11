// ../types/types.ts

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    trailer_url?: string;  // Optional field if you have a trailer URL
    full_movie_url?: string;  // Optional field if you have a full movie URL
  }
  
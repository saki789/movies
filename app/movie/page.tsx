'use client'
import React, { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/mysql/movies');
      const movieData: Movie[] = await res.json();
      setMovies(movieData);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <ul>
        {movies.map((m) => (
          <li key={m.id}>
            <p>{m.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
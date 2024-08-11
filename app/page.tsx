  'use client';

  import React, { useState, useEffect } from 'react';
  import MovieTable from './table/movieTable';

  interface Movie {
    id?: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }

  const Home: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
      // Fetch existing movies from the API when the component mounts
      const fetchMovies = async () => {
        try {
          const response = await fetch('/api/mysql/movies');
          const result = await response.json();
          if (response.ok) {
            setMovies(result);
          } else {
            console.error('Failed to fetch movies:', result.error);
          }
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };

      fetchMovies();
    }, []);

    const handleSaveMovie = async (movieData: Movie): Promise<void> => {
      try {
        const response = await fetch('/api/mysql/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData),
        });

        const result = await response.json();
        if (response.ok) {
          setMovies((prevMovies) => [...prevMovies, result]);
        } else {
          console.error('Failed to save movie:', result.error);
        }
      } catch (error) {
        console.error('Error saving movie:', error);
      }
    };

    const handleDeleteMovie = async (id: number): Promise<void> => {
      try {
        const response = await fetch(`/api/mysql/movies/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== id));
        } else {
          const result = await response.json();
          console.error('Failed to delete movie:', result.error);
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    };

    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Movie Management</h1>
        <MovieTable/>
      </div>
    );
  };

  export default Home;

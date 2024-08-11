import React, { useEffect, useState } from 'react';
import MovieForm from '../form/MovieFormEdit';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieTable: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // State to hold the currently selected movie

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/mysql/movies', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

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

  const deleteMovie = async (id: number) => {
    try {
      const response = await fetch(`/api/mysql/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        setMovies(movies.filter(movie => movie.id !== id));
      } else {
        console.error('Failed to delete movie:', result.error);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie); // Set the selected movie for editing
  };

  const handleSave = async (updatedMovie: Movie) => {
    try {
      const response = await fetch('/api/mysql/movies', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });

      const result = await response.json();
      if (response.ok) {
        setMovies(movies.map(movie => (movie.id === updatedMovie.id ? updatedMovie : movie)));
        setSelectedMovie(null); // Clear the selected movie after saving
      } else {
        console.error('Failed to update movie:', result.error);
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Overview</th>
            <th>Poster Path</th>
            <th>Release Date</th>
            <th>Vote Average</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.overview}</td>
              <td>{movie.poster_path}</td>
              <td>{movie.release_date}</td>
              <td>{movie.vote_average}</td>
              <td>
                <button onClick={() => handleEdit(movie)}>Edit</button>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MovieForm movie={selectedMovie} onSave={handleSave} /> {/* Render the MovieForm component */}
    </div>
  );
};

export default MovieTable;

import React, { useState, useEffect } from 'react';
import { Movie } from '../types'; // Import the shared type
import styles from './../styles/form.module.scss';

interface MovieFormProps {
  movie?: Movie | null;
  onSave: (movieData: Movie) => Promise<void>;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSave }) => {
  const [title, setTitle] = useState<string>(movie?.title || '');
  const [overview, setOverview] = useState<string>(movie?.overview || '');
  const [posterPath, setPosterPath] = useState<string>(movie?.poster_path || '');
  const [releaseDate, setReleaseDate] = useState<string>(movie?.release_date || '');
  const [voteAverage, setVoteAverage] = useState<number | ''>(movie?.vote_average || '');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setOverview(movie.overview);
      setPosterPath(movie.poster_path);
      setReleaseDate(movie.release_date);
      setVoteAverage(movie.vote_average);
    }
  }, [movie]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (voteAverage === '' || isNaN(Number(voteAverage))) {
      console.error('Vote average must be a valid number');
      return;
    }

    const movieData: Movie = { 
      id: movie?.id ?? 0, 
      title, 
      overview, 
      poster_path: posterPath, 
      release_date: releaseDate, 
      vote_average: Number(voteAverage),
    };

    try {
      await onSave(movieData);
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  if (!movie) {
    return null; 
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContain}>
          <div className={styles.formTitle}>
            <label className={styles.formLab} htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formOverview}>
            <label className={styles.formLab} htmlFor="overview">Overview</label>
            <textarea
              id="overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={styles.formPoster}>
            <label className={styles.formLab} htmlFor="posterPath">Poster Path</label>
            <input
              id="posterPath"
              type="text"
              value={posterPath}
              onChange={(e) => setPosterPath(e.target.value)}
            />
          </div>
          <div className={styles.formRelease}>
            <label className={styles.formLab} htmlFor="releaseDate">Release Date</label>
            <input
              id="releaseDate"
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>
          <div className={styles.formVote}>
            <label className={styles.formLab} htmlFor="voteAverage">Vote Average</label>
            <input
              id="voteAverage"
              type="number"
              step="0.1"
              value={voteAverage}
              onChange={(e) => setVoteAverage(Number(e.target.value))}
              required
            />
          </div>
          <button className={styles.formButton} type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;

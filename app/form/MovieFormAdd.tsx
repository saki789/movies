"use client";

import React, { useState } from 'react';
import styles from './../styles/form.module.scss';

interface MovieFormProps {
  movie?: Movie;
  onSave: (movieData: Movie) => void;
}

interface Movie {
  id?: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieFormAdd: React.FC<MovieFormProps> = ({ movie, onSave }) => {
  const [title, setTitle] = useState<string>(movie?.title || '');
  const [overview, setOverview] = useState<string>(movie?.overview || '');
  const [posterPath, setPosterPath] = useState<string>(movie?.poster_path || '');
  const [releaseDate, setReleaseDate] = useState<string>(movie?.release_date || '');
  const [voteAverage, setVoteAverage] = useState<number | ''>(movie?.vote_average || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const movieData: Movie = { 
      title, 
      overview, 
      poster_path: posterPath, 
      release_date: releaseDate, 
      vote_average: voteAverage as number 
    };

    try {
      let response;
      if (movie?.id) {
        response = await fetch(`/api/mysql/movies`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...movieData, id: movie.id }),
        });
      } else {
        response = await fetch('/api/mysql/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData),
        });
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save movie');
      }
      console.log('Save result:', result);
      onSave(movieData); // Call onSave after successful save
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

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

export default MovieFormAdd;

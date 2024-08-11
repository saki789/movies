import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

interface Movie {
  id?: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MainFormProps {
  movie?: Movie | null;
  onSave: (movie: Movie) => void;
  onClose: () => void;
}

const MainForm: React.FC<MainFormProps> = ({ movie, onSave, onClose }) => {
  const [formState, setFormState] = useState<Movie>({
    title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: 0,
  });

  useEffect(() => {
    if (movie) {
      setFormState(movie);
    } else {
      setFormState({
        title: '',
        overview: '',
        poster_path: '',
        release_date: '',
        vote_average: 0,
      });
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{movie?.id ? 'Edit Movie' : 'Add Movie'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                value={formState.title}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="overview"
                label="Overview"
                value={formState.overview}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="poster_path"
                label="Poster Path"
                value={formState.poster_path}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="release_date"
                label="Release Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formState.release_date}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="vote_average"
                label="Vote Average"
                type="number"
                InputLabelProps={{ shrink: true }}
                value={formState.vote_average}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MainForm;

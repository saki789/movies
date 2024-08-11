import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  styled,
} from '@mui/material';

interface Movie {
  id?: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: string;
  runtime?: number;
  language?: string;
  movie_path?: string;
  trailer_path?: string;
  budget?: string;
  box_office?: string;
  country?: string;
  director?: string;
}

interface MainFormProps {
  movie?: Movie | null;
  onSave: (movie: Movie) => void;
  onClose: () => void;
}

const CustomDialogTitle = styled(DialogTitle)({
  backgroundColor: '#e3f2fd', // Soft blue color
});

const CustomDialogActions = styled(DialogActions)({
  backgroundColor: '#e3f2fd', // Soft blue color
});

const MainForm: React.FC<MainFormProps> = ({ movie, onSave, onClose }) => {
  const [formState, setFormState] = useState<Movie>({
    title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: '',
    runtime: 0,
    language: '',
    movie_path: '',
    trailer_path: '',
    budget: '',
    box_office: '',
    country: '',
    director: '',
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
        vote_average: '',
        runtime: 0,
        language: '',
        movie_path: '',
        trailer_path: '',
        budget: '',
        box_office: '',
        country: '',
        director: '',
      });
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: name === 'vote_average' ? value : 
              (name === 'runtime' ? parseFloat(value) : 
              (name === 'budget' || name === 'box_office' ? value : value)),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <CustomDialogTitle>{movie?.id ? 'Edit Movie' : 'Add Movie'}</CustomDialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* First Row */}
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                name="release_date"
                label="Release Date"
                type="date"
                value={formState.release_date}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Second Row */}
            <Grid item xs={12} sm={4}>
              <TextField
                name="vote_average"
                label="Vote Average"
                type="text"
                value={formState.vote_average}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="runtime"
                label="Runtime (mins)"
                type="number"
                value={formState.runtime || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="language"
                label="Language"
                value={formState.language}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>

            {/* Third Row */}
            <Grid item xs={12} sm={4}>
              <TextField
                name="movie_path"
                label="Movie Path"
                value={formState.movie_path}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="trailer_path"
                label="Trailer Path"
                value={formState.trailer_path}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="budget"
                label="Budget"
                value={formState.budget}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>

            {/* Fourth Row */}
            <Grid item xs={12} sm={4}>
              <TextField
                name="box_office"
                label="Box Office"
                value={formState.box_office}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="country"
                label="Country"
                value={formState.country}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="director"
                label="Director"
                value={formState.director}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Grid>

            {/* Fifth Row */}
            <Grid item xs={12}>
              <TextField
                name="overview"
                label="Overview"
                value={formState.overview}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="dense"
                multiline
                rows={4} // Adjust number of rows for the textarea
              />
            </Grid>
          </Grid>
          <CustomDialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </CustomDialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MainForm;

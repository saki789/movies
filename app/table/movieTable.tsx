import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Box, Button } from '@mui/material';
import MainForm from '../form/MainForm';

interface Movie {
  id?: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieTable: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

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

  const deleteMovie = async (id: number) => {
    try {
      const response = await fetch(`/api/mysql/movies/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMovies(movies.filter(movie => movie.id !== id));
      } else {
        const result = await response.json();
        console.error('Failed to delete movie:', result.error);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleSave = async (movie: Movie) => {
    try {
      const method = movie.id ? 'PUT' : 'POST';
      const response = await fetch(`/api/mysql/movies${movie.id ? `/${movie.id}` : ''}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      const result = await response.json();
      if (response.ok) {
        if (method === 'POST') {
          setMovies([...movies, result]);
        } else {
          setMovies(movies.map(m => (m.id === movie.id ? result : m)));
        }
        setSelectedMovie(null);
        setFormVisible(false);
      } else {
        console.error(`Failed to ${method === 'POST' ? 'add' : 'update'} movie:`, result.error);
      }
    } catch (error) {
      console.error(`Error ${movie.id ? 'updating' : 'adding'} movie:`, error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Movie>[]>(
    () => [
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <Box className="flex gap-2">
            <Button
              onClick={() => {
                setSelectedMovie(row.original);
                setFormVisible(true);
              }}
              variant="contained"
              color="warning"
              size="small"
            >
              Edit
            </Button>
            <Button
              onClick={() => row.original.id && deleteMovie(row.original.id)}
              variant="contained"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Box>
        ),
        enablePinning: true,
      },
      { accessorKey: 'title', header: 'Title', size: 150 },
      { accessorKey: 'overview', header: 'Overview', size: 250 },
      { accessorKey: 'poster_path', header: 'Poster Path', size: 200 },
      { accessorKey: 'release_date', header: 'Release Date', size: 150 },
      { accessorKey: 'vote_average', header: 'Vote Average', size: 120 },
    ],
    [movies],
  );

  return (
    <div className="table-container">
      <Box className="mb-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedMovie(null);
            setFormVisible(true);
          }}
        >
          Add Movie
        </Button>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={movies}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enableColumnPinning
        enableFacetedValues
        enableRowSelection
        initialState={{
          showColumnFilters: true,
          density: 'compact',
          showGlobalFilter: true,
          columnPinning: {
            left: ['actions', 'mrt-row-expand', 'mrt-row-select'],
          },
        }}
        paginationDisplayMode="pages"
        positionToolbarAlertBanner="bottom"
        muiSearchTextFieldProps={{
          size: 'small',
          variant: 'outlined',
        }}
        muiPaginationProps={{
          color: 'secondary',
          rowsPerPageOptions: [10, 20, 30],
        }}
        muiTablePaperProps={{
          style: {
            overflowX: 'auto',
            maxWidth: '100%',
          },
        }}
      />
      {isFormVisible && (
        <MainForm
          movie={selectedMovie}
          onSave={handleSave}
          onClose={() => {
            setSelectedMovie(null);
            setFormVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default MovieTable;

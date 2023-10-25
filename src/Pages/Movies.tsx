import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { useLoaderData } from 'react-router-dom';
import { MovieList } from '@/components/Movies/MovieList';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: amber[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: deepOrange[900],
        paper: deepOrange[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
  typography: {
    fontSize: 16,
  },
});

const darkModeTheme = createTheme(getDesignTokens('dark'));

interface ApiResponse {
  data: {
    total_pages: number;
  };
}

const Movies = ({ setPage, currentPage }): JSX.Element => {
  const response = useLoaderData() as ApiResponse;

  const { data } = response;

  const handlePagination = e => {
    const pageNumber = parseInt(e.target.textContent, 10);
    const NextAndPrev = e.target.dataset.testid;
    const click = pageNumber || NextAndPrev;

    switch (typeof click) {
      case 'number':
        setPage(pageNumber);
        break;
      case 'string':
        if (NextAndPrev === 'NavigateNextIcon') {
          setPage(prev => prev + 1);
        } else if (NextAndPrev === 'NavigateBeforeIcon' && currentPage > 1) {
          setPage(prev => prev - 1);
        } else {
          setPage(1);
        }
        break;
      default:
        setPage(1);
    }
  };

  return (
    <>
      <div className="max-w-xxl mx-auto flex my-12 justify-center items-start gap-8">
        <MovieList />
      </div>
      <ThemeProvider theme={darkModeTheme}>
        <section className="max-w-xxl mx-auto flex items-center justify-center my-12">
          <Pagination
            count={data.total_pages > 25 ? 25 : data.total_pages}
            variant="outlined"
            shape="rounded"
            sx={{ button: { padding: '15px' } }}
            siblingCount={1}
            onChange={handlePagination}
          />
        </section>
      </ThemeProvider>
    </>
  );
};

export default Movies;

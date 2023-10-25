import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

import { MovieList } from '@/components/Movies/MovieList';

// const darkTheme = createTheme({
//   palette: {
//     mode,
//   },
// });

// console.log(darkTheme);

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
console.log(darkModeTheme);

const Movies = (): JSX.Element => {
  return (
    <>
      <div className="max-w-xxl mx-auto flex my-12 justify-center items-start gap-8">
        <MovieList />
      </div>
      <ThemeProvider theme={darkModeTheme}>
        <section className="max-w-xxl mx-auto flex items-center justify-center my-12">
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            sx={{ button: { padding: '15px' } }}
          />
        </section>
      </ThemeProvider>
    </>
  );
};

export default Movies;

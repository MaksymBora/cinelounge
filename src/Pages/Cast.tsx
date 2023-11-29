import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CastList } from '@/components/Cast/CastList';
import { getDesignTokens } from '@/styleTheme/MuiPallete';
import { AppContext } from '@/context/app-context';

interface ApiResponse {
  data: {
    total_pages: number;
  };
}

function Cast({ setPage, currentPage }): JSX.Element {
  const { darkMode } = useContext(AppContext);
  const response = useLoaderData() as ApiResponse;

  const { data } = response;

  const themeValue = darkMode ? 'dark' : 'light';
  const darkModeTheme = createTheme(getDesignTokens(themeValue));

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
      <div className="max-w-xxl mx-auto flex my-12 justify-center items-start gap-x-8">
        <CastList />
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
}

export default Cast;

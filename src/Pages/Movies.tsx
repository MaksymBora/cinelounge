import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { MovieList } from '@/components/Movies/MovieList';
import { getDesignTokens } from '@/styleTheme/MuiPallete';
import { FilterBtn } from '@/components/FilterMenu/FilterBtn';
import { MovieFilterMenu } from '@/components/FilterMenu/MovieFilterMenu';
import { FilterContext } from '@/context/filterMenu-context';
import { FilterDataState } from '@/context/filterDataState';

const darkModeTheme = createTheme(getDesignTokens('dark'));

interface ApiResponse {
  data: {
    total_pages: number;
  };
}

const Movies = ({ setPage, currentPage }): JSX.Element => {
  const { filterMenuOpen } = useContext(FilterContext);
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
      <FilterBtn />
      <FilterDataState>
        <div className="max-w-xxl mx-auto flex my-12 justify-center items-start gap-x-8">
          {filterMenuOpen && <MovieFilterMenu />}
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
      </FilterDataState>
    </>
  );
};

export default Movies;

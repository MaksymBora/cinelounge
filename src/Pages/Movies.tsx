import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MovieList } from '@/components/Movies/MovieList';
import { getDesignTokens } from '@/styleTheme/MuiPallete';
import { FilterBtn } from '@/components/Movies/FilterMenu/FilterBtn';
import { MovieFilterMenu } from '@/components/Movies/FilterMenu/MovieFilterMenu';
import { FilterDataContext } from '@/context/filterData-context';
import { AppContext } from '@/context/app-context';
import { getSortedBy } from '@/service/serviceFilterMovies';

const darkModeTheme = createTheme(getDesignTokens('dark'));

const Movies = (): JSX.Element => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const { shouldFetchData, setShouldFetchData } = useContext(AppContext);
  const { page, setPage } = useContext(AppContext);
  const { moviesData, setMoviesData } = useContext(FilterDataContext);
  const { MoviesformData } = useContext(FilterDataContext);

  useEffect(() => {
    const sort = 'popularity.desc';
    const fetchAllMovies = async (sortData, filterDefaultData, pageNumber) => {
      try {
        const res = await getSortedBy(sortData, filterDefaultData, pageNumber);
        if (res) {
          setMoviesData(res.data);
          setShouldFetchData(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (shouldFetchData && (moviesData === null || page !== 1 || page === 1)) {
      fetchAllMovies(sort, MoviesformData, page);
    }
  }, [
    moviesData,
    setMoviesData,
    page,
    shouldFetchData,
    setShouldFetchData,
    MoviesformData,
  ]);

  const handlePagination = e => {
    const pageNumber = parseInt(e.target.textContent, 10);
    const NextAndPrev = e.target.dataset.testid;
    const click = pageNumber || NextAndPrev;
    setShouldFetchData(true);

    switch (typeof click) {
      case 'number':
        setPage(pageNumber);
        break;
      case 'string':
        if (NextAndPrev === 'NavigateNextIcon') {
          setPage(prev => prev + 1);
        } else if (NextAndPrev === 'NavigateBeforeIcon' && page > 1) {
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
      <FilterBtn
        filterMenuOpen={filterMenuOpen}
        setFilterMenuOpen={setFilterMenuOpen}
      />

      <div className="max-w-xxl mx-auto flex my-12 justify-center items-start gap-x-8">
        {filterMenuOpen && <MovieFilterMenu />}
        <MovieList moviesData={moviesData} filterMenuOpen={filterMenuOpen} />
      </div>

      <ThemeProvider theme={darkModeTheme}>
        <section className="max-w-xxl mx-auto flex items-center justify-center my-12">
          {moviesData?.total_pages && (
            <Pagination
              count={
                moviesData?.total_pages > 25 ? 25 : moviesData?.total_pages
              }
              variant="outlined"
              shape="rounded"
              sx={{ button: { padding: '15px' } }}
              siblingCount={1}
              onChange={handlePagination}
            />
          )}
        </section>
      </ThemeProvider>
    </>
  );
};

export default Movies;

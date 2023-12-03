import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MovieList } from '@/components/Movies/MovieList';
import { getDesignTokens } from '@/styleTheme/MuiPallete';
import { FilterBtn } from '@/components/Movies/FilterMenu/FilterBtn';
import { MovieFilterMenu } from '@/components/Movies/FilterMenu/MovieFilterMenu';
import { FilterDataContext } from '@/context/filterData-context';
import { AppContext } from '@/context/app-context';
import { getSortedBy } from '@/service/serviceFilterMovies';

const Movies = ({ signedIn }): JSX.Element => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const { shouldFetchData, setShouldFetchData } = useContext(AppContext);
  const { page, setPage } = useContext(AppContext);
  const { moviesData, setMoviesData } = useContext(FilterDataContext);
  const { MoviesformData } = useContext(FilterDataContext);
  const { darkMode } = useContext(AppContext);

  const themeValue = darkMode ? 'dark' : 'light';
  const darkModeTheme = createTheme(getDesignTokens(themeValue));

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

    // Show notification when logged in
    if (signedIn) {
      toast.custom(
        t => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://avatars.githubusercontent.com/u/123206568?v=4"
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Maksym (Main Developer)
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    I hope you enjoy your time! 😉
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                type="button"
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    }
  }, [
    moviesData,
    setMoviesData,
    page,
    shouldFetchData,
    setShouldFetchData,
    MoviesformData,
    signedIn,
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
        <Toaster position="bottom-left" reverseOrder />
      </ThemeProvider>
    </>
  );
};

export default Movies;

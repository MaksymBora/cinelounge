import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material';
import { useContext, useEffect } from 'react';
import { MovieList } from '@/components/Movies/MovieList';
import { getDesignTokens } from '@/styleTheme/MuiPallete';
import { FilterBtn } from '@/components/FilterMenu/FilterBtn';
import { MovieFilterMenu } from '@/components/FilterMenu/MovieFilterMenu';
import { FilterContext } from '@/context/filterMenu-context';
import { FilterDataContext } from '@/context/filterData-context';
import { AppContext } from '@/context/app-context';
import { getSortedBy } from '@/service/serviceFilter';

const darkModeTheme = createTheme(getDesignTokens('dark'));

const Movies = (): JSX.Element => {
  const { shouldFetchData, setShouldFetchData } = useContext(AppContext);
  const { page, setPage } = useContext(AppContext);
  const { filterMenuOpen } = useContext(FilterContext);
  const { filterData, setFilterData } = useContext(FilterDataContext);
  const { formData } = useContext(FilterDataContext);

  useEffect(() => {
    const sort = 'popularity.desc';
    const fetchAllMovies = async (sortData, filterDefaultData, pageNumber) => {
      try {
        const res = await getSortedBy(sortData, filterDefaultData, pageNumber);
        if (res) {
          setFilterData(res.data);
          setShouldFetchData(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (shouldFetchData && (filterData === null || page !== 1 || page === 1)) {
      fetchAllMovies(sort, formData, page);
    }
  }, [
    filterData,
    setFilterData,
    page,
    shouldFetchData,
    setShouldFetchData,
    formData,
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
      <FilterBtn />

      <div className="max-w-xxl mx-auto flex my-12 justify-center items-start gap-x-8">
        {filterMenuOpen && <MovieFilterMenu />}
        <MovieList filterData={filterData} />
      </div>

      <ThemeProvider theme={darkModeTheme}>
        <section className="max-w-xxl mx-auto flex items-center justify-center my-12">
          {filterData?.total_pages && (
            <Pagination
              count={
                filterData?.total_pages > 25 ? 25 : filterData?.total_pages
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

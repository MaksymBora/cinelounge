import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material';
import { useContext, useEffect } from 'react';
import { MovieList } from '@/components/Movies/MovieList';
import { getDesignTokens } from '@/styleTheme/MuiPallete';
import { FilterBtn } from '@/components/FilterMenu/FilterBtn';
import { MovieFilterMenu } from '@/components/FilterMenu/MovieFilterMenu';
import { FilterContext } from '@/context/filterMenu-context';
import { FilterDataContext } from '@/context/filterData-context';
import { getAllMovies } from '@/service/serviceMovies';

const darkModeTheme = createTheme(getDesignTokens('dark'));

// interface ApiResponse {
//   data: {
//     total_pages: number;
//   };
// }

// interface MovieListProps {
//   poster_path: string;
//   title: string;
//   release_date: string;
//   id: number;
//   vote_average: number;
// }

// interface ApiResponse {
//   data: {
//     results: MovieListProps[];
//     page: number;
//     total_pages: number;
//   };
// }

const Movies = ({ setPage, pageNum, currentPage }): JSX.Element => {
  const { filterMenuOpen } = useContext(FilterContext);
  const { filterData, setFilterData } = useContext(FilterDataContext);

  useEffect(() => {
    if (filterData === null) {
      const fetchAllMovies = async () => {
        try {
          const res = await getAllMovies(pageNum);
          if (res) {
            setFilterData(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAllMovies();
    }
  }, [filterData, setFilterData, pageNum]);
  console.log(filterData);

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

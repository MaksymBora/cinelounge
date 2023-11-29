import { ThemeProvider, createTheme } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from 'react';
import { ShowsList } from '@/components/Shows/ShowsList';
import { getDesignTokens } from '@/styleTheme/MuiPallete';
import { FilterBtn } from '@/components/Movies/FilterMenu/FilterBtn';
import { ShowFilterMenu } from '@/components/Shows/FilterMenu/ShowFilterMenu';
import { AppContext } from '@/context/app-context';
import { FilterDataContext } from '@/context/filterData-context';
import { getShowsSortedBy } from '@/service/serviceFilterMovies';

const darkModeTheme = createTheme(getDesignTokens('dark'));

function Shows(): JSX.Element {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const { shouldFetchData, setShouldFetchData } = useContext(AppContext);
  const { showsPage, setShowsPage } = useContext(AppContext);
  const { showsData, setShowsData } = useContext(FilterDataContext);
  const { showsFormData } = useContext(FilterDataContext);

  useEffect(() => {
    const sort = 'popularity.desc';
    const fetchAllMovies = async (sortData, filterDefaultData, pageNumber) => {
      try {
        const res = await getShowsSortedBy(
          sortData,
          filterDefaultData,
          pageNumber
        );
        if (res) {
          setShowsData(res.data);
          setShouldFetchData(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (
      shouldFetchData &&
      (showsData === null || showsPage !== 1 || showsPage === 1)
    ) {
      fetchAllMovies(sort, showsFormData, showsPage);
    }
  }, [
    showsData,
    setShowsData,
    showsPage,
    shouldFetchData,
    setShouldFetchData,
    showsFormData,
  ]);

  console.log(showsPage);

  const handlePagination = e => {
    const pageNumber = parseInt(e.target.textContent, 10);
    const NextAndPrev = e.target.dataset.testid;
    const click = pageNumber || NextAndPrev;

    switch (typeof click) {
      case 'number':
        setShowsPage(pageNumber);
        break;
      case 'string':
        if (NextAndPrev === 'NavigateNextIcon') {
          setShowsPage(prev => prev + 1);
        } else if (NextAndPrev === 'NavigateBeforeIcon' && showsPage > 1) {
          setShowsPage(prev => prev - 1);
        } else {
          setShowsPage(1);
        }
        break;
      default:
        setShowsPage(1);
    }
  };

  return (
    <>
      <FilterBtn
        filterMenuOpen={filterMenuOpen}
        setFilterMenuOpen={setFilterMenuOpen}
      />
      <div className="max-w-xxl mx-auto flex my-12 justify-center items-start gap-8">
        {filterMenuOpen && <ShowFilterMenu />}

        <ShowsList showsData={showsData} filterMenuOpen={filterMenuOpen} />
      </div>
      <ThemeProvider theme={darkModeTheme}>
        <section className="max-w-xxl mx-auto flex items-center justify-center my-12">
          {showsData?.total_pages && (
            <Pagination
              count={showsData?.total_pages > 25 ? 25 : showsData?.total_pages}
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
}

export default Shows;

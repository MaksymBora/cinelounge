import { useLoaderData } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MovieCard } from './MovieCard';
import { FilterContext } from '@/context/filterMenu-context';
import { FilterDataContext } from '@/context/filterData-context';

interface MovieListProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}

interface ApiResponse {
  data: {
    results: MovieListProps[];
  };
}

export const MovieList = (): JSX.Element => {
  const { filterMenuOpen } = useContext(FilterContext);
  const { filterData, setFilterData } = useContext(FilterDataContext);

  const response = useLoaderData() as ApiResponse;
  const data = response.data.results;

  useEffect(() => {
    if (filterData.length > 0 === false) setFilterData([...data]);
  }, [data, filterData, setFilterData]);

  console.log(filterData, 'filterData');

  return (
    <section
      className={` grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo  ${
        filterMenuOpen ? 'widthWithFilter' : 'w-full'
      }`}
    >
      {filterData.map(
        (movie: MovieListProps) =>
          movie.poster_path && <MovieCard movieData={movie} key={movie.id} />
      )}
    </section>
  );
};

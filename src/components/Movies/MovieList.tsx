import { useContext } from 'react';
import { MovieCard } from './MovieCard';
import { FilterContext } from '@/context/filterMenu-context';

export const MovieList = ({ filterData }): JSX.Element => {
  const { filterMenuOpen } = useContext(FilterContext);

  return (
    <section
      className={` grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo  ${
        filterMenuOpen ? 'widthWithFilter' : 'w-full'
      }`}
    >
      {filterData?.results.map(
        movie =>
          movie.poster_path && <MovieCard movieData={movie} key={movie.id} />
      )}
    </section>
  );
};

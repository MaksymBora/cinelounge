import { useLoaderData } from 'react-router-dom';
import { useContext } from 'react';
import { MovieCard } from './MovieCard';
import { FilterContext } from '@/context/filter-context';

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
  const response = useLoaderData() as ApiResponse;

  const data = response.data.results;

  return (
    <section
      className={` grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo  ${
        filterMenuOpen ? 'widthWithFilter' : 'w-full'
      }`}
    >
      {data.map(
        (movie: MovieListProps) =>
          movie.poster_path && <MovieCard movieData={movie} key={movie.id} />
      )}
    </section>
  );
};

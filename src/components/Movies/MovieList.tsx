import { useLoaderData } from 'react-router-dom';
import { MovieCard } from './MovieCard';

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
  const response = useLoaderData() as ApiResponse;

  const data = response.data.results;

  return (
    <section className="container grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo w-full">
      {data.map(
        (movie: MovieListProps) =>
          movie.poster_path && <MovieCard movieData={movie} key={movie.id} />
      )}
    </section>
  );
};

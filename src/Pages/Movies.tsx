import { useLoaderData } from 'react-router-dom';
import { MovieCard } from '@/components/Movies/MovieCard';

export interface MoviesProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}

interface ApiResponse {
  data: {
    results: MoviesProps[];
  };
}

const Movies = () => {
  const response = useLoaderData() as ApiResponse;

  const data = response.data.results;

  return (
    <section className="grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo w-full">
      {data.map(
        (movie: MoviesProps) =>
          movie.poster_path && <MovieCard movieData={movie} key={movie.id} />
      )}
    </section>
  );
};

export default Movies;

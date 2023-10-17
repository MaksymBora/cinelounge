import { MovieList } from '@/components/Movies/MovieList';

const Movies = (): JSX.Element => {
  return (
    <div className="max-w-xxl mx-auto flex my-12 justify-center items-start gap-8">
      <MovieList />
    </div>
  );
};

export default Movies;

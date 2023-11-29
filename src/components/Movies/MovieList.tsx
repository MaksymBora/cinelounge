import { MovieCard } from './MovieCard';

export const MovieList = ({ moviesData, filterMenuOpen }): JSX.Element => {
  return (
    <section
      className={` grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo  ${
        filterMenuOpen ? 'widthWithFilter' : 'w-full'
      }`}
    >
      {moviesData?.results.map(
        movie =>
          movie.poster_path && <MovieCard movieData={movie} key={movie.id} />
      )}
    </section>
  );
};

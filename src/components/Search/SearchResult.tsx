import { MovieCard } from '../Movies/MovieCard';
import { ShowsCard } from '../Shows/ShowsCard';

export const SearchResult = ({ results }) => {
  return (
    <section className="grid grid-cols-search gap-8 bg-inherit text-mainTextColor max-w-xxl m-sectionSearch">
      {results?.map(movie => {
        return movie.media_type === 'movie' ? (
          <MovieCard movieData={movie} key={`${movie.id}`} />
        ) : (
          <ShowsCard showsData={movie} key={`${movie.id}`} />
        );
      })}
    </section>
  );
};

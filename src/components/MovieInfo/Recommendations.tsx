import { FC } from 'react';
import { MovieInfoTypes } from '@/Pages/MovieInfo';
import { MovieRecommendationsCard } from './MovieRecommendationsCard';

interface MovieRecommencdationsProps {
  movieData: MovieInfoTypes | null;
}

export const Recommendations: FC<MovieRecommencdationsProps> = ({
  movieData,
}): JSX.Element => {
  let backdropCount: number = 1;

  return (
    <section className="container max-w-xxl mx-auto my-0">
      <h2 className="mb-4 text-2xl">Recommendations</h2>
      <ul className="grid relative grid-cols-6 justify-start items-start gap-[0.5rem] mb-6 pb-4">
        {movieData?.recommendations?.results.map(entry => {
          return (
            entry.backdrop_path &&
            // eslint-disable-next-line no-plusplus
            backdropCount++ &&
            backdropCount <= 7 && (
              <MovieRecommendationsCard
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...entry}
                key={`${entry.id}${entry.popularity}`}
              />
            )
          );
        })}
      </ul>
    </section>
  );
};

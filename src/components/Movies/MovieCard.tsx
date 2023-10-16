import { FC } from 'react';
import { MoviesProps } from '@/Pages/Movies';
import { imageBase } from '@/service/imagePath';

interface MovieCardProps {
  movieData: MoviesProps;
}

export const MovieCard: FC<MovieCardProps> = ({
  movieData: { poster_path, title, release_date, vote_average },
}: MovieCardProps) => (
  <div>
    <img src={`${imageBase}w500${poster_path}`} alt={title} loading="lazy" />
    <div>
      <h2>{title}</h2>
      <p>{release_date}</p>
      <div>
        <p>{vote_average}</p>
      </div>
    </div>
  </div>
);

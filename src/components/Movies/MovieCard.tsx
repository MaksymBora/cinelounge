import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiPercent } from 'react-icons/fi';
import { MoviesProps } from '@/Pages/Movies';
import { imageBase } from '@/service/imagePath';
import { formatDate } from '@/utilities/utilities';

interface MovieCardProps {
  movieData: MoviesProps;
}

export const MovieCard: FC<MovieCardProps> = ({
  movieData: { poster_path, title, release_date, vote_average },
}: MovieCardProps) => (
  <div className="bg-bgCard flex flex-col rounded-cardBr shadow-cardShadow">
    <Link to="/" className="relative pt-150">
      <img
        src={`${imageBase}w500${poster_path}`}
        alt={title}
        loading="lazy"
        className="absolute top-0 left-0 rounded-t-cardBr"
      />
    </Link>
    <div className="p-details min-h-100 flex flex-col relative">
      <h2 className="font-semibold text-base">{title}</h2>
      <p className="text-13 mt-1.5 text-secondaryText">
        {release_date
          ? formatDate(release_date.replace(/-/g, '/'), 'short')
          : ''}
      </p>
      <div className="absolute top-rateT left-rateL flex justify-center items-center bg-rateBg w-10 h-10 rounded-rating text-xs text-white">
        <p>{vote_average ? +vote_average.toFixed(1) * 10 : 'NR'}</p>
        {vote_average ? (
          <FiPercent className="text-8 translate-x-[1px] translate-y-[-3px]" />
        ) : null}
      </div>
    </div>
  </div>
);

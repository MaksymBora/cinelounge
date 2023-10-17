import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FiPercent } from 'react-icons/fi';
import { colorPercentage, formatDate } from '@/utilities/utilities';
import { imageBase } from '@/service/imagePath';

interface ShowsCardProps {
  showsData: {
    poster_path: string;
    name: string;
    first_air_date: string;
    vote_average: number;
  };
}

export const ShowsCard: FC<ShowsCardProps> = ({
  showsData: { poster_path, name, first_air_date, vote_average },
}) => (
  <div className="bg-bgCard flex flex-col rounded-cardBr shadow-cardShadow">
    <Link to="/shows" className="relative pt-150">
      <img
        src={`${imageBase}w500${poster_path}`}
        alt={name}
        loading="lazy"
        className="absolute top-0 left-0 rounded-t-cardBr"
      />
    </Link>
    <div className="p-details min-h-100 flex flex-col relative">
      <h2 className="font-semibold text-base">{name}</h2>
      <p className="text-13 mt-1.5 text-secondaryText">
        {first_air_date
          ? formatDate(first_air_date.replace(/-/g, '/'), 'short')
          : ''}
      </p>
      <div
        style={{
          border: `3px solid ${
            vote_average ? colorPercentage(vote_average / 10) : '#777'
          }`,
        }}
        className="absolute top-rateT left-rateL flex justify-center items-center bg-rateBg w-10 h-10 rounded-rating text-xs text-white"
      >
        <p>{vote_average ? +vote_average.toFixed(1) * 10 : 'NR'}</p>
        {vote_average ? (
          <FiPercent className="text-8 translate-x-[1px] translate-y-[-3px]" />
        ) : null}
      </div>
    </div>
  </div>
);

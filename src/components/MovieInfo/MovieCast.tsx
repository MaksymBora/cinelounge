import { FC, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { TiArrowRight } from 'react-icons/ti';
import { MovieInfoTypes } from '@/Pages/MovieInfo';
import { MovieCastCard } from './MovieCastCard';
import { AppContext } from '@/context/app-context';

interface MovieCastProps {
  movieData: MovieInfoTypes | null;
}

export const MovieCast: FC<MovieCastProps> = ({ movieData }): JSX.Element => {
  const ref = useRef<null | HTMLUListElement>(null);
  const { darkMode } = useContext(AppContext);

  return (
    <div className="cast">
      <h2 className="mb-4 font-bold text-lg text-black dark:text-mainTextColo">
        Cast
      </h2>

      <ul
        className={`relative grid grid-flow-col justify-start gap-4 overflow-x-auto translate-y-[-2px] pt-[2px] pb-4 ${
          darkMode ? 'scroll' : 'scroll-day'
        }`}
        ref={ref}
      >
        {movieData?.credits?.cast.map((member, idx) => {
          return (
            member.profile_path &&
            idx < 20 && (
              <MovieCastCard
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...member}
                key={`${member.id}-${member.popularity}`}
              />
            )
          );
        })}
        <li className="flex justify-center items-center flex-nowrap font-bold text-sm w-[144px]">
          <Link
            to="casts"
            className="flex items-center text-base text-black dark:text-mainTextColo"
          >
            View More <TiArrowRight size={50} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

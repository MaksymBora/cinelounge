import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowRight } from 'react-icons/ti';
import { MovieInfoTypes } from '@/Pages/MovieInfo';
import { MovieCastCard } from './MovieCastCard';

interface MovieCastProps {
  movieData: MovieInfoTypes | null;
}

export const MovieCast: FC<MovieCastProps> = ({ movieData }): JSX.Element => {
  const ref = useRef<null | HTMLUListElement>(null);

  // const scrollEvent = (e: React.UIEvent<HTMLUListElement>) => {
  // 	dispatch(updateCastScroll(e.currentTarget.scrollLeft));
  //   };

  return (
    <div className="cast">
      <h2 className="mb-4">Cast</h2>
      <ul
        className="relative grid grid-flow-col gap-4 overflow-x-auto translate-y-[-2px] pt-[2px] pb-4"
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
        <li className="flex justify-center items-center flex-nowrap font-bold text-sm [&>a]:flex [&>a]:items-center [&>svg]:text-3xl">
          <Link to="allCast">
            View More <TiArrowRight />
          </Link>
        </li>
      </ul>
    </div>
  );
};

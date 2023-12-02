import { FiPercent } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BsBookmarkFill } from 'react-icons/bs';
import { imageBase } from '@/service/imagePath';
import { colorPercentage, formatDate } from '@/utilities/utilities';
import { deleteMovie } from '@/service/serviceFavMovies';

interface WatchlistCardProps {
  movieInfo: {
    poster: string;
    name: string;
    date: string;
    _id: number;
    rating: number;
    movieId: number;
  };
}

export const WatchlistCard = ({
  movieInfo: { poster, name, date, movieId, rating, _id },
  removeFromWatchlist,
}: WatchlistCardProps & { removeFromWatchlist: (id: number) => void }) => {
  const hadnleDeleteFromWatchlist = async () => {
    try {
      const res = await deleteMovie(_id);
      console.log(res);
      removeFromWatchlist(_id);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div className="bg-bgCard text-mainTextColo flex flex-col rounded-cardBr shadow-cardShadow">
      <Link className="relative pt-[150%]" to={`/${movieId}`}>
        <img
          className="absolute top-0 left-0 rounded-[3px 3px 0 0]"
          src={`${imageBase}w500${poster}`}
          loading="lazy"
          alt={name}
        />
      </Link>
      <div className="pt-[28px] pb-[20px] px-[20px] min-h-[100px] flex flex-col relative h-full">
        <h2 className="font-semibold text-base ">{name}</h2>
        <p className="mt-[5px] text-sm text-secondaryText">
          {formatDate(date?.replace(/-/g, '/'), 'short')}
        </p>
        <div
          className="absolute -top-[20px] left-[11px] flex justify-center items-center bg-rateBg w-[40px] h-[40px] rounded-[50px] text-xs text-white"
          style={{
            border: `3px solid ${
              rating ? colorPercentage(rating / 10) : '#777'
            }`,
          }}
        >
          <p className="tracking-normal">
            {rating ? +rating.toFixed(1) * 10 : 'NR'}
          </p>
          {rating ? (
            <FiPercent className="text-[8px] translate-[1px, -3px]" />
          ) : null}
        </div>
        <button
          type="button"
          onClick={hadnleDeleteFromWatchlist}
          className="bg-transparent border-none text-mainTextColo text-sm cursor-pointer p-[5px] absolute right-2.5 bottom-2.5"
          title="Remove from watchlist"
        >
          <BsBookmarkFill />
        </button>
      </div>
    </div>
  );
};

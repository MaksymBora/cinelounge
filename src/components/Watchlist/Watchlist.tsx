import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '@/context/app-context';
import { getWatchList } from '@/service/serviceFavMovies';
import { WatchlistCard } from './WatchlistCard';

interface MovieInfo {
  poster: string;
  name: string;
  date: string;
  _id: number;
  rating: number;
  type: string;
  movieId: number;
}

export const WatchlistComponent = () => {
  const { isLoggedIn } = useContext(AppContext);
  const [watchlist, setWatchlist] = useState<MovieInfo[]>([]);

  useEffect(() => {
    const result = async () => {
      try {
        const res = await getWatchList();

        if (res !== null) {
          setWatchlist(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isLoggedIn) result();
  }, [isLoggedIn]);

  return (
    <div className="max-w-xxl my-12 mx-auto min-h-watchlist">
      <h1 className="text-center font-bold text-3xl">My Watchlist</h1>

      {/* Not logged in */}
      {!isLoggedIn && (
        <p className="mt-16 text-center">
          <Link to="/login" className="underline text-mainTextColo font-medium">
            Login
          </Link>{' '}
          to start adding items!
        </p>
      )}

      {/* Logged in but no items in watchlist */}
      {isLoggedIn && watchlist.length === 0 && (
        <p className="mt-16 text-center">
          Add movies or shows to your Watchlist to have them appear here!
        </p>
      )}

      {/* Logged in and has items in watchlist */}
      {isLoggedIn && watchlist && (
        <div className="grid grid-cols-5 gap-8 bg-inherit text-mainTextColo w-full mt-16">
          {watchlist.map(watchlistItem => (
            <WatchlistCard
              movieInfo={watchlistItem}
              removeFromWatchlist={(id: number) => {
                const updatedWatchlist = watchlist.filter(
                  // eslint-disable-next-line no-underscore-dangle
                  item => item._id !== id
                );
                setWatchlist(updatedWatchlist);
              }}
              // eslint-disable-next-line no-underscore-dangle
              key={`${watchlistItem._id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '@/context/app-context';

export const WatchlistComponent = () => {
  const { isLoggedIn } = useContext(AppContext);

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
    </div>
  );
};

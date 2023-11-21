import { useMemo, useState } from 'react';
import { AppContext } from './app-context';

// interface WatchListTypes {
//   poster: string;
//   name: string;
//   date: string;
//   id: number;
//   rating: number;
//   type: string;
//   movieId: number;
// }

export const AppState = ({ children }: { children: React.ReactNode }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  // const [watchlist, setWatchlist] = useState<WatchListTypes[]>([]);

  const contextValue = useMemo(() => {
    return {
      isRefreshing,
      setIsRefreshing,
      isLoggedIn,
      setIsLoggedIn,
      userName,
      setUserName,
      // watchlist,
      // setWatchlist,
    };
  }, [
    isRefreshing,
    setIsRefreshing,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    // watchlist,
    // setWatchlist,
  ]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

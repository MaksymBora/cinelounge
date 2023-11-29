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
  const [page, setPage] = useState(1);
  const [showsPage, setShowsPage] = useState(1);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [shouldFetchShowsData, setShouldFetchShowsData] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const contextValue = useMemo(() => {
    return {
      isRefreshing,
      setIsRefreshing,
      isLoggedIn,
      setIsLoggedIn,
      userName,
      setUserName,
      showsPage,
      setShowsPage,
      page,
      setPage,
      shouldFetchData,
      setShouldFetchData,
      shouldFetchShowsData,
      setShouldFetchShowsData,
      darkMode,
      setDarkMode,
    };
  }, [
    isRefreshing,
    setIsRefreshing,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    showsPage,
    setShowsPage,
    page,
    setPage,
    shouldFetchData,
    setShouldFetchData,
    shouldFetchShowsData,
    setShouldFetchShowsData,
    darkMode,
    setDarkMode,
  ]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

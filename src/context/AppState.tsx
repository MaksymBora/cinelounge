import { useMemo, useState } from 'react';
import { AppContext } from './app-context';

export const AppState = ({ children }: { children: React.ReactNode }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const contextValue = useMemo(() => {
    return {
      isRefreshing,
      setIsRefreshing,
      isLoggedIn,
      setIsLoggedIn,
      userName,
      setUserName,
    };
  }, [
    isRefreshing,
    setIsRefreshing,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
  ]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

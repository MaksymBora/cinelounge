import { createContext, Dispatch, SetStateAction } from 'react';

// interface WatchListTypes {
//   poster: string;
//   name: string;
//   date: string;
//   id: number;
//   rating: number;
//   type: string;
//   movieId: number;
// }

interface ContextProps {
  isRefreshing: boolean;
  setIsRefreshing: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  shouldFetchData: boolean;
  setShouldFetchData: Dispatch<SetStateAction<boolean>>;
  // watchlist: WatchListTypes[];
  // setWatchlist: Dispatch<SetStateAction<WatchListTypes[]>>;
}

export const AppContext = createContext<ContextProps>({
  isRefreshing: false,
  setIsRefreshing: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userName: '',
  setUserName: () => {},
  page: 1,
  setPage: () => {},
  shouldFetchData: true,
  setShouldFetchData: () => {},
  // watchlist: [],
  // setWatchlist: () => {},
} as ContextProps);

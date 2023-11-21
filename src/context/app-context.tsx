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
  // watchlist: [],
  // setWatchlist: () => {},
} as ContextProps);

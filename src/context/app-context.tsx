import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextProps {
  isRefreshing: boolean;
  setIsRefreshing: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<ContextProps>({
  isRefreshing: false,
  setIsRefreshing: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userName: '',
  setUserName: () => {},
});

import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextProps {
  filterMenuOpen: boolean;
  setFilterMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const FilterContext = createContext<ContextProps>({
  filterMenuOpen: false,
  setFilterMenuOpen: () => {},
});

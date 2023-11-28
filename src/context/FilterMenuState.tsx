import { useMemo, useState } from 'react';
import { FilterContext } from './filterMenu-context';

export const FilterState = ({ children }: { children: React.ReactNode }) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const contextValue = useMemo(() => {
    return {
      filterMenuOpen,
      setFilterMenuOpen,
    };
  }, [filterMenuOpen, setFilterMenuOpen]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

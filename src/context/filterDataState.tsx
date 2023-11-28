import { useMemo, useState } from 'react';
import { FilterDataContext } from './filterData-context';

interface MovieListProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}

export const FilterDataState = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterData, setFilterData] = useState<MovieListProps[]>([]);

  const contextValue = useMemo(() => {
    return {
      filterData,
      setFilterData,
    };
  }, [filterData, setFilterData]);

  return (
    <FilterDataContext.Provider value={contextValue}>
      {children}
    </FilterDataContext.Provider>
  );
};

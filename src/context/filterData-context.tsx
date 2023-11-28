import { createContext } from 'react';

interface MovieListProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}

export const FilterDataContext = createContext<{
  filterData: MovieListProps[];
  setFilterData: React.Dispatch<React.SetStateAction<MovieListProps[]>>;
}>({
  filterData: [],
  setFilterData: () => {},
});

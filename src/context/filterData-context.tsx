import { createContext } from 'react';

interface MovieListProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}

interface ApiResponse {
  results: MovieListProps[];
  page: number;
  total_pages: number;
}

export const FilterDataContext = createContext<{
  filterData: ApiResponse | null;
  setFilterData: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
}>({
  filterData: null,
  setFilterData: () => {},
});

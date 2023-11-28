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

interface ServicesTypes {
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

interface FormDataTypes {
  year: number[];
  runtime: number[];
  rating: number[];
  genres: number[];
  services: ServicesTypes[];
}

const initialMovieFilterState = {
  year: [1000, 9999],
  runtime: [0, 999],
  rating: [0, 100],
  genres: [],
  services: [],
};

export const FilterDataContext = createContext<{
  filterData: ApiResponse | null;
  setFilterData: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
  formData: FormDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
}>({
  filterData: null,
  setFilterData: () => {},
  formData: initialMovieFilterState,
  setFormData: () => {},
});
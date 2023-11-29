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

const initialShowsFilterState = {
  year: [1000, 9999],
  rating: [0, 100],
  genres: [],
  services: [],
  status: [],
  type: [],
};

interface ShowsServicesTypes {
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

interface ShowsTypeOptios {
  value: number;
  label: string;
}
interface ShowsStatusOptios {
  value: number;
  label: string;
}

interface ShowsFormDataTypes {
  year: number[];
  rating: number[];
  genres: number[];
  services: ShowsServicesTypes[];
  status: ShowsStatusOptios[];
  type: ShowsTypeOptios[];
}

export const FilterDataContext = createContext<{
  moviesData: ApiResponse | null;
  setMoviesData: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
  MoviesformData: FormDataTypes;
  setMoviesFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  showsFormData: ShowsFormDataTypes;
  setShowsFormData: React.Dispatch<React.SetStateAction<ShowsFormDataTypes>>;
}>({
  moviesData: null,
  setMoviesData: () => {},
  MoviesformData: initialMovieFilterState,
  setMoviesFormData: () => {},
  showsFormData: initialShowsFilterState,
  setShowsFormData: () => {},
});

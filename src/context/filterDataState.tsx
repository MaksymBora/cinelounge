import { useMemo, useState } from 'react';
import { FilterDataContext } from './filterData-context';

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

interface ShowsListProps {
  poster_path: string;
  name: string;
  first_air_date: string;
  id: number;
  vote_average: number;
}

interface ShowsApiResponse {
  results: ShowsListProps[];
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

export const FilterDataState = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Movies
  const [moviesData, setMoviesData] = useState<ApiResponse | null>(null);
  const [MoviesformData, setMoviesFormData] = useState<FormDataTypes>(
    initialMovieFilterState
  );

  // Shows
  const [showsFormData, setShowsFormData] = useState<ShowsFormDataTypes>(
    initialShowsFilterState
  );
  const [showsData, setShowsData] = useState<ShowsApiResponse | null>(null);

  const contextValue = useMemo(() => {
    return {
      moviesData,
      setMoviesData,
      MoviesformData,
      setMoviesFormData,
      showsFormData,
      setShowsFormData,
      showsData,
      setShowsData,
    };
  }, [
    moviesData,
    setMoviesData,
    MoviesformData,
    setMoviesFormData,
    showsFormData,
    setShowsFormData,
    showsData,
    setShowsData,
  ]);

  return (
    <FilterDataContext.Provider value={contextValue}>
      {children}
    </FilterDataContext.Provider>
  );
};

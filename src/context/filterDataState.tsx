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

export const FilterDataState = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [moviesData, setMoviesData] = useState<ApiResponse | null>(null);
  const [MoviesformData, setMoviesFormData] = useState<FormDataTypes>(
    initialMovieFilterState
  );
  // const [ShowsformData, setShowsFormData] = useState<FormDataTypes>(
  //   initialMovieFilterState
  // );

  const contextValue = useMemo(() => {
    return {
      moviesData,
      setMoviesData,
      MoviesformData,
      setMoviesFormData,
    };
  }, [moviesData, setMoviesData, MoviesformData, setMoviesFormData]);

  return (
    <FilterDataContext.Provider value={contextValue}>
      {children}
    </FilterDataContext.Provider>
  );
};

import axios from 'axios';

const API_KEY = '?api_key=7f6cfc769c2057b00f9c41481e14f95f';

const themoviedb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  // timeout: 1000,
  headers: { accept: 'application/json' },
});

interface DataObj {
  data: {
    page: number;
    results: [];
    total_pages: number;
    total_results: number;
  };
  status: string;
}

export const getAllMovies = async (
  pageNumber = 1
): Promise<DataObj | undefined> => {
  const endPoint = `/discover/movie${API_KEY}`;
  const params = {
    include_adult: 'true',
    include_video: 'true',
    language: 'en-US',
    page: pageNumber,
    'primary_release_date.gte': '2000-02-12',
    'primary_release_date.lte': '2023-12-31',
    sort_by: 'popularity.desc',
  };
  try {
    return await themoviedb.get(endPoint, { params });
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

interface ApiShowsTypes {
  include_adult: string;
  include_null_first_air_dates: string;
  language: string;
  page: number;
  sort_by: string;
}

export const getAllShows = async (
  pageNumber = 1
): Promise<DataObj | undefined> => {
  const endPoint = `/discover/tv${API_KEY}`;
  const params: ApiShowsTypes = {
    include_adult: 'true',
    include_null_first_air_dates: 'false',
    language: 'en-US',
    page: pageNumber,
    sort_by: 'popularity.desc',
  };
  try {
    return await themoviedb.get(endPoint, { params });
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// Cast

interface ApiCastTypes {
  language: string;
  page: number;
}

export const getPopularCast = async (pageNumber = 1) => {
  const endPoint = `/person/popular${API_KEY}`;
  const params: ApiCastTypes = { language: 'en-US', page: pageNumber };
  try {
    return await themoviedb.get(endPoint, { params });
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// get Movie by ID

export const getMovieByID = async (id: string | number) => {
  const endPoint = `movie/${id}${API_KEY}&append_to_response=recommendations,credits,external_ids,images,videos`;
  try {
    return await themoviedb.get(endPoint);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// get TV by ID

export const getTVByID = async (id: string | number) => {
  const endPoint = `tv/${id}${API_KEY}&append_to_response=recommendations,external_ids,images,videos,aggregate_credits`;
  try {
    return await themoviedb.get(endPoint);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// get Actor by ID

export const getActorByID = async (id: string | number) => {
  const endPoint = `person/${id}${API_KEY}&append_to_response=combined_credits,external_ids,images`;
  try {
    return await themoviedb.get(endPoint);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// get Movie by Search

export const getSearchResult = async (query: string) => {
  const endPoint = `search/multi${API_KEY}&query=${query}`;

  try {
    const { data } = await themoviedb.get(endPoint);
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

import axios from 'axios';

const API_KEY = '?api_key=7f6cfc769c2057b00f9c41481e14f95f';

const themoviedb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  // timeout: 1000,
  headers: { accept: 'application/json' },
});

export const getSortedBy = async (sort, filterData, page = 1) => {
  const endPoint = `/discover/movie${API_KEY}&language=en-US&with_original_language=en&sort_by=${sort}&page=${page}`;

  const { year, runtime, rating, genres, services } = filterData;

  const genreValues = genres.map(opt => opt.value);

  let minimumVotes = 100;
  if (sort === 'vote_average.desc') minimumVotes = 500;
  else if (sort === 'primary_release_date.desc') minimumVotes = 5;

  const paramsSort = [
    `&primary_release_date.gte=${year[0]}-01-01`,
    `&primary_release_date.lte=${year[1]}-12-31`,
    `&with_runtime.gte=${runtime[0]}`,
    `&with_runtime.lte=${runtime[1]}`,
    `&vote_average.gte=${rating[0] / 10}`,
    `&vote_average.lte=${rating[1] / 10}`,
    `&with_genres=${genreValues.join('|')}`,
    `&with_watch_providers=${services.join('|')}`,
    `&watch_region=US`,
    `&vote_count.gte=${minimumVotes}`,
  ];

  try {
    return await themoviedb.get(endPoint + paramsSort.join(''));
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getShowsSortedBy = async (sort, filterData, page = 1) => {
  const endPoint = `/discover/tv${API_KEY}&language=en-US&with_original_language=en&sort_by=${sort}&page=${page}`;

  const { year, rating, genres, services, status, type } = filterData;

  const genreValues = genres.map(opt => opt.value);
  const statusValues = status.map(opt => opt.value);
  const typeValues = type.map(opt => opt.value);

  let minimumVotes = 100;
  if (sort === 'first_air_date.desc') minimumVotes = 10;

  // Remove talk shows and news genres from base request unless user has activated genres filter
  let WithoutGenres = '10767|10763';
  if (genres.length > 0) WithoutGenres = '';

  const paramsSort = [
    `&first_air_date.gte=${year[0]}-01-01`,
    `&first_air_date.lte=${year[1]}-12-31`,
    `&vote_average.gte=${rating[0] / 10}`,
    `&vote_average.lte=${rating[1] / 10}`,
    `&with_genres=${genreValues.join('|')}`,
    `&with_watch_providers=${services.join('|')}`,
    `&watch_region=US`,
    `&vote_count.gte=${minimumVotes}`,
    `&without_genres=${WithoutGenres}`,
    `&with_status=${statusValues.join('|')}`,
    `&with_type=${typeValues.join('|')}`,
  ];

  try {
    return await themoviedb.get(endPoint + paramsSort.join(''));
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

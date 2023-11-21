import axios from 'axios';

const mockApi = axios.create({
  baseURL: 'https://655c85d525b76d9884fd75a6.mockapi.io',
  // timeout: 1000,
  headers: { accept: 'application/json' },
});

export const addWatchlist = async dataMovie => {
  try {
    await mockApi.post('/favMovies', dataMovie);
  } catch (error) {
    console.log(error);
  }
};

export const getWatchList = async () => {
  try {
    const watchlist = await mockApi.get('/favMovies');
    return watchlist.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteMovie = async id => {
  try {
    const res = await mockApi.delete(`/favMovies/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

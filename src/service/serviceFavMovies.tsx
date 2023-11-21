import axios from 'axios';

const mockApi = axios.create({
  baseURL: 'https://655c85d525b76d9884fd75a6.mockapi.io',
  // timeout: 1000,
  headers: { accept: 'application/json' },
});

export const addFavMovie = async dataMovie => {
  try {
    await mockApi.post('/favMovies', dataMovie);
  } catch (error) {
    console.log(error);
  }
};

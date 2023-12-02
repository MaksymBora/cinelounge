import axios from 'axios';

const mongoDb = axios.create({
  baseURL: 'https://www.web4you.space',
  // timeout: 1000,
  headers: { accept: 'application/json' },
});

export const addWatchlist = async dataMovie => {
  const token = localStorage.getItem('token');
  try {
    await mongoDb.post('/favorite', dataMovie, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getWatchList = async () => {
  const token = localStorage.getItem('token');
  try {
    const watchlist = await mongoDb.get('/favorite', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return watchlist.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteMovie = async id => {
  const token = localStorage.getItem('token');
  try {
    const res = await mongoDb.delete(`/favorite/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

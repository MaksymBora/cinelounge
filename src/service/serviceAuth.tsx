import axios from 'axios';

const swagger = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  // timeout: 1000,
  headers: { accept: 'application/json' },
});

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };

export const register = async credentials => {
  try {
    const res = await swagger.post('/users/signup', credentials);
    // After successful registration, add the token to the HTTP header
    setAuthHeader(res.data.token);

    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const login = async credentials => {
  try {
    const res = await swagger.post('/users/login', credentials);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    throw Error(`${error}`);
  }
};

export const getCurrentUser = async token => {
  try {
    // setAuthHeader(token);
    const res = await swagger.get('/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.statusText);
    return res;
  } catch (error) {
    throw Error(`${error}`);
  }
};

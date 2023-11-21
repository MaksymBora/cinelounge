import axios, { AxiosError, AxiosResponse } from 'axios';

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

    localStorage.setItem('token', res.data.token);

    return res.data;
  } catch (error) {
    throw Error(`${error}`);
  }
};

interface UserData {
  email: string;
  name: string;
}

export const getCurrentUser = async (
  token: string | null
): Promise<AxiosResponse<UserData> | void> => {
  try {
    if (token === null) return;
    const res = await swagger.get('/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // eslint-disable-next-line consistent-return
    return res;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      'response' in error &&
      (error as AxiosError).response?.status
    ) {
      localStorage.clear();
      // console.log((error as AxiosError).response?.status);
    }
  }
};

// ????? >>>>
export const logout = async token => {
  console.log(token, 'AUTH API');
  try {
    const res = await swagger.post('/users/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res) localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

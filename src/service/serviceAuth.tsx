import axios, { AxiosError, AxiosResponse } from 'axios';

const mongoDb = axios.create({
  baseURL: 'https://www.web4you.space',
  // timeout: 1000,
  headers: { accept: 'application/json' },
});

export const register = async credentials => {
  try {
    const res = await mongoDb.post('/users/register', credentials);

    return res;
  } catch (error) {
    return console.log(error);
  }
};

// export const login = async credentials => {
//   try {
//     const res = await mongoDb.post('/users/login', credentials);

//     localStorage.setItem('token', res.data.token);

//     return res;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       const er = error.response;
//       return er;
//     }

//     return undefined;
//   }
// };

export const login = async credentials => {
  try {
    const res = await axios.post(
      'http://localhost:3000/users/login',
      credentials
    );

    localStorage.setItem('token', res.data.token);

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const er = error.response;
      return er;
    }

    return undefined;
  }
};

interface UserData {
  email: string;
  name: string;
  subscription: string;
}

export const getCurrentUser = async (
  token: string | null
): Promise<AxiosResponse<UserData> | void> => {
  try {
    if (token === null) return undefined;
    const res = await mongoDb.get('/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      'response' in error &&
      (error as AxiosError).response?.status
    ) {
      localStorage.removeItem('token');
    }
    return undefined;
  }
};

export const logout = async token => {
  try {
    const res = await mongoDb.post('/users/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res) localStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
};

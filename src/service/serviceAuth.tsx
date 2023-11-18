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

// export const register = createAsyncThunk(
//   'auth/register',
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await axios.post('/users/signup', credentials);
//       // After successful registration, add the token to the HTTP header
//       setAuthHeader(res.data.token);
//       return res.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

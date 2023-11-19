import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Layout } from './Layout';
import Movies from '@/Pages/Movies';
import Shows from '@/Pages/Shows';
import Cast from '@/Pages/Cast';
import {
  getAllMovies,
  getAllShows,
  getPopularCast,
} from '@/service/serviceMovies';
import MovieInfo from '@/Pages/MovieInfo';
import MovieCastAndCrew from '@/Pages/MovieCastAndCrew';
import ShowInfo from '@/Pages/ShowInfo';
import ShowCastAndCrew from '@/Pages/ShowCastAndCrew';
import Actor from '@/Pages/Actor';
import { Search } from '@/Pages/Search';
import { Auth } from './Auth/Auth';
import { UserContext } from '@/hooks/context';
import { getCurrentUser } from '@/service/serviceAuth';

export interface User {
  isLoggedIn: boolean;
  isRefreshing: boolean;
  name: string | null;
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJlZmNjNTgyYTE0OTAwMTQ2Y2YxYjIiLCJpYXQiOjE3MDA0MjI0ODh9.34Q6fp_YVXLDkhbQEfRckg2xidQHOwm365Oiv6QEYrg';

export function App() {
  const [page, setPage] = useState(1);

  const [user, setUser] = useState<User>({
    isLoggedIn: false,
    isRefreshing: false,
    name: null,
  });

  // useEffect(() => {
  //   const result = async () => {
  //     setUser(prevState => ({ ...prevState, isRefreshing: true }));
  //     try {
  //       const currentUser = await getCurrentUser(token);

  //       if (currentUser.status !== 200) {
  //         setUser({ isLoggedIn: false, isRefreshing: false, name: null });
  //       } else {
  //         setUser({
  //           ...user,
  //           isLoggedIn: true,
  //           name: currentUser.data.name,
  //           isRefreshing: false,
  //         });
  //       }
  //       console.log(user.name);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   result();
  // }, [token]);

  const fetchData = useCallback(async () => {
    setUser(prevUser => ({ ...prevUser, isRefreshing: true }));

    try {
      const currentUser = await getCurrentUser(token);

      if (currentUser.status !== 200) {
        setUser({ isLoggedIn: false, isRefreshing: false, name: null });
      } else {
        setUser(prevUser => ({
          ...prevUser,
          isLoggedIn: true,
          name: currentUser.data.name,
          isRefreshing: false,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/">
          <Route
            index
            element={<Movies setPage={setPage} currentPage={page} />}
            loader={() => getAllMovies(page)}
          />
          <Route path=":id" element={<MovieInfo />} />
          <Route path=":id/casts" element={<MovieCastAndCrew />} />
        </Route>
        <Route path="shows">
          <Route
            index
            element={<Shows setPage={setPage} currentPage={page} />}
            loader={() => getAllShows(page)}
          />
          <Route path=":id" element={<ShowInfo />} />
          <Route path=":id/casts" element={<ShowCastAndCrew />} />
        </Route>
        <Route path="cast">
          <Route
            index
            element={<Cast setPage={setPage} currentPage={page} />}
            loader={() => getPopularCast(page)}
          />
          <Route path=":id" element={<Actor />} />
        </Route>
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Auth />} />
      </Route>
    ),
    {
      basename: '/cinelounge',
    }
  );

  return (
    <UserContext.Provider value={user}>
      {user.isRefreshing ? (
        <div>Loading...</div>
      ) : (
        <RouterProvider router={browserRouter} />
      )}
    </UserContext.Provider>
  );
}

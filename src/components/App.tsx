import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
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
import { getCurrentUser } from '@/service/serviceAuth';
import { AppContext } from '@/context/app-context';
import { RestrictedRoute } from '@/RestrictedRoute/RestrictedRoute';

export function App() {
  const [page, setPage] = useState(1);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem('token');

    if (savedToken !== null) return savedToken;

    return null;
  });

  const { isRefreshing, setIsRefreshing } = useContext(AppContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const { userName, setUserName } = useContext(AppContext);

  useEffect(() => {
    if (token === null) return;

    const result = async () => {
      try {
        setIsRefreshing(true);
        const currentUser = await getCurrentUser(token);

        if (!currentUser) {
          setIsRefreshing(false);
          setIsLoggedIn(false);
          setUserName('');

          throw new Error('User is not logged in');
        } else {
          setIsLoggedIn(true);
          setIsRefreshing(false);
          setUserName(currentUser.data.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    result();
  }, [
    isLoggedIn,
    setIsLoggedIn,
    setIsRefreshing,
    setUserName,
    token,
    userName,
  ]);

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
        <Route
          path="login"
          element={<RestrictedRoute component={<Auth />} redirectTo="/" />}
        />
      </Route>
    ),
    {
      basename: '/cinelounge',
    }
  );

  return isRefreshing ? (
    <div>Loading...</div>
  ) : (
    <RouterProvider router={browserRouter} />
  );
}

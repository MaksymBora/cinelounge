import { useContext, useEffect, useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Layout } from './Global/Layout';
import { getPopularCast } from '@/service/serviceMovies';
import { getCurrentUser } from '@/service/serviceAuth';
import { AppContext } from '@/context/app-context';
import { RestrictedRoute } from '@/RestrictedRoute/RestrictedRoute';
import { FilterDataState } from '@/context/filterDataState';
import {
  Movies,
  MovieInfo,
  MovieCastAndCrew,
  Shows,
  ShowInfo,
  ShowCastAndCrew,
  Cast,
  Actor,
  Search,
  Auth,
  Watchlist,
} from '@/Routing/routesImport';

export function App() {
  const [page, setPage] = useState(1);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem('token');

    if (savedToken !== null) return savedToken;

    return null;
  });
  const [signedIn, setSignedIn] = useState(false); // for Toast in Auth.tsx
  const { isRefreshing, setIsRefreshing } = useContext(AppContext);
  const { setIsLoggedIn } = useContext(AppContext);
  const { setUserName } = useContext(AppContext);
  const { setSubscription } = useContext(AppContext);
  const { setAvatar } = useContext(AppContext);

  useEffect(() => {
    if (token === null) {
      return;
    }

    const result = async () => {
      try {
        setIsRefreshing(true);
        const currentUser = await getCurrentUser(token);

        if (!currentUser) {
          setIsRefreshing(false);
          setIsLoggedIn(false);
          setUserName('');
          setAvatar('');

          throw new Error('User is not logged in');
        } else {
          setIsLoggedIn(true);
          setIsRefreshing(false);
          setUserName(currentUser.data.name);
          setSubscription(currentUser.data.subscription);
          setAvatar(currentUser.data.avatar);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      setIsRefreshing(true);
      result();
      setIsRefreshing(false);
    }
  }, [
    token,
    setIsLoggedIn,
    setUserName,
    setIsRefreshing,
    setSubscription,
    setAvatar,
  ]);

  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/">
          <Route
            index
            element={<Movies signedIn={signedIn} setSignedIn={setSignedIn} />}
          />
          <Route path=":id" element={<MovieInfo />} />
          <Route path=":id/casts" element={<MovieCastAndCrew />} />
        </Route>
        <Route path="shows">
          <Route index element={<Shows />} />
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
          element={
            <RestrictedRoute
              component={<Auth setSignedIn={setSignedIn} />}
              redirectTo="/"
            />
          }
        />
        <Route path="watchlist" element={<Watchlist />} />
      </Route>
    ),
    {
      // basename: '/cinelounge',
      basename: '/',
    }
  );

  return isRefreshing ? (
    <div>Loading...</div>
  ) : (
    <FilterDataState>
      <RouterProvider router={browserRouter} />
    </FilterDataState>
  );
}

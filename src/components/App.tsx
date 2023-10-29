import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useState } from 'react';
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

export function App() {
  const [page, setPage] = useState(1);

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
  return <RouterProvider router={browserRouter} />;
}

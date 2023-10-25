import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
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

export function App() {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/">
          <Route index element={<Movies />} loader={getAllMovies} />
          <Route path=":id" element={<MovieInfo />} />
          <Route path=":id/casts" element={<MovieCastAndCrew />} />
        </Route>
        <Route path="shows">
          <Route index element={<Shows />} loader={getAllShows} />
          <Route path=":id" element={<ShowInfo />} />
          <Route path=":id/casts" element={<ShowCastAndCrew />} />
        </Route>
        <Route path="cast">
          <Route index element={<Cast />} loader={getPopularCast} />
          <Route path=":id" element={<Actor />} />
        </Route>
      </Route>
    ),
    {
      basename: '/cinelounge',
    }
  );
  return <RouterProvider router={browserRouter} />;
}

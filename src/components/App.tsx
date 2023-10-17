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

export function App() {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="movies" element={<Layout />}>
        <Route path="/movies">
          <Route index element={<Movies />} loader={getAllMovies} />
          <Route path=":id" element={<MovieInfo />} />
        </Route>

        <Route path="shows" element={<Shows />} loader={getAllShows} />
        <Route path="cast" element={<Cast />} loader={getPopularCast} />
      </Route>
    ),
    {
      basename: '/cinelounge/movies',
    }
  );
  return <RouterProvider router={browserRouter} />;
}

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
import { getAllMovies } from '@/service/serviceMovies';

export function App() {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Movies />} loader={getAllMovies} />
        <Route path="shows" element={<Shows />} />
        <Route path="cast" element={<Cast />} />
      </Route>
    ),
    {
      basename: '/cinelounge',
    }
  );
  return <RouterProvider router={browserRouter} />;
}

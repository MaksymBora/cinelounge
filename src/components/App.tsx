import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import Movies from '@/Pages/Movies';
import Shows from '@/Pages/Shows';
import Cast from '@/Pages/Cast';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Movies />} />
        <Route path="shows" element={<Shows />} />
        <Route path="cast" element={<Cast />} />
      </Route>
    </Routes>
  );
}

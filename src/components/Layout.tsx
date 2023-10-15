import { Outlet } from 'react-router';
import Header from '@/Pages/Header';

export function Layout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}

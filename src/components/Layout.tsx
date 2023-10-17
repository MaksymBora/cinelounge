import { Outlet } from 'react-router';
import { Header } from '@/components/Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div>
      <Header />

      <Outlet />
      <Footer />
    </div>
  );
}

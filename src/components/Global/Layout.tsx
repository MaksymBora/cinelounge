import { Outlet } from 'react-router';
import { Header } from '@/components/Global/Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="bg-[#fafafa] dark:bg-mainBgColor">
      <Header />

      <Outlet />
      <Footer />
    </div>
  );
}

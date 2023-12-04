import { Outlet } from 'react-router';
import { Suspense } from 'react';
import { Header } from '@/components/Global/Header';
import { Footer } from './Footer';
import Loader from '@/utilities/Loader';

export function Layout() {
  return (
    <div className="bg-[#fafafa] dark:bg-mainBgColor">
      <Header />

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

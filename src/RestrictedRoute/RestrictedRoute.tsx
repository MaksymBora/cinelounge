import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '@/context/app-context';

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  const location = useLocation();
  const { isLoggedIn } = useContext(AppContext);

  return isLoggedIn ? (
    <Navigate to={location.state?.from || redirectTo} />
  ) : (
    Component
  );
};

import { lazy } from 'react';

const Movies = lazy(() => import('@/Pages/Movies'));
const MovieInfo = lazy(() => import('@/Pages/MovieInfo'));
const MovieCastAndCrew = lazy(() => import('@/Pages/MovieCastAndCrew'));
const Shows = lazy(() => import('@/Pages/Shows'));
const ShowInfo = lazy(() => import('@/Pages/ShowInfo'));
const ShowCastAndCrew = lazy(() => import('@/Pages/ShowCastAndCrew'));
const Cast = lazy(() => import('@/Pages/Cast'));
const Actor = lazy(() => import('@/Pages/Actor'));
const Search = lazy(() => import('@/Pages/Search'));
const Auth = lazy(() => import('@/Pages/Auth'));
const Watchlist = lazy(() => import('@/Pages/WatchList'));

export {
  Movies,
  MovieInfo,
  MovieCastAndCrew,
  Shows,
  ShowInfo,
  ShowCastAndCrew,
  Cast,
  Actor,
  Search,
  Auth,
  Watchlist,
};

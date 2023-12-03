/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from 'react';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { FiPercent } from 'react-icons/fi';
import { BsPlay, BsBookmark } from 'react-icons/bs';
import { ClickAwayListener, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { imageBase } from '@/service/imagePath';
import { colorPercentage, formatRuntime } from '@/utilities/utilities';
import { MovieGallery } from './MovieGallery';
import { MovieTrailer } from './MovieTrailer';
import { MovieInfoTypes } from '@/Pages/MovieInfo';
import { AppContext } from '@/context/app-context';
import {
  addWatchlist,
  deleteMovie,
  getWatchList,
} from '@/service/serviceFavMovies';

interface MovieAboutProps {
  movieData: MovieInfoTypes | null;
}

export const MovieAbout: FC<MovieAboutProps> = ({
  movieData,
}): JSX.Element | null => {
  const [viewGallery, setViewGallery] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [viewTrailer, setViewTrailer] = useState(false);
  const [inWatchList, setInWatchList] = useState(false);
  const { isLoggedIn } = useContext(AppContext);
  const { id } = useParams();

  useEffect(() => {
    const result = async () => {
      try {
        const res = await getWatchList();

        const inList = res.find(movie => movie.movieId === Number(id));

        if (inList) setInWatchList(true);
      } catch (error) {
        setInWatchList(false);
        console.log(error);
      }
    };
    if (!inWatchList) result();
  }, []);

  if (!movieData) {
    return null;
  }

  interface Genre {
    id: number;
    name: string;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { vote_average, genres }: { vote_average: number; genres: Genre[] } =
    movieData;

  const hasImages =
    movieData?.images.backdrops && movieData.images.backdrops.length > 0;

  const trailer = movieData?.videos?.results?.find(entry => {
    return (
      entry.type.toLowerCase() === 'trailer' &&
      entry.site.toLowerCase() === 'youtube'
    );
  });

  const handleViewGallery = () => hasImages && setViewGallery(true);

  const toggleWatchlist = () => {
    // User not logged in
    if (!isLoggedIn) {
      setShowTooltip(true);
      return;
    }

    // Item not in Watchlist
    const {
      release_date: date,
      vote_average: rating,
      poster_path: poster,
      title: name,
    } = movieData;

    const data = {
      movieId: id,
      date,
      rating,
      poster,
      name,
      type: 'movie',
    };

    // Add to favorites list
    const postMovie = async dataMovie => {
      try {
        await addWatchlist(dataMovie);
        setInWatchList(true);

        toast.success(
          <div>
            Movie <b>{dataMovie.name}</b> added in Watchlist!
          </div>,
          {
            duration: 4000,
            icon: '✅',
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    // Remove from Favorite List
    const removeFromWatchlist = async () => {
      try {
        const allMovies = await getWatchList();
        console.log(allMovies);
        const inList = allMovies.find(movie => movie.movieId === Number(id));

        // eslint-disable-next-line no-underscore-dangle
        const res = await deleteMovie(inList?._id);

        setInWatchList(false);

        toast.success(
          <div>
            Movie <b>{res.message.slice(5, 13)}</b> from Watchlist!
          </div>,
          {
            duration: 4000,
            icon: '🚫',
          }
        );

        return res;
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    if (!inWatchList) postMovie(data);
    if (inWatchList) removeFromWatchlist();
  };

  return (
    <section className="my-12 mx-0 relative">
      <div
        className={`h-[600px]  {${
          movieData?.backdrop_path ? '' : 'bg-movieAboutBg'
        }}`}
      >
        <div
          style={{
            background: `url('${imageBase}original${movieData?.backdrop_path}') no-repeat top center/cover`,
          }}
          className="absolute w-full h-full -z-5"
        />
        <div className="grid grid-cols-[1fr,4fr] items-center gap-x-16 z-[1] max-w-xxl mx-auto my-0 text-white relative h-full">
          {hasImages ? (
            <button
              type="button"
              className="w-[300px] flex items-start rounded-cardBr relative text-xl border-none overflow-hidden bg-black cursor-pointer transition duration-250 ease-in group"
              onClick={handleViewGallery}
            >
              <img
                src={`${imageBase}w780${movieData?.poster_path}`}
                alt=""
                className="transition-all group-hover:opacity-25"
              />
              <p className="opacity-0 w-full h-full absolute top-0 left-0 transition-all flex justify-center items-center text-white group-hover:opacity-100 ">
                <i>
                  <HiOutlineArrowsExpand className="text-2xl flex hover:opacity-60" />
                </i>
                <span className="ml-1.5">View Gallery</span>
              </p>
            </button>
          ) : (
            <img
              className="transition-all group-hover:opacity-25"
              src={`${imageBase}w780${movieData?.poster_path}`}
              alt=""
            />
          )}

          {/* Title */}
          <div>
            <div className="flex items-center flex-wrap">
              <h1 className="text-[32px] mb-1.5 font-bold font-['Montserrat']">
                {movieData?.title}{' '}
                {movieData?.release_date && (
                  <span className="text-3xl ml-2.5 font-normal tracking-[2px] text-[32px]">
                    ({movieData?.release_date.slice(0, 4)})
                  </span>
                )}
              </h1>
            </div>
            {movieData?.tagline && (
              <p className="text-sm italic mb-3">{movieData?.tagline}</p>
            )}
            {/* Rating and Info */}
            <div className="inline-flex items-center justify-between whitespace-nowrap mt-3 mb-4">
              <div className="flex items-center text-base">
                <div
                  className="flex items-center justify-center bg-[#081c22] text-white w-[55px] h-[55px] rounded-[50px] text-lg"
                  style={{
                    border: `3px solid ${
                      movieData?.vote_average
                        ? colorPercentage(vote_average / 10)
                        : '#777'
                    }`,
                  }}
                >
                  <p className="tracking-normal">
                    {movieData?.vote_average
                      ? +vote_average.toFixed(1) * 10
                      : 'NR'}
                  </p>
                  {movieData?.vote_average ? (
                    <FiPercent className="text-[8px] translate-x-[1px] translate-y-[-3px]" />
                  ) : null}
                </div>
                {movieData?.runtime ? (
                  <span className="mx-4 w-[2px] rounded-[10px] text-mainTextColo opacity-60 h-[30px]" />
                ) : (
                  ''
                )}
                {movieData?.runtime ? (
                  <p className="runtime">{formatRuntime(movieData?.runtime)}</p>
                ) : (
                  ''
                )}
              </div>
              {/* Genres */}
              {movieData?.genres && movieData.genres.length > 0 && (
                <span className="mx-4 w-[2px] rounded-[10px] text-mainTextColo opacity-60 h-[30px]" />
              )}
              <ul className="genres">
                {genres?.map(
                  (genre, idx) =>
                    idx < 3 && (
                      <li key={genre.id}>
                        {genre.name}{' '}
                        {idx === genres.length - 1 || idx === 2 ? null : ','}
                      </li>
                    )
                )}
              </ul>
            </div>
            {/* Overview */}
            {movieData?.overview && (
              <div className="overview">
                <h3>Overview</h3>
                <p>{movieData?.overview}</p>
              </div>
            )}
            {/* Buttons */}
            <div className="flex items-center gap-x-8 mt-8">
              {trailer && (
                <button
                  type="button"
                  onClick={() => setViewTrailer(true)}
                  className="flex justify-center items-center 
                  text-base cursor-pointer bg-transparent border-none text-white 
                  transition-all tracking-[0.5px] min-h-[35px] [&>svg]:w-[35px] 
                  [&>svg]:h-[35px] [&>svg]:mr-[8px] hover:opacity-60 font-semibold"
                >
                  <BsPlay />
                  <span>Play Trailer</span>
                </button>
              )}
              <ClickAwayListener onClickAway={() => setShowTooltip(false)}>
                <Tooltip
                  title={
                    <span style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                      Please login to add to Watchlist
                    </span>
                  }
                  arrow
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => setShowTooltip(false)}
                  open={showTooltip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                >
                  <button
                    type="button"
                    className="[&>svg]:w-[20px] [&>svg]:h-[20px] [&>svg]:mr-[14px] 
                    flex justify-center items-center 
                    text-base cursor-pointer bg-transparent border-none text-white 
                    transition-all tracking-[0.5px] min-h-[35px] hover:opacity-60 font-semibold"
                    onClick={toggleWatchlist}
                  >
                    <BsBookmark />
                    <span>
                      {inWatchList && isLoggedIn
                        ? 'Remove from Watchlist'
                        : 'Add to Watchlist'}
                    </span>
                  </button>
                </Tooltip>
              </ClickAwayListener>
            </div>
          </div>
        </div>
      </div>
      {viewTrailer && (
        <MovieTrailer
          trailer={trailer}
          setViewTrailer={setViewTrailer}
          movie={movieData}
        />
      )}
      {viewGallery && (
        <MovieGallery setViewGallery={setViewGallery} movie={movieData} />
      )}
      <Toaster position="bottom-left" reverseOrder />
    </section>
  );
};

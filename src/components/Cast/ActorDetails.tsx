import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { BsInstagram, BsFacebook, BsTwitter, BsTiktok } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { imageBase } from '@/service/imagePath';
import { formatDate, getAge } from '@/utilities/utilities';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { AppContext } from '@/context/app-context';

type Media = {
  media_type: 'movie';
  title?: string;
  name?: string;
  id: number;
  credit_id: string;
  release_date?: string;
  poster_path: string;
  first_air_date?: string;
};

export const ActorDetails = ({ person, hasMultipleImages }): JSX.Element => {
  const [filteredKnownFor, setFilteredKnownFor] = useState([]);
  const { darkMode } = useContext(AppContext);
  const socials = [
    {
      base: 'https://instagram.com/',
      id: person?.external_ids.instagram_id,
      icon: BsInstagram,
      keyID: 5035739184843,
      name: 'Instagram',
    },
    {
      base: 'https://facebook.com/',
      id: person?.external_ids.facebook_id,
      icon: BsFacebook,
      keyID: 4810573175591,
      name: 'Facebook',
    },
    {
      base: 'https://twitter.com/',
      id: person?.external_ids.twitter_id,
      icon: BsTwitter,
      keyID: 1953038502946,
      name: 'Twitter',
    },
    {
      base: 'https://tiktok.com/@',
      id: person?.external_ids.tiktok_id,
      icon: BsTiktok,
      keyID: 732561398455,
      name: 'TikTok',
    },
  ];

  useEffect(() => {
    // Top Rated 15 Known for movies
    const filteredMoviePosters = person?.combined_credits.cast
      .filter(movie => movie.poster_path !== null)
      .filter((val, idx, arr) => arr.findIndex(t => t.id === val.id) === idx)
      .sort((a, b) => b.vote_count - a.vote_count)
      .slice(0, 15);

    if (person) {
      setFilteredKnownFor(filteredMoviePosters);
    }
  }, [person]);

  return (
    <section className="flex gap-x-actorDetails max-w-xxl my-12 mx-auto actor-section">
      <div className="rounded-cardBr flex flex-col w-[23%]">
        {hasMultipleImages ? (
          <Carousel
            className="rounded-cardBr"
            showArrows
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            renderArrowPrev={clickHandler => (
              <button
                type="button"
                onClick={clickHandler}
                className="absolute top-2/4 -translate-y-1/2 z-[1] text-3xl cursor-pointer text-[#ccc] 
                h-full bg-transparent border-none focus-visible:text-[#2fa6ff] focus-visible:outline-none 
                hover:text-white left-0"
                aria-label="Previous image"
              >
                <HiChevronLeft />
              </button>
            )}
            renderArrowNext={clickHandler => (
              <button
                type="button"
                onClick={clickHandler}
                className="absolute top-2/4 -translate-y-1/2 z-[1] text-3xl cursor-pointer text-[#ccc] 
                h-full bg-transparent border-none focus-visible:text-[#2fa6ff] focus-visible:outline-none 
                hover:text-white right-0"
                aria-label="Next image"
              >
                <HiChevronRight />
              </button>
            )}
          >
            {person?.images.profiles.map(p => (
              <img
                key={p.file_path.slice(0, -4)}
                className="w-full rounded-cardBr shadow-actorShadow"
                src={`${imageBase}w780${p.file_path}`}
                alt=""
              />
            ))}
          </Carousel>
        ) : (
          person?.profile_path && (
            <img
              className="w-full rounded-cardBr shadow-actorShadow"
              src={`${imageBase}w780${person.profile_path}`}
              alt=""
            />
          )
        )}
        <Link
          to={`/search?query=${person?.name.split(' ').join('+')}`}
          className=""
          aria-label={`Get search results for ${person?.name}`}
          title={`Get search results for ${person?.name}`}
        >
          <h1 className="hidden">{person?.name}</h1>
        </Link>

        {/* -------- Socials -------------- */}
        <div className="flex flex-col mt-8">
          <ul className="flex justify-start items-center text-2xl w-[150px] translate-x-[-10px]">
            {socials.map(
              social =>
                social.id && (
                  <li
                    key={`${social.id}-${social.keyID}`}
                    className="hover:transition-all mb-6 hover:opacity-60 [&:not(:first-child)]:ml-4"
                  >
                    <a
                      href={`${social.base}${social.id}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${person?.name} ${social.name}`}
                      className="py-[5px] px-[10px] text-black dark:text-mainTextColo flex justify-center items-center"
                    >
                      <social.icon />
                    </a>
                  </li>
                )
            )}
          </ul>

          {socials.some(social => social.id) && (
            <div className="w-full bg-line h-[1px] mb-4 rounded-[50px]"></div>
          )}
          <div className="mt-[8px] flex flex-col text-black dark:text-mainTextColo">
            {person?.known_for_department && (
              <div className="mb-6">
                <h2 className="text-[17px] font-semibold mb-[3px]">
                  Known For
                </h2>
                <p className="text-black dark:text-mainTextColo">
                  {person?.known_for_department}
                </p>
              </div>
            )}
            {person?.birthday && (
              <div className="mb-6">
                <h2 className="text-[17px] font-semibold mb-[3px] text-black dark:text-mainTextColo">
                  Birthday
                </h2>
                <p className="text-black dark:text-mainTextColo">
                  {formatDate(person?.birthday.replace(/-/g, '/'))}
                  {!person.deathday && (
                    <span>
                      &nbsp;({getAge(person.birthday, person.deathday)} years
                      old)
                    </span>
                  )}
                </p>
              </div>
            )}
            {person?.deathday && (
              <div className="mb-6">
                <h2 className="text-[17px] font-semibold mb-[3px] text-black dark:text-mainTextColo">
                  Day of Death
                </h2>
                <p className="text-black dark:text-mainTextColo">
                  {formatDate(person?.deathday.replace(/-/g, '/'))}
                  <span className="text-black dark:text-mainTextColo">
                    ({getAge(person?.birthday, person?.deathday)}
                    years old)
                  </span>
                </p>
              </div>
            )}
            {person?.place_of_birth && (
              <div>
                <h2 className="text-[17px] font-semibold mb-[3px] text-black dark:text-mainTextColo">
                  Place of Birth
                </h2>
                <p className="text-black dark:text-mainTextColo">
                  {person?.place_of_birth}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --------- General Information ---------------- */}
      <div className="w-[73.5%] flex flex-col">
        <div>
          <Link
            to={`/search?query=${person?.name?.split(' ').join('+')}`}
            className="inline-flex items-center mb-8 text-[18px] transition-opacity text-black dark:text-mainTextColo"
            aria-label={`Get search results for ${person?.name}`}
            title={`Get search results for ${person?.name}`}
          >
            <h1 className="font-bold text-[30px] hover:opacity-60 text-black dark:text-mainTextColo">
              {person?.name}
            </h1>
          </Link>
          <div className="w-full bg-[rgba(150, 150, 150, 0.5) h-[1px] mb-4 rounded-[50px]]"></div>
          <h2 className="text-[17px] font-semibold mb-[10px] text-black dark:text-mainTextColo">
            Biography
          </h2>
          <p className="leading-[1.6] tracking-normal whitespace-pre-wrap mb-8 text-black dark:text-mainTextColo">
            {person?.biography
              ? person.biography
              : `We don't have a biography for ${person?.name}`}{' '}
          </p>
        </div>

        {/* Known For Part */}
        <div className="translate-y-4">
          <h2 className="text-[17px] mb-4 font-semibold text-black dark:text-mainTextColo">
            Known For
          </h2>
          <ul
            className={`relative grid grid-flow-col justify-start gap-4 overflow-x-auto translate-y-[-2px] pt-[2px] pb-4 ${
              darkMode ? 'scroll' : 'scroll-day'
            }`}
          >
            {filteredKnownFor.map((media: Media) => {
              const isMovie = media.media_type === 'movie';
              return (
                <li
                  className="flex flex-col bg-white dark:bg-bgCard w-[145px] rounded-cardBr shadow-castShadow border dark:border-black"
                  key={`${media.id}-${media.credit_id}`}
                >
                  <Link
                    to={`${isMovie ? `/${media.id}` : `/shows/${media.id}`}`}
                    className="relative pt-[150%]"
                  >
                    <img
                      src={`${imageBase}w500${media.poster_path}`}
                      loading="lazy"
                      alt={isMovie ? media.title : media.name}
                      className="absolute top-0 left-0 rounded-s-sm"
                    />
                  </Link>
                  <div className="p-actor min-h-[65px] text-black dark:text-mainTextColo overflow-hidden">
                    <h3 className="text-sm font-semibold mb-[5px] overflow-hidden line-clamp-3 text-black dark:text-mainTextColo">
                      {isMovie ? media.title : media.name}
                    </h3>
                    <p className="text-[13px] text-black dark:text-mainTextColo">
                      {isMovie
                        ? media.release_date?.slice(0, 4)
                        : media.first_air_date?.slice(0, 4)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

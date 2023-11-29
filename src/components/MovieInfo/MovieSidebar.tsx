/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FC } from 'react';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdOutlineLink } from 'react-icons/md';
import { MovieInfoTypes } from '@/Pages/MovieInfo';
import { formatDate } from '@/utilities/utilities';

interface MovieCastProps {
  movieData: MovieInfoTypes | null;
}

export const MovieSidebar: FC<MovieCastProps> = ({
  movieData,
}): JSX.Element => {
  const socials = [
    {
      base: 'https://instagram.com/',
      id: movieData?.external_ids.instagram_id,
      icon: BsInstagram,
      keyID: 9823479237498,
      name: 'Instagram',
    },
    {
      base: 'https://facebook.com/',
      id: movieData?.external_ids.facebook_id,
      icon: BsFacebook,
      keyID: 1458972394879,
      name: 'Facebook',
    },
    {
      base: 'https://twitter.com/',
      id: movieData?.external_ids.twitter_id,
      icon: BsTwitter,
      keyID: 7849236987293,
      name: 'Twitter',
    },
    {
      base: '',
      id: movieData?.homepage,
      icon: MdOutlineLink,
      keyID: 8386725394781,
      name: 'Website',
    },
  ];

  return (
    <div className="w-[260px] flex flex-col flex-1">
      <ul className="flex justify-start text-2xl w-[150px] translate-x-[-10px] mb-4">
        {socials.map(
          social =>
            social.id && (
              <li
                key={`${social.id}-${social.keyID}`}
                className="[&:not(:first-child)]:ml-[1.2rem]"
              >
                <a
                  href={`${social.base}${social.id}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${movieData?.title} ${social.name}`}
                  className="flex justify-center items-center py-[5px] px-[10px] transition-all text-black dark:text-mainTextColo hover:opacity-60"
                >
                  <social.icon />
                </a>
              </li>
            )
        )}
      </ul>
      {socials.some(s => s.id) && (
        <div className="w-full bg-[#ccc] h-[2px] mb-4 rounded-[50px]"></div>
      )}
      <div className="flex flex-col gap-y-4">
        <div>
          <h3 className="text-black dark:text-mainTextColo">Status</h3>
          <p className="text-sm mt-[2px] text-black dark:text-mainTextColo">
            {movieData?.status}
            {movieData?.status === 'Released' &&
              ` (${formatDate(
                movieData?.release_date.replace(/-/g, '/'),
                'short'
              )})`}
          </p>
        </div>
        {movieData?.budget! > 0 && (
          <div>
            <h3 className="text-black dark:text-mainTextColo">Budget</h3>
            <p className="tracking-[0.5px] text-black dark:text-mainTextColo">
              ${Number(movieData?.budget).toLocaleString()}
            </p>
          </div>
        )}
        {movieData?.revenue! > 0 && (
          <div>
            <h3 className="text-black dark:text-mainTextColo">Revenue</h3>
            <p className="tracking-[0.5px] text-black dark:text-mainTextColo">
              ${Number(movieData?.revenue).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

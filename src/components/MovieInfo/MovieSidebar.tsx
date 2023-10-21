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
    <div className="sidebar">
      <ul className="socials">
        {socials.map(
          social =>
            social.id && (
              <li key={`${social.id}-${social.keyID}`}>
                <a
                  href={`${social.base}${social.id}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${movieData?.title} ${social.name}`}
                >
                  <social.icon />
                </a>
              </li>
            )
        )}
      </ul>

      {socials.some(s => s.id) && <div className="line"></div>}
      <div className="info">
        <div className="status">
          <h3>Status</h3>
          <p>
            {movieData?.status}
            {movieData?.status === 'Released' &&
              ` (${formatDate(
                movieData?.release_date.replace(/-/g, '/'),
                'short'
              )})`}
          </p>
        </div>
        {movieData?.budget! > 0 && (
          <div className="budget">
            <h3>Budget</h3>
            <p>${Number(movieData?.budget).toLocaleString()}</p>
          </div>
        )}
        {movieData?.revenue! > 0 && (
          <div className="revenue">
            <h3>Revenue</h3>
            <p>${Number(movieData?.revenue).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

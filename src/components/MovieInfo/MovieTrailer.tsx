import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MovieInfoTypes } from '@/Pages/MovieInfo';
import { useKeyPress } from '@/hooks/useKeydownListener';

const trailerModal = document.getElementById('trailerModal') as HTMLElement;

export interface SingleMovie {
  runtime: number;
  tagline: string;
  homepage: string;
  status: string;
  budget: number;
  revenue: number;
  external_ids: {
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
  };
  credits: {
    cast: {
      id: number;
      name: string;
      credit_id: string;
      profile_path: string;
      popularity: number;
      character: string;
    }[];
    crew: {
      id: number;
      name: string;
      credit_id: string;
      profile_path: string;
      job: string;
    }[];
  };
  images: {
    backdrops: {
      width: number;
      file_path: string;
    }[];
  };
  genres: {
    id: number;
    name: string;
  }[];
  videos: {
    results: {
      type: string;
      site: string;
      key: string;
    }[];
  };
  recommendations: {
    results: {
      id: number;
      title: string;
      backdrop_path: string;
      popularity: number;
    }[];
  };
}

interface MovieTrailerProps {
  trailer?: SingleMovie['videos']['results'][0];
  setViewTrailer: React.Dispatch<React.SetStateAction<boolean>>;
  movie: MovieInfoTypes;
}

export const MovieTrailer = ({
  setViewTrailer,
  trailer,
  movie,
}: MovieTrailerProps) => {
  const escapePressed = useKeyPress('Escape');

  useEffect(() => {
    if (escapePressed) setViewTrailer(false);
  }, [escapePressed, setViewTrailer]);

  return createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-imageGallery z-[2] opacity-100"
      onClick={() => setViewTrailer(false)}
    >
      <iframe
        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=0`}
        className="trailer fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 
		max-h-[92vh] bg-black border border-[#ccc] shadow-[0_0_10px_1-px_rgba(0,0,0,0)] w-iframeW h-iframeH"
        allowFullScreen
        title={movie?.title}
      ></iframe>
    </div>,
    trailerModal
  );
};

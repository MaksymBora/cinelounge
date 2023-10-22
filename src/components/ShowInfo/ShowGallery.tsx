import React, { Dispatch, SetStateAction, useEffect } from 'react';
import ImageGallery, {
  ReactImageGalleryItem,
  isBrowser,
} from 'react-image-gallery';
import { createPortal } from 'react-dom';
import { MovieInfoTypes } from '@/Pages/MovieInfo';
import { useKeyPress } from '@/hooks/useKeydownListener';
import { imageBase } from '@/service/imagePath';
import 'react-image-gallery/styles/css/image-gallery.css';

const imageGallery = document.getElementById('imageGallery') as HTMLElement;

interface MovieGalleryProps {
  setViewGallery: Dispatch<SetStateAction<boolean>>;
  movie: MovieInfoTypes;
}

export const ShowGallery = ({ setViewGallery, movie }: MovieGalleryProps) => {
  const escapePressed = useKeyPress('Escape');
  const sizes = ['780', '1280', ''];

  useEffect(() => {
    if (escapePressed) setViewGallery(false);
  }, [escapePressed, setViewGallery]);

  const images = movie?.images.backdrops.map(entry => {
    return {
      original: `${imageBase}w780${entry.file_path}`,
      thumbnail: `${imageBase}w780${entry.file_path}`,
      originalWidth: 780,
      originalHeight: 439,
      sizes: '(max-width: 780px) 780px, (max-width: 1280px) 1280px',
      srcSet: sizes
        .map(
          (size, idx) =>
            `${imageBase}${idx < 2 ? 'w' : 'original'}${size}${
              entry.file_path
            } ${idx < 2 ? size : entry.width}w`
        )
        .join(', '),
      loading: 'lazy',
      thumbnailLoading: 'lazy',
      originalAlt: '',
      thumbnailAlt: '',
    } as ReactImageGalleryItem;
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (
      target.classList.contains('image-gallery-swipe') ||
      target.classList.contains('wrapper') ||
      target.classList.contains('image-gallery-slide-wrapper')
    ) {
      setViewGallery(false);
    }
  };

  return createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-imageGallery z-[2] wrapper"
      onClick={handleClick}
    >
      <ImageGallery
        slideInterval={2400}
        items={images}
        showFullscreenButton={isBrowser}
        showIndex
      />
    </div>,
    imageGallery
  );
};

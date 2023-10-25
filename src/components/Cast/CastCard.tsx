import { FC } from 'react';
import { Link } from 'react-router-dom';
import { imageBase } from '@/service/imagePath';

interface CastCardProps {
  castData: {
    profile_path: string;
    name: string;
    id: number;
    known_for: {
      title?: string;
      name?: string;
      id: number;
    }[];
  };
}

export const CastCard: FC<CastCardProps> = ({
  castData: { profile_path, name, known_for, id },
}) => {
  return (
    <div className="flex flex-col bg-bgCard rounded-cardBr shadow-cardShadow min-w-0">
      <Link to={`/cast/${id}`} className="relative pt-150">
        <img
          src={`${imageBase}w500${profile_path}`}
          alt={name}
          loading="lazy"
          className="absolute top-0 left-0 rounded-t-cardBr"
        />
      </Link>
      <div className="p-details flex flex-col">
        <h2 className="tex-base font-semibold">{name}</h2>
        <ul className="flex flex-col gap-y-2.5 text-sm mt-4 text-secondaryText">
          {known_for.map(movie => (
            <li
              key={movie.id}
              className="overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {movie.title || movie.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

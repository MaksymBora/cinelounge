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
  castData: { profile_path, name, known_for },
}: CastCardProps) => {
  return (
    <div>
      <Link to="/cast" className="relative pt-150">
        <img
          src={`${imageBase}w500${profile_path}`}
          alt={name}
          loading="lazy"
        />
      </Link>
      <div>
        <h2>{name}</h2>
        <ul>
          {known_for.map(movie => (
            <li key={movie.id}>{movie.title || movie.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

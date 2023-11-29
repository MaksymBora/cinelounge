import { Link } from 'react-router-dom';
import { imageBase } from '@/service/imagePath';

interface MovieCastCardProps {
  name: string;
  profile_path: string;
  character: string;
  id: number;
}

export const MovieCastCard = ({
  name,
  profile_path,
  character,
  id,
}: MovieCastCardProps) => {
  return (
    <li className="w-[138px] bg-white dark:bg-bgCard rounded-cardBr shadow-castShadow border">
      <Link to={`/cast/${id}`}>
        {/* Person ID */}
        <img
          src={`${imageBase}w342${profile_path}`}
          alt={name}
          className="w-full flex rounded-s-sm"
        />
      </Link>
      <div className="py-[13px] px-[11px]">
        <h3 className="text-sm text-black dark:text-mainTextColo">{name}</h3>
        <p className="text-xs mt-[5px] text-[#3c3c3c] dark:text-secondaryText">
          {character}
        </p>
      </div>
    </li>
  );
};

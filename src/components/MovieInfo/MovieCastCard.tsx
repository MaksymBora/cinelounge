import { Link } from 'react-router-dom';
import { imageBase } from '@/service/imagePath';

interface MovieCastCardProps {
  name: string;
  profile_path: string;
  character: string;
}
//   id: number;

export const MovieCastCard = ({
  name,
  profile_path,
  character,
}: MovieCastCardProps) => {
  return (
    <li
      className="w-[138px] bg-bgCard rounded-cardBr shadow-castShadow border
	 border-black"
    >
      <Link to="/">
        {/* Person ID */}
        <img
          src={`${imageBase}w342${profile_path}`}
          alt={name}
          className="w-full flex rounded-s-sm"
        />
      </Link>
      <div className="py-[13px] px-[11px]">
        <h3 className="text-sm">{name}</h3>
        <p className="text-xs mt-[5px] text-secondaryText">{character}</p>
      </div>
    </li>
  );
};

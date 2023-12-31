import { Link } from 'react-router-dom';
import { imageBase } from '@/service/imagePath';

//   id: number;

interface ShowCastCardPropTypes {
  name: string;
  profile_path: string;
  roles: {
    character: string;
  }[];
  id: number;
}

export const ShowCastCard = ({
  name,
  profile_path,
  roles,
  id,
}: ShowCastCardPropTypes): JSX.Element => {
  return (
    <li className="w-[138px] bg-white dark:bg-bgCard rounded-cardBr shadow-castShadow border dark:border-black">
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
          {roles[0].character}
        </p>
      </div>
    </li>
  );
};

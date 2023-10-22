import { Link } from 'react-router-dom';
import { imageBaseFace } from '@/service/imagePath';

interface CreditsItemProps {
  id: number;
  profile_path: string;
  name: string;
  character?: string;
  job?: string;
  kind: 'Cast' | 'Crew';
}

export const CreditsItem = ({
  id,
  profile_path,
  name,
  character,
  job,
  kind,
}: CreditsItemProps) => {
  return (
    <li className="flex items-center">
      <Link to={`/person/${id}`}>
        <img
          loading="lazy"
          src={`${imageBaseFace}${profile_path}`}
          alt=""
          className="w-[66px] h-[66px] object-cover object-top rounded-sm"
        />
      </Link>
      <div className="flex flex-col ml-6">
        <Link to={`/person/${id}`}>
          <h3 className="text-mainTextColo">{name}</h3>
        </Link>
        <p className="text-sm text-secondaryText">
          {kind === 'Cast' ? character : job}{' '}
        </p>
      </div>
    </li>
  );
};

CreditsItem.defaultProps = {
  character: 'Actor',
  job: 'Actor',
};

import { Link } from 'react-router-dom';
import { imageBaseFace } from '@/service/imagePath';

export interface BaseCredit {
  id: number;
  name: string;
  credit_id: string;
  profile_path: string;
  known_for_department: string;
  total_episode_count: number;
}

export interface CastCredit extends BaseCredit {
  popularity: number;
  character: string;
  roles: {
    character: string;
    credit_id: string;
  }[];
}

export interface CrewCredit extends BaseCredit {
  job: string;
  jobs: {
    job: string;
    credit_id: string;
  }[];
}

interface CreditsItemProps {
  id: number;
  profile_path: string;
  name: string;
  total_episode_count: number;
  credits: CastCredit['roles'] | CrewCredit['jobs'];
}

export const CreditsItem = ({
  id,
  profile_path,
  name,
  total_episode_count,
  credits,
}: CreditsItemProps) => {
  const role =
    'character' in credits[0] ? credits[0].character : credits[0].job;

  return (
    <li className="flex items-center">
      <Link to={`/cast/${id}`} tabIndex={-1}>
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
          {role}
          <span>({total_episode_count} episodes)</span>
        </p>
      </div>
    </li>
  );
};

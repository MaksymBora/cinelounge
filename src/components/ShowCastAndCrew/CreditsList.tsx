import { CreditsItem } from './CreditsItem';

interface CastCredit {
  cast: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
    roles: {
      character: string;
      credit_id: string;
      episode_count: number;
    }[];
    total_episode_count: number;
  };
}

interface CrewCredit {
  crew: {
    adult: boolean;
    department: string;
    gender: number;
    id: number;
    jobs: {
      credit_id: string;
      episode_count: number;
      job: string;
    }[];
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | number;
    total_episode_count: number;
  };
}

interface CreditsListProps {
  // eslint-disable-next-line react/require-default-props
  credits?: CastCredit[] | CrewCredit[];
  creditType: string;
}

export const CreditsList = ({
  credits,
  creditType,
}: CreditsListProps): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="listHeading text-[22px] mb-4 capitalize text-black dark:text-mainTextColo font-semibold">
        {creditType}
      </h2>
      <ul className="flex flex-col gap-y-4">
        {credits?.map(
          c =>
            c.profile_path && (
              <CreditsItem
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...c}
                credits={'roles' in c ? c.roles : c.jobs}
                key={
                  'roles' in c ? c.roles?.[0].credit_id : c.jobs?.[0].credit_id
                }
              />
            )
        )}
      </ul>
    </div>
  );
};

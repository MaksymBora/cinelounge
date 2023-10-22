import { CreditsItem } from './CreditsItem';

export const CreditsList = ({ credits, kind }): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="listHeading text-[22px] mb-4 capitalize">{kind}</h2>
      <ul className="flex flex-col gap-y-4">
        {credits?.map(
          c =>
            c.profile_path && (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <CreditsItem {...c} key={c.credit_id} kind={kind} />
            )
        )}
      </ul>
    </div>
  );
};

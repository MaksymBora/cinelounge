import { useLoaderData } from 'react-router-dom';
import { CastCard } from './CastCard';

interface CastListProps {
  profile_path: string;
  name: string;
  id: number;
  known_for: {
    title?: string;
    name?: string;
    id: number;
  }[];
}

interface ApiResponse {
  data: {
    results: CastListProps[];
  };
}

export const CastList = () => {
  const response = useLoaderData() as ApiResponse;

  const data = response.data.results;

  return (
    <section className="container grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo w-full">
      {data.map(person => (
        <CastCard castData={person} key={person.id} />
      ))}
    </section>
  );
};

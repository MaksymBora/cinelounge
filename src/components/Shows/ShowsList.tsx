import { useLoaderData } from 'react-router-dom';
import { ShowsCard } from './ShowsCard';

interface ShowsCardProps {
  poster_path: string;
  name: string;
  first_air_date: string;
  id: number;
  vote_average: number;
}

interface ApiResponse {
  data: {
    results: ShowsCardProps[];
  };
}

export const ShowsList = () => {
  const response = useLoaderData() as ApiResponse;

  const data = response.data.results;

  return (
    <section className="container grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo w-full">
      {data.map(
        (movie: ShowsCardProps) =>
          movie.poster_path && <ShowsCard showsData={movie} key={movie.id} />
      )}
    </section>
  );
};

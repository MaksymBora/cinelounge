import { ShowsCard } from './ShowsCard';

interface ShowsCardProps {
  poster_path: string;
  name: string;
  first_air_date: string;
  id: number;
  vote_average: number;
}

export const ShowsList = ({ filterMenuOpen, showsData }) => {
  return (
    <section
      className={` grid grid-cols-filmList gap-8 bg-inherit text-mainTextColo  ${
        filterMenuOpen ? 'widthWithFilter' : 'w-full'
      }`}
    >
      {showsData?.results.map(
        (movie: ShowsCardProps) =>
          movie.poster_path && <ShowsCard showsData={movie} key={movie.id} />
      )}
    </section>
  );
};

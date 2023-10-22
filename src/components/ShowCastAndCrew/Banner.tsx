import { Link, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { imageBase } from '@/service/imagePath';

export const Banner = ({ movieData }): JSX.Element => {
  const { id } = useParams();

  return (
    <div className="bg-bgCard">
      <header className="max-w-xxl my-0 mx-auto flex items-center mb-12">
        <img
          src={`${imageBase}w342${movieData?.poster_path}`}
          alt="Poster"
          className="w-[58px] rounded-sm my-4 mx-0"
        />
        <div className="flex flex-col gap-y-1.5 h-full ml-8">
          <h1 className="text-[26px]">
            {movieData?.name}
            <span className="font-normal tracking-[2px]">
              ({movieData?.first_air_date.slice(0, 4)})
            </span>
          </h1>
          <Link
            to={`/shows/${id}`}
            className="flex items-center text-sl text-secondaryText [&>svg]:text-3xl [&>svg]:mr-[5px]"
          >
            <BsArrowLeftShort /> Back to main
          </Link>
        </div>
      </header>
    </div>
  );
};

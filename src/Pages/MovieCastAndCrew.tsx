import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieInfoTypes } from './MovieInfo';
import { getMovieByID } from '@/service/serviceMovies';
import { Banner } from '@/components/MovieCastAndCrew/Banner';
import { CreditsList } from '@/components/MovieCastAndCrew/CreditsList';

const MovieCastAndCrew = () => {
  const [movie, setMovie] = useState<MovieInfoTypes | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const result = async () => {
      try {
        const response = await getMovieByID(id);
        setMovie(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    result();
  }, [id]);

  return (
    <div className="my-12">
      <Banner movieData={movie} />
      <div className="max-w-xxl flex flex-col my-0 mx-auto">
        <div className="flex justify-between items-start">
          <CreditsList credits={movie?.credits.cast} kind="Cast" />
          <CreditsList credits={movie?.credits.crew} kind="Crew" />
        </div>
      </div>
    </div>
  );
};

export default MovieCastAndCrew;

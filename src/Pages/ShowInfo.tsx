import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieInfoTypes } from './MovieInfo';
import { getTVByID } from '@/service/serviceMovies';
import { ShowAbout } from '@/components/ShowInfo/ShowAbout';
import { ShowCast } from '@/components/ShowInfo/ShowCast';

const ShowInfo = () => {
  const [movie, setMovie] = useState<MovieInfoTypes | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const result = async () => {
      try {
        const response = await getTVByID(id);
        setMovie(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    result();
  }, [id]);

  return (
    <>
      <ShowAbout movieData={movie} />
      <section className="flex justify-between items-start gap-x-12 max-w-xxl mt-0 mx-auto mb-12">
        <ShowCast movieData={movie} />
        {/* <MovieSidebar movieData={movie} /> */}
      </section>
      {/* <Recommendations movieData={movie} /> */}
    </>
  );
};

export default ShowInfo;

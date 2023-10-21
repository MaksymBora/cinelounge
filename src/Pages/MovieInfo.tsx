import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieByID } from '@/service/serviceMovies';
import { MovieAbout } from '@/components/MovieInfo/MovieAbout';

interface Genre {
  id: number;
  name: string;
}

export interface MovieInfoTypes {
  poster_path: string;
  title: string;
  release_date: string;
  tagline: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
  overview: string;
  backdrop_path: string;
  images: {
    backdrops: [
      {
        file_path: string;
        width: number;
      },
    ];
    logos: [];
    posters: [];
  };
}

const MovieInfo = (): JSX.Element => {
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
    <>
      <MovieAbout movieData={movie} />
      <section>
        <h2>{movie?.title}</h2>
        <p>Movie sidebar</p>
      </section>
      <p>Movie recommendations</p>
    </>
  );
};

export default MovieInfo;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieByID } from '@/service/serviceMovies';
import { MovieAbout } from '@/components/MovieInfo/MovieAbout';
import { MovieCast } from '@/components/MovieInfo/MovieCast';
import { MovieSidebar } from '@/components/MovieInfo/MovieSidebar';
import { Recommendations } from '@/components/MovieInfo/Recommendations';

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
  homepage: string;
  budget: number;
  revenue: number;
  status: string;
  images: {
    backdrops: {
      file_path: string;
      width: number;
    }[];

    logos: [];
    posters: [];
  };
  videos: {
    results: {
      type: string;
      site: string;
      key: string;
    }[];
  };
  credits: {
    cast: {
      id: number;
      name: string;
      credit_id: string;
      profile_path: string;
      popularity: number;
      character: string;
    }[];
    crew: {
      id: number;
      name: string;
      credit_id: string;
      profile_path: string;
      job: string;
    }[];
  };
  external_ids: {
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
  };
  recommendations: {
    results: {
      id: number;
      title: string;
      backdrop_path: string;
      popularity: number;
    }[];
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
      <section className="flex justify-between items-start gap-x-12 max-w-xxl mt-0 mx-auto mb-12">
        <MovieCast movieData={movie} />
        <MovieSidebar movieData={movie} />
      </section>
      <Recommendations movieData={movie} />
    </>
  );
};

export default MovieInfo;

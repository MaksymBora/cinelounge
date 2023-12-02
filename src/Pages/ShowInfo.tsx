import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTVByID } from '@/service/serviceMovies';
import { ShowAbout } from '@/components/ShowInfo/ShowAbout';
import { ShowCast } from '@/components/ShowInfo/ShowCast';
import { ShowSidebar } from '@/components/ShowInfo/ShowSidebar';

export interface ShowInfoTypes {
  poster_path: string;
  name: string;
  title: string;
  first_air_date: string;
  release_date: string;
  tagline: string;
  vote_average: number;
  runtime: number;
  id: number;
  genres: {
    id: number;
    name: string;
  }[];
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
  number_of_seasons: number;
  number_of_episodes: number;
  last_air_date: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  aggregate_credits: {
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
    }[];
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
    }[];
  };
}

const ShowInfo = () => {
  const [movie, setMovie] = useState<ShowInfoTypes | null>(null);
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
        <ShowSidebar movieData={movie} />
      </section>
      {/* <Recommendations movieData={movie} /> */}
    </>
  );
};

export default ShowInfo;

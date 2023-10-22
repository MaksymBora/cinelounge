import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTVByID } from '@/service/serviceMovies';
import { Banner } from '@/components/ShowCastAndCrew/Banner';
import { CreditsList } from '@/components/ShowCastAndCrew/CreditsList';

interface CastCredit {
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
  };
}

interface CrewCredit {
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
  };
}

export interface ShowPropTypes {
  poster_path: string;
  name: string;
  title: string;
  first_air_date: string;
  release_date: string;
  tagline: string;
  vote_average: number;
  runtime: number;
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
    cast: CastCredit[];
    crew: CrewCredit[];
  };
}

const ShowCastAndCrew = (): JSX.Element => {
  const [show, setShow] = useState<ShowPropTypes | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const result = async () => {
      try {
        const response = await getTVByID(id);
        setShow(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    result();
  }, [id]);

  return (
    <div className="my-12">
      {show && <Banner movieData={show} />}
      <div className="max-w-xxl flex flex-col my-0 mx-auto">
        <div className="flex justify-between items-start">
          <CreditsList
            credits={show?.aggregate_credits.cast}
            creditType="Cast"
          />
          <CreditsList
            credits={show?.aggregate_credits.crew}
            creditType="Crew"
          />
        </div>
      </div>
    </div>
  );
};

export default ShowCastAndCrew;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActorByID } from '@/service/serviceMovies';
import { ActorDetails } from '@/components/Cast/ActorDetails';

interface ActorBaseTypes {
  adult: boolean;
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  id: number;
  imdb_id: string;
  known_for_deparment: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  images: {
    profiles: {
      file_path: string;
    }[];
  };
}

interface CastTypes {
  cast: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    name: string;
    credit_id: string;
    profile_path: string;
    popularity: number;
    character: string;
    media_type: string;
    order: number;
    original_language: string;
    title: string;
    release_daate: string;
  }[];
}

interface CrewTypes {
  crew: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    department: number;
    id: number;
    name: string;
    credit_id: string;
    profile_path: string;
    popularity: number;
    character: string;
    media_type: string;
    order: number;
    original_language: string;
    original_title: string;
    title: string;
    release_daate: string;
    job: string;
  }[];
}

interface ActorFullInfo extends ActorBaseTypes {
  also_known_as: [];
  combined_credits: CastTypes[] | CrewTypes[];
}

const Actor = (): JSX.Element => {
  const [actor, setActor] = useState<ActorFullInfo | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const result = async () => {
      try {
        const response = await getActorByID(id);
        setActor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    result();
  }, [id]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const hasMultipleImages = actor?.images.profiles.length! > 1;

  return <ActorDetails person={actor} hasMultipleImages={hasMultipleImages} />;
};

export default Actor;

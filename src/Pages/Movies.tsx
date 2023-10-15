import { useEffect, useState } from 'react';
import { getAllMovies } from '@/service/serviceMovies';

interface MoviesCardProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
}

function Movies() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const result = async () => {
      try {
        const movies = await getAllMovies();
        if (movies) {
          setMovieList(movies.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    result();
  }, []);

  return (
    <div>
      <section>
        <ul>
          {movieList.map((movie: MoviesCardProps) => {
            return (
              <li key={movie.id}>
                <p>{movie.title}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Movies;

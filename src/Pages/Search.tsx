import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchResult } from '@/service/serviceMovies';
import { SearchResult } from '@/components/Search/SearchResult';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [queryResult, setQueryResult] = useState([]);

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query === null) {
      setQueryResult([]);
      return;
    }

    const result = async () => {
      try {
        const data = await getSearchResult(query);
        setQueryResult(data.results);
      } catch (error) {
        throw Error(`${error}`);
      }
    };

    result();
  }, [query]);

  return <SearchResult results={queryResult} />;
};

export default Search;

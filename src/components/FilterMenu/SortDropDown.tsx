import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { dropdownStyles } from '@/utilities/dropdownStyles';
import { FilterDataContext } from '@/context/filterData-context';
import { getSortedBy } from '@/service/serviceFilter';

type MovieSort =
  | 'popularity.desc'
  | 'vote_average.desc'
  | 'primary_release_date.desc'
  | 'revenue.desc'
  | 'vote_count.desc';

interface OptionsType {
  value: MovieSort;
  label: string;
}

const options: OptionsType[] = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'primary_release_date.desc', label: 'Newly released' },
  { value: 'revenue.desc', label: 'Revenue' },
  { value: 'vote_count.desc', label: 'Review count' },
];

export const initialMovieFilterState = {
  year: [1000, 9999],
  runtime: [0, 999],
  rating: [0, 100],
  genres: [],
  services: [],
};

export const SortDropDown = () => {
  const [selectedOption, setSelectedOption] = useState<OptionsType | null>(
    null
  );
  const { setFilterData } = useContext(FilterDataContext);

  const setSortOption = (selected: OptionsType | null) => {
    setSelectedOption(selected);
  };

  useEffect(() => {
    if (selectedOption) {
      const fetchSortedBy = async (sortData, filterData) => {
        try {
          const res = await getSortedBy(sortData, filterData);

          return setFilterData(res.results);
        } catch (error) {
          console.log(error);
          return undefined;
        }
      };
      fetchSortedBy(selectedOption.value, initialMovieFilterState);
    }
  }, [selectedOption, setFilterData]);

  return (
    <div className="mb-8">
      <h3 className="text-center">Sort by</h3>
      <Select
        options={options}
        className="text-black"
        styles={dropdownStyles}
        onChange={newValue => setSortOption(newValue as OptionsType | null)}
        defaultValue={options}
        value={selectedOption}
        isSearchable={false}
      />
    </div>
  );
};

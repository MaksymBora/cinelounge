import Select from 'react-select';
import { useContext, useEffect } from 'react';
import { dropdownStyles } from '@/utilities/dropdownStyles';
import { FilterDataContext } from '@/context/filterData-context';
import { getSortedBy } from '@/service/serviceFilterMovies';

type ShowSort = 'popularity.desc' | 'vote_average.desc' | 'first_air_date.desc';

interface OptionsType {
  value: ShowSort;
  label: string;
}

const options: OptionsType[] = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'first_air_date.desc', label: 'Newly released' },
];

export const initialMovieFilterState = {
  year: [1000, 9999],
  runtime: [0, 999],
  rating: [0, 100],
  genres: [],
  services: [],
};

export const SortDropDown = ({ selectedOption, setSelectedOption }) => {
  const { setFilterData } = useContext(FilterDataContext);

  const setSortOption = (selected: OptionsType | null) => {
    setSelectedOption(selected);
  };

  useEffect(() => {
    if (selectedOption) {
      const fetchSortedBy = async (sortData, filterData) => {
        try {
          const res = await getSortedBy(sortData, filterData);
          if (res) setFilterData(res.data);
        } catch (error) {
          console.log(error);
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

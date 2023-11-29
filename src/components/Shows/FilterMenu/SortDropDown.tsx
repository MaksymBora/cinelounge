import Select from 'react-select';
import { useContext, useEffect } from 'react';
import { dropdownStyles } from '@/utilities/dropdownStyles';
import { FilterDataContext } from '@/context/filterData-context';
import { getShowsSortedBy } from '@/service/serviceFilterMovies';

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

export const initialShowsFilterState = {
  year: [1000, 9999],
  rating: [0, 100],
  genres: [],
  services: [],
  status: [],
  type: [],
};

export const SortDropDown = ({ selectedOption, setSelectedOption }) => {
  const { setShowsData } = useContext(FilterDataContext);

  const setSortOption = (selected: OptionsType | null) => {
    setSelectedOption(selected);
  };

  useEffect(() => {
    if (selectedOption) {
      const fetchSortedBy = async (sortData, filterData) => {
        try {
          const res = await getShowsSortedBy(sortData, filterData);
          if (res) setShowsData(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSortedBy(selectedOption.value, initialShowsFilterState);
    }
  }, [selectedOption, setShowsData]);

  return (
    <div className="mb-8">
      <h3 className="text-center text-black dark:text-mainTextColo mb-2 font-semibold text-[18px]">
        Sort by
      </h3>
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

import { useState } from 'react';
import Select from 'react-select';
import { dropdownStyles } from '@/utilities/dropdownStyles';

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

export const SortDropDown = () => {
  const [selectedOption, setSelectedOption] = useState<OptionsType | null>(
    null
  );

  const setSortOption = (selected: OptionsType | null) => {
    setSelectedOption(selected);

    console.log(selected);
  };

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

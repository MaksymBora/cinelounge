import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { dropdownStyles } from '@/utilities/dropdownStyles';

const animatedComponents = makeAnimated();

const options = [
  { value: 0, label: 'Returning Series' },
  { value: 3, label: 'Ended' },
  { value: 4, label: 'Cancelled' },
];

export const StatusDropdown = ({ showsFormData, setShowsFormData }) => {
  const handleGenreChange = active => {
    setShowsFormData({
      ...showsFormData,
      genres: active,
    });
  };

  return (
    <div className="mb-8">
      <h3 className="text-center">Status</h3>
      <Select
        options={options}
        className="text-black"
        styles={dropdownStyles}
        value={showsFormData.genres}
        isSearchable={false}
        isMulti
        onChange={handleGenreChange}
        components={animatedComponents}
      />
    </div>
  );
};

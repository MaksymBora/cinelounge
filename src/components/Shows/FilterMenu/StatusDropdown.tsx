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
      status: active,
    });
  };

  return (
    <div className="mb-8">
      <h3 className="text-center text-black dark:text-mainTextColo mb-2 font-semibold text-[18px]">
        Status
      </h3>
      <Select
        options={options}
        className="text-black"
        styles={dropdownStyles}
        value={showsFormData.status}
        isSearchable={false}
        isMulti
        onChange={handleGenreChange}
        components={animatedComponents}
      />
    </div>
  );
};

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { dropdownStyles } from '@/utilities/dropdownStyles';

const animatedComponents = makeAnimated();

const options = [
  { value: 4, label: 'Scripted' },
  { value: 2, label: 'Miniseries' },
  { value: 3, label: 'Reality' },
  { value: 0, label: 'Documentary' },
  { value: 5, label: 'Talk Show' },
];

export const TypeDropdown = ({ showsFormData, setShowsFormData }) => {
  const handleGenreChange = active => {
    setShowsFormData({
      ...showsFormData,
      type: active,
    });
  };

  return (
    <div className="mb-8">
      <h3 className="text-center text-black dark:text-mainTextColo mb-2 font-semibold text-[18px]">
        Type
      </h3>
      <Select
        options={options}
        className="text-black"
        styles={dropdownStyles}
        value={showsFormData.type}
        isSearchable={false}
        isMulti
        onChange={handleGenreChange}
        components={animatedComponents}
      />
    </div>
  );
};

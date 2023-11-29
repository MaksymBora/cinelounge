import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { dropdownStyles } from '@/utilities/dropdownStyles';
import { showGenres } from '@/data/genres';

const animatedComponents = makeAnimated();

export const GenreDropdown = ({ showsFormData, setShowsFormData }) => {
  const handleGenreChange = active => {
    setShowsFormData({
      ...showsFormData,
      genres: active,
    });
  };

  return (
    <div className="mb-8">
      <h3 className="text-center text-black dark:text-mainTextColo mb-2 font-semibold text-[18px]">
        Genre
      </h3>
      <Select
        options={showGenres}
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

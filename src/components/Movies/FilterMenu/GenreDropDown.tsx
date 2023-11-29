import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { dropdownStyles } from '@/utilities/dropdownStyles';
import { movieGenres } from '@/data/genres';

const animatedComponents = makeAnimated();

export const GenreDropdown = ({ formData, setFormData }) => {
  const handleGenreChange = active => {
    setFormData({
      ...formData,
      genres: active,
    });
  };

  return (
    <div className="mb-8">
      <h3 className="text-center text-black dark:text-mainTextColo mb-2 font-semibold text-[18px]">
        Genre
      </h3>
      <Select
        options={movieGenres}
        className="text-black"
        styles={dropdownStyles}
        value={formData.genres}
        isSearchable={false}
        isMulti
        onChange={handleGenreChange}
        components={animatedComponents}
      />
    </div>
  );
};

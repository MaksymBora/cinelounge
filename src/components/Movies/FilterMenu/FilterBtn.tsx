import { IoOptionsOutline } from 'react-icons/io5';

export const FilterBtn = ({ filterMenuOpen, setFilterMenuOpen }) => {
  const toggleMenu = () => {
    setFilterMenuOpen(prevState => !prevState);
  };

  return (
    <div className="max-w-xxl flex items-center  mx-auto mt-6 -mb-6 justify-start">
      <button
        className="flex items-center bg-transparent border-none text-mainTextColo cursor-pointer"
        type="button"
        onClick={toggleMenu}
      >
        <IoOptionsOutline
          size={32}
          className="text-black dark:text-mainTextColo"
        />
        <span className="text-black dark:text-mainTextColo text-base ml-2">
          {filterMenuOpen ? 'Hide Filters' : 'Show Filters'}
        </span>
      </button>
    </div>
  );
};

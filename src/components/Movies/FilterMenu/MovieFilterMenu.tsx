import { useContext, useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { SortDropDown } from './SortDropDown';
import { GenreDropdown } from './GenreDropDown';
import { MoviesCustomRange } from './MovieCustomRange';
import { markStyles } from '@/utilities/CustomRangeMarksStyles';
import { watchProviders } from '@/data/watchProviders';
import { MoviesServiceItem } from './MovieServiceItem';
import { getSortedBy } from '@/service/serviceFilterMovies';
import { FilterDataContext } from '@/context/filterData-context';
import { AppContext } from '@/context/app-context';

const initialMovieFilterState = {
  year: [1000, 9999],
  runtime: [0, 999],
  rating: [0, 100],
  genres: [],
  services: [],
};

interface OptionsType {
  value: MovieSort;
  label: string;
}

type MovieSort =
  | 'popularity.desc'
  | 'vote_average.desc'
  | 'primary_release_date.desc'
  | 'revenue.desc'
  | 'vote_count.desc';

export const MovieFilterMenu = () => {
  const { MoviesformData, setMoviesFormData } = useContext(FilterDataContext);
  const [selectedOption, setSelectedOption] = useState<OptionsType | null>(
    null
  );
  const { setMoviesData } = useContext(FilterDataContext);
  const { setPage } = useContext(AppContext);
  const { setShouldFetchData } = useContext(AppContext);

  const rangeProps = [
    {
      name: 'year',
      min: 1980,
      max: 2023,
      step: 1,
      tipFormatter: (v: number) => v,
      state: MoviesformData.year,
      marks: markStyles.year,
    },
    {
      name: 'rating',
      min: 0,
      max: 100,
      step: 1,
      tipFormatter: (v: number) => `${v}%`,
      state: MoviesformData.rating,
      marks: markStyles.rating,
    },
    {
      name: 'runtime',
      min: 0,
      max: 240,
      step: 5,
      tipFormatter: (v: number) => `${v}%`,
      state: MoviesformData.runtime,
      marks: markStyles.runtime,
    },
  ];

  const applyFilters = e => {
    e.preventDefault();
    const sort = 'popularity.desc';
    const fetchSortedBy = async (sortData, dataFromFilters) => {
      try {
        const res = await getSortedBy(sortData, dataFromFilters);
        setMoviesData(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSortedBy(sort, MoviesformData);
  };

  const resetForm = e => {
    e.preventDefault();
    setMoviesFormData(initialMovieFilterState);
    setMoviesData(null);
    setSelectedOption(null);
    setPage(1);
    setShouldFetchData(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="scroll  w-[230px] px-px sticky h-[80vh] active:translate-x-0 active: opacity-100">
      <form className="form" onSubmit={applyFilters}>
        <SortDropDown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className="bg-[#ddd] h-px rounded-[10px] mb-4"></div>

        <GenreDropdown
          formData={MoviesformData}
          setFormData={setMoviesFormData}
        />

        <div className="bg-[#ddd] h-px rounded-[10px] mb-4"></div>
        {rangeProps.map(r => (
          <MoviesCustomRange
            key={r.name}
            formData={MoviesformData}
            setFormData={setMoviesFormData}
            name={r.name}
            min={r.min}
            max={r.max}
            step={r.step}
            state={r.state}
            marks={r.marks}
            tipFormatter={r.tipFormatter}
          />
        ))}
        <div className="bg-[#ddd] h-px rounded-[10px] mb-4"></div>
        <div className="flex flex-col items-center w-full mb-8">
          <h3 className="w-full mb-6 text-center">Services</h3>
          <ul className="w-full grid gap-[5px] grid-cols-4">
            {watchProviders.map(p => (
              <MoviesServiceItem
                setFormData={setMoviesFormData}
                state={MoviesformData.services}
                stateStr="services"
                id={p.provider_id}
                name={p.provider_name}
                img={p.logo_path}
                key={`${p.provider_id}-${p.provider_name}`}
              />
            ))}
          </ul>
        </div>
        <div className="bg-[#ddd] h-px rounded-[10px] mb-4"></div>
        <div className="flex flex-col gap-y-5 mt-8 mr-0 mb-8 ml-[2px]">
          <button
            className="text-[17px] font-medium p-[15px] rounded-[3px] border-none text-left cursor-pointer shadow-filterBtn bg-authBtn text-black dark:text-mainTextColo"
            type="submit"
            aria-label="Apply filters"
          >
            <span className="flex justify-between items-center">
              Apply <HiOutlineArrowNarrowRight className="scale-160 mr-[5px]" />
            </span>
          </button>
          <button
            className="text-[17px] font-medium p-[15px] rounded-[3px] border-none text-left cursor-pointer shadow-filterBtn bg-clearAllBtn text-black"
            type="button"
            onClick={resetForm}
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
};

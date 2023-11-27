import { imageBase } from '@/service/imagePath';

// interface MovieFilterData {
//   year: number[];
//   runtime: number[];
//   rating: number[];
//   services: number[];
//   genres: {
//     value: number;
//     label: string;
//   }[];
// }

// interface MoviesServiceItemProps {
//   formData: MovieFilterData;
//   setFormData: React.Dispatch<React.SetStateAction<MovieFilterData>>;
//   id: number;
//   name: string;
//   img: string;
//   state: number[];
//   stateStr: string;
// }

export const MoviesServiceItem = ({
  setFormData,
  id,
  name,
  state,
  stateStr,
  img,
}) => {
  const toggleService = () => {
    setFormData(prevData => {
      const newState = state.includes(id)
        ? state.filter(x => x !== id)
        : [...state, id];

      return {
        ...prevData,
        [stateStr]: newState,
      };
    });
  };

  return (
    <li className="flex items-center">
      <button
        type="button"
        onClick={toggleService}
        className={`bg-transparent cursor-pointer duration-500 border-[1px] border-[black] m-[2px] rounded-[2px] opacity-100 ${
          state.length > 0 && !state.includes(id) ? 'opacity-20' : ''
        }`}
        aria-pressed={state.includes(id)}
        aria-label={name}
      >
        <img
          src={`${imageBase}original${img}`}
          loading="lazy"
          alt=""
          className="flex rounded-[1px]"
        />
      </button>
    </li>
  );
};

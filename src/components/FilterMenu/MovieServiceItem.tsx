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
  formData,
  setFormData,
  id,
  name,
  state,
  stateStr,
  img,
}) => {
  const toggleService = () => {
    let newState;

    // If item not already in list, add item
    if (!state.includes(id)) newState = [...state, id];
    // If item already in list, remove item
    else newState = state.filter(x => x !== id);

    setFormData({
      ...formData,
      [stateStr]: newState,
    });
  };

  return (
    <li className="flex items-center">
      <button
        type="button"
        onClick={toggleService}
        // className={state.length > 0 && !state.includes(id) ? styles.fade : ''}
        className="bg-transparent cursor-pointer duration-500 border-[1px] border-[black] m-[2px] rounded-[2px] opacity-100"
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

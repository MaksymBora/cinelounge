import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { imageBase } from '@/service/imagePath';

export const MovieAbout = ({ movieData }) => {
  console.log(movieData);

  return (
    <section className="my-12 mx-0 relative">
      <div className="h-[600px] bg-movieAboutBg">
        <div
          style={{
            background: `url('${imageBase}original${movieData?.backdrop_path}') no-repeat top center/cover`,
          }}
          className="absolute w-full h-full -z-[1]"
        />
        <div className="grid grid-cols-[1fr, 4fr] items-center gap-x-16 z-[1] max-w-xxl mx-auto my-0 text-white relative h-full">
          <button
            type="button"
            className="w-[300px] flex items-start rounded-cardBr relative text-xl border-none overflow-hidden bg-black cursor-pointer transition duration-250 ease-in group"
          >
            <img
              src={`${imageBase}w780${movieData?.poster_path}`}
              alt=""
              className="transition-all group-hover:opacity-25"
            />
            <p className="opacity-0 w-full h-full absolute top-0 left-0 transition-all flex justify-center items-center text-white group-hover:opacity-100 ">
              <i>
                <HiOutlineArrowsExpand className="text-2xl flex hover:opacity-60" />
              </i>
              <span className="ml-1.5">View Gallery</span>
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

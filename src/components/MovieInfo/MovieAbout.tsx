import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { FiPercent } from 'react-icons/fi';
import { imageBase } from '@/service/imagePath';
import { colorPercentage, formatRuntime } from '@/utilities/utilities';

export const MovieAbout = ({ movieData }): JSX.Element | null => {
  if (!movieData) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { vote_average } = movieData;
  console.log(vote_average);

  return (
    <section className="my-12 mx-0 relative">
      <div className="h-[600px] bg-movieAboutBg">
        <div
          style={{
            background: `url('${imageBase}original${movieData?.backdrop_path}') no-repeat top center/cover`,
          }}
          className="absolute w-full h-full -z-[1]"
        />
        <div className="grid grid-cols-[1fr,4fr] items-center gap-x-16 z-[1] max-w-xxl mx-auto my-0 text-white relative h-full">
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

          {/* Title */}
          <div>
            <div className="flex items-center flex-wrap">
              <h1 className="text-[32px] mb-1.5 font-bold font-['Montserrat']">
                {movieData?.title}{' '}
                {movieData?.release_date && (
                  <span className="text-3xl ml-2.5 font-normal tracking-[2px] text-[32px]">
                    ({movieData?.release_date.slice(0, 4)})
                  </span>
                )}
              </h1>
            </div>
            {movieData?.tagline && (
              <p className="text-sm italic mb-3">{movieData?.tagline}</p>
            )}
            {/* Rating and Info */}
            <div className="inline-flex items-center justify-between whitespace-nowrap mt-3 mb-4">
              <div className="flex items-center text-base">
                <div
                  className="flex items-center justify-center bg-[#081c22] text-white w-[55px] h-[55px] rounded-[50px] text-lg"
                  style={{
                    border: `3px solid ${
                      movieData?.vote_average
                        ? colorPercentage(vote_average / 10)
                        : '#777'
                    }`,
                  }}
                >
                  <p className="tracking-normal">
                    {movieData?.vote_average
                      ? +vote_average.toFixed(1) * 10
                      : 'NR'}
                  </p>
                  {movieData?.vote_average ? (
                    <FiPercent className="text-[8px] translate-x-[1px] translate-y-[-3px]" />
                  ) : null}
                </div>
                {movieData?.runtime ? (
                  <span className="mx-4 w-[2px] rounded-[10px] text-mainTextColo opacity-60 h-[30px]" />
                ) : (
                  ''
                )}
                {movieData?.runtime ? (
                  <p className="runtime">{formatRuntime(movieData?.runtime)}</p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

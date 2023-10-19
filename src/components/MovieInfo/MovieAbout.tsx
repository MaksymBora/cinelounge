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
      </div>
    </section>
  );
};

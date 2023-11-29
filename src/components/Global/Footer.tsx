import logo from '@/images/logo1.svg';

export const Footer = (): JSX.Element => {
  return (
    <footer className="h-[70px] bg-[#f5f5f5] dark:bg-navFooter shadow-navShadow">
      <div className="flex justify-center items-center max-w-xxl h-full my-0 mx-auto text-white leading-normal">
        <p className="text-black dark:text-mainTextColo tracking-[0.5px] text-base">
          Data provided by:
        </p>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <img
            src={logo}
            alt="The Movie Database"
            className="w-[90px] ml-1.5"
          />
        </a>
      </div>
    </footer>
  );
};

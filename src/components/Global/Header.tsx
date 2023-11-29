import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import { AppContext } from '@/context/app-context';
import { logout } from '@/service/serviceAuth';

export function Header() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string | undefined>(
    searchParams.get('searchQuery') ?? ''
  );
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  // const [darkMode, setDarkMode] = useState(true);
  // console.log(darkMode);

  const handleQuery = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query?.trim() === '') {
      return;
    }
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('query', query || '');
    navigate({
      pathname: '/search',
      search: `?${newSearchParams.toString()}`,
    });
  };

  const handleLogout = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const res = await logout(storedToken);

      setIsLoggedIn(false);

      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <nav className="flex h-navHeight bg-headerColor shadow-navShadow">
      <div className="flex items-center grow justify-between grow-1 container xl mx-auto">
        <ul className="flex basis-0 grow gap-8 items-center">
          <li>
            <Link to="/" className="text-lg py-3 hover:opacity-75">
              Movies
            </Link>
          </li>

          <li>
            <Link to="shows" className="text-lg py-3 hover:opacity-75">
              Shows
            </Link>
          </li>

          <li>
            <Link to="cast" className="text-lg py-3 hover:opacity-75">
              Cast
            </Link>
          </li>
        </ul>

        <form className="w-96" onSubmit={handleSubmit}>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full h-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Movie"
              required
              onChange={handleQuery}
            />
            <button
              type="submit"
              className="text-white absolute right-[5px] bottom-[6px] pt-[4px] pb-[4px] bg-blue-700 
              hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
              rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex items-center justify-end gap-3 grow">
          <IoMoon />
          <IoSunny />
          {/* ======== Watchlist  ======= */}
          <Link to="/watchlist" className="flex items-center mr-3">
            <BsBookmarkFill className="mr-2" />
            Watchlist
          </Link>

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="py-[8px] px-[15px] cursor-pointer bg-authBtn border border-transparent rounded text-[15px] transition-opacity tracking-normal hover:opacity-80"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="py-[8px] px-[15px] cursor-pointer bg-authBtn border border-transparent rounded text-[15px] transition-opacity tracking-normal hover:opacity-80"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

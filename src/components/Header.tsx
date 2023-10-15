import { Link } from 'react-router-dom';

export function Header() {
  return (
    <nav className="flex h-navHeight bg-headerColor shadow-headerShadow">
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

        <form>
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </form>
        <div className="flex items-center justify-end gap-3 grow">
          <button type="button">Watchlist</button>
          <button type="button">Login</button>
        </div>
      </div>
    </nav>
  );
}

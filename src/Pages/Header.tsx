import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Movies</Link>
          </li>

          <li>
            <Link to="shows">Shows</Link>
          </li>

          <li>
            <Link to="cast">Cast</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

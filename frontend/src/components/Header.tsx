import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-wrap">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <img src="../img/logo-dog.svg" alt="Dog logo. Click for Home" />
                <h1>Puppy Share</h1>
                <img src="../img/logo-dog.svg" alt="Dog logo. Click for Home" />
              </Link>
            </li>
            <li>
              <Link to="/">Dog Collection</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            <li>
              <Link to="#">Contact</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;

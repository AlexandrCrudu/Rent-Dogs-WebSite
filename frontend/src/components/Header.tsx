import { Link } from "react-router-dom";
import { useContext } from "react";
import JWTContext from "../JWTContext";

const Header = () => {
  const handleLogout = () => {
    console.log("logging out...");
    setJwt("");
  };

  const [jwt, setJwt] = useContext(JWTContext);
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
              <Link to="/">Collection</Link>
            </li>
            <li>
              <Link to="#">About</Link>
            </li>
            {jwt ? (
              <li>
                {" "}
                <Link to="/account">My account</Link>{" "}
              </li>
            ) : null}
            <li>
              {jwt ? (
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;

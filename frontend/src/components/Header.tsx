import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import TokenContext from "./Contexts/TokenContext";
import UserContext from "./Contexts/UserContext";

const Header = () => {
  const [token, setToken] = useContext(TokenContext);
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    console.log("logging out...");
    setToken(null);
    localStorage.setItem("token", "");
    setUser(null);
  };

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
              <Link to="/about">About</Link>
            </li>
            {token ? (
              <li>
                {" "}
                <Link to="/my-orders">My orders</Link>{" "}
              </li>
            ) : null}
            <li>
              {token ? (
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

import React from "react";

const Header = () => {
  return (
    <div className="header-wrap">
      <header>
        <nav>
          <ul>
            <li>
              <a href="#">
                <img src="../img/logo-dog.svg" alt="Dog logo. Click for Home" />
                <h1>Puppy Share</h1>
                <img src="../img/logo-dog.svg" alt="Dog logo. Click for Home" />
              </a>
            </li>
            <li>
              <a href="#">Dog Collection</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;

import { Link } from "react-router-dom";
import coffeeLogo from "../../images/coffee-logo.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img
            src={coffeeLogo}
            alt="BrewMap logo"
            className="header__logo-image"
          />
          <span className="header__logo-text">BrewMap</span>
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">
            Home
          </Link>
          <Link to="/about" className="header__nav-link">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

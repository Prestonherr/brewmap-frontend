import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import coffeeLogo from "../../images/coffee-logo.png";
import AuthModal from "../AuthModal/AuthModal";
import { isAuthenticated, getCurrentUser, logout } from "../../utils/auth-api";
import "./Header.css";

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoggedIn(isAuthenticated());
    setUser(getCurrentUser());
  }, []);

  const handleAuthSuccess = () => {
    setLoggedIn(true);
    setUser(getCurrentUser());
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <>
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
            {loggedIn ? (
              <>
                <span className="header__user-name">{user?.name}</span>
                <button
                  className="header__logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="header__login-button"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
                <button
                  className="header__register-button"
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  Register
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        mode="login"
        onAuthSuccess={handleAuthSuccess}
      />
      <AuthModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        mode="register"
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}

export default Header;

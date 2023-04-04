import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import AuthService from "../../../services/auth.service";
import UserService from "../../../services/user.service";
import "../css/Menubar.css";

const Menubar = () => {
  const [loggedInUser, setLoggedInUser] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setLoggedInUser(user);
      setAdminUser(user.is_admin);
    }
  }, []);
  useEffect(() => {
    if (loggedInUser) getUserById();
  }, [loggedInUser]);

  const logOut = () => {
    AuthService.logout();
    setAdminUser(false);
    setLoggedInUser(undefined);
    closeMobileMenu();
  };

  const getUserById = () => {
    UserService.getUserById(loggedInUser.user_id)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // nach pfaden prüfen
  function useShouldRenderMenubar() {
    const location = useLocation();

    if (
      location.pathname == "/loginRasp" ||
      location.pathname == "/Raspberryhome" ||
      location.pathname == "/terminal" ||
      location.pathname == "/rfidscan"
    )
      return null;
    else return true;
  }

  const shouldRender = useShouldRenderMenubar();

  if (!shouldRender) {
    return null;
  }

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo"></Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          {currentUser && (
            <div className="menu-credit-label">
              Guthaben: {currentUser.credits.toFixed(2)} €
            </div>
          )}
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {currentUser && (
              <div className="menu-credit-label2">
                Guthaben: {currentUser.credits.toFixed(2)} €
              </div>
            )}
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            {loggedInUser && (
              <li className="nav-item">
                <Link
                  to="/orders"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Bestellungen
                </Link>
              </li>
            )}

            {adminUser && (
              <li className="nav-item">
                <Link
                  to="/manage"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Verwalten
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                to="/aboutUs"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Über uns
              </Link>
            </li>
            {loggedInUser && currentUser && (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {currentUser.username}
                </Link>
              </li>
            )}
            {loggedInUser ? (
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={logOut}>
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menubar;

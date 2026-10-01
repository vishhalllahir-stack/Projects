import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Icon from "./Icon";


function Navbar() {

  const navigate = useNavigate();


  /* ==========================================
     GET LOGIN DATA
  ========================================== */

  const token =
    localStorage.getItem("token");

  const userData =
    localStorage.getItem("user");


  let user = null;


  /* ==========================================
     PARSE USER
  ========================================== */

  try {
    user = userData
      ? JSON.parse(userData)
      : null;
  } catch (error) {
    user = null;
  }


  /* ==========================================
     DARK / LIGHT MODE
  ========================================== */

  const [darkMode, setDarkMode] = useState(() => {

    const savedTheme =
      localStorage.getItem("samaj-rental-theme");

    return savedTheme === "dark";
  });


  /* ==========================================
     APPLY THEME
  ========================================== */

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-mode"
      );

      localStorage.setItem(
        "samaj-rental-theme",
        "dark"
      );

    } else {

      document.body.classList.remove(
        "dark-mode"
      );

      localStorage.setItem(
        "samaj-rental-theme",
        "light"
      );
    }

  }, [darkMode]);


  /* ==========================================
     TOGGLE THEME
  ========================================== */

  const toggleTheme = () => {

    setDarkMode((previousMode) =>
      !previousMode
    );
  };


  /* ==========================================
     LOGOUT
  ========================================== */

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };


  /* ==========================================
     HIDE NAVBAR IF NOT LOGGED IN
  ========================================== */

  if (!token || !user) {
    return null;
  }


  /* ==========================================
     NAVLINK CLASS
  ========================================== */

  const navLinkClass = ({
    isActive,
  }) =>
    `navbar-link ${
      isActive
        ? "navbar-link-active"
        : ""
    }`;


  /* ==========================================
     USER INFORMATION
  ========================================== */

  const isAdmin =
    user.role === "admin";

  const userName =
    user.name || "User";

  const avatarLetter =
    userName
      .charAt(0)
      .toUpperCase();


  return (
    <header className="navbar">

      {/* ======================================
          LOGO
      ====================================== */}

      <div
        className="navbar-logo"
        onClick={() =>
          navigate(
            isAdmin
              ? "/admin"
              : "/dashboard"
          )
        }
      >

        <div className="navbar-logo-icon">
          <Icon
            name="home"
            size={23}
          />
        </div>


        <div className="navbar-logo-content">

          <div className="navbar-logo-title">
            Samaj Rental
          </div>

          <div className="navbar-logo-subtitle">
            Community Rental System
          </div>

        </div>

      </div>


      {/* ======================================
          NAVIGATION
      ====================================== */}

      <nav className="navbar-nav">

        {isAdmin ? (

          /* ==================================
             ADMIN NAVIGATION
          ================================== */

          <>

            <NavLink
              to="/admin"
              end
              className={navLinkClass}
            >
              <Icon
                name="dashboard"
                size={16}
              />

              <span>
                Dashboard
              </span>
            </NavLink>


            <NavLink
              to="/admin/items"
              className={navLinkClass}
            >
              <Icon
                name="package"
                size={16}
              />

              <span>
                Items
              </span>
            </NavLink>


            <NavLink
              to="/admin/bookings"
              className={navLinkClass}
            >
              <Icon
                name="clipboard"
                size={16}
              />

              <span>
                Bookings
              </span>
            </NavLink>


            <NavLink
              to="/admin/users"
              className={navLinkClass}
            >
              <Icon
                name="users"
                size={16}
              />

              <span>
                Users
              </span>
            </NavLink>


            <NavLink
              to="/admin/bills"
              className={navLinkClass}
            >
              <Icon
                name="bill"
                size={16}
              />

              <span>
                Bills
              </span>
            </NavLink>

          </>

        ) : (

          /* ==================================
             USER NAVIGATION
          ================================== */

          <>

            <NavLink
              to="/dashboard"
              end
              className={navLinkClass}
            >
              <Icon
                name="home"
                size={16}
              />

              <span>
                Dashboard
              </span>
            </NavLink>


            <NavLink
              to="/items"
              end
              className={navLinkClass}
            >
              <Icon
                name="utensils"
                size={16}
              />

              <span>
                Rental Items
              </span>
            </NavLink>


            <NavLink
              to="/cart"
              className={navLinkClass}
            >
              <Icon
                name="cart"
                size={16}
              />

              <span>
                Cart
              </span>
            </NavLink>


            <NavLink
              to="/my-bookings"
              className={navLinkClass}
            >
              <Icon
                name="clipboard"
                size={16}
              />

              <span>
                My Bookings
              </span>
            </NavLink>

          </>

        )}

      </nav>


      {/* ======================================
          USER AREA
      ====================================== */}

      <div className="navbar-user-area">


        {/* ====================================
            DARK / LIGHT MODE BUTTON
        ==================================== */}

        <button
          type="button"
          className="navbar-theme-toggle"
          onClick={toggleTheme}
          title={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
          aria-label={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
        >

          <span className="theme-icon">
            {darkMode ? "☀️" : "🌙"}
          </span>

          <span className="theme-text">
            {darkMode
              ? "Light"
              : "Dark"}
          </span>

        </button>


        {/* ====================================
            USER INFORMATION
        ==================================== */}

        <div className="navbar-user-info">

          <div className="navbar-avatar">
            {avatarLetter}
          </div>


          <div className="navbar-user-text">

            <strong>
              {userName}
            </strong>


            <span>
              {isAdmin
                ? "Administrator"
                : user.village ||
                  "User"}
            </span>

          </div>

        </div>


        {/* ====================================
            LOGOUT
        ==================================== */}

        <button
          type="button"
          className="navbar-logout"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}


export default Navbar;
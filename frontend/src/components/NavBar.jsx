import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useAuth } from "../context/useAuth.js";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">
          Student Management
        </Link>
      </div>

      <div className="navbar-right">
        {user && (
          <>
            <span className="user-name">
              {user.name}
            </span>

            <span className="user-role">
              {user.role}
            </span>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
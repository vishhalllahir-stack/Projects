import { NavLink, useLocation } from "react-router-dom";

export default function NavDropdown({ label, items, image }) {
  const location = useLocation();
  const isActive = items.some(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`)
  );

  return (
    <div className={`nav-dropdown${isActive ? " is-active" : ""}`}>
      <button type="button" className="nav-dropdown-trigger">
        {label}
      </button>

      <div className="nav-dropdown-panel">
        <div className="nav-dropdown-inner">
          <div className="nav-dropdown-links">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: linkActive }) =>
                  linkActive ? "nav-dropdown-link active" : "nav-dropdown-link"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {image && (
            <div className="nav-dropdown-banner">
              <img src={image} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

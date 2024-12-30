import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const user = localStorage.getItem("user");
  const userString = localStorage.getItem("user");
  const userAdmin = userString ? JSON.parse(userString) : {};
  const isAdmin = userAdmin.isAdmin;

  const getActiveClass = (path) => {
    return location.pathname === path ? "sidebar-active" : "";
  };

  return (
    <div className="sidebar-wrapper">
      <div className={`sidebar-item ${getActiveClass("/")}`}>
        <Link className="link" to="/">
          <i className="bi bi-house-door"></i>
          <div className="sidebar-item-label">Ana Sayfa</div>
        </Link>
      </div>
      <div className={`sidebar-item ${getActiveClass("/profile")}`}>
        {user ? (
          <Link
            className="link"
            to="/profile"
          >
            <i className="bi bi-person-circle"></i>
            <div className="sidebar-item-label">Profil</div>
          </Link>
        ) : (
          <Link
            className="link"
            to="/login"
          >
            <i className="bi bi-person-circle"></i>
            <div className="sidebar-item-label">Profil</div>
          </Link>
        )}
      </div>
      <div className={`sidebar-item ${getActiveClass("/favorite")}`}>
        {user ? (
          <Link
            className="link"
            to="/favorite"
          >
            <i className="bi bi-bookmark"></i>
            <div className="sidebar-item-label">Favoriler</div>
          </Link>
        ) : (
          <Link
            className="link"
            to="/login"
          >
            <i className="bi bi-bookmark"></i>
            <div className="sidebar-item-label">Favoriler</div>
          </Link>
        )}
      </div>
      <div className="sidebar-item">
        {isAdmin && (
          <Link
            className={`link ${getActiveClass("/category")}`}
            to="/category"
          >
            <i className="bi bi-list"></i>
            <div className="sidebar-item-label">Kategoriler</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

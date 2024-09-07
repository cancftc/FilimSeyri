import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const userString = localStorage.getItem("user");

  const userAdmin = userString ? JSON.parse(userString) : {};

  const isAdmin = userAdmin.isAdmin;

  const exit = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload(navigate("/"));
  };

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-right">
          <Link className="link" to="/">
            AnaSayfa
          </Link>
          {user && (
            <Link className="link" to="/profile">
              Profilim
            </Link>
          )}
          <Link className="link" to="/about">
            Hakkımızda
          </Link>
          {isAdmin && (
            <Link className="link" to="/category">
              Kategoriler
            </Link>
          )}
        </div>
        <div className="header-center">
          <input type="text" placeholder="Ara..." />
        </div>
        <div className="header-left">
          <Link to="/login">
            <i className="bi bi-person"></i>
          </Link>
        </div>
        {user && (
          <div>
            <button className="exitButton" onClick={exit}>
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

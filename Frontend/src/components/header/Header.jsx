import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [getByIdProfile, setGetByIdProfile] = useState(null);
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [searchClick, setSearchClick] = useState(true);

  const user = localStorage.getItem("user");

  const exit = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload(navigate("/"));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSearchSuggestions(value);
  };

  const fetchSearchSuggestions = async (e) => {
    if (e.trim()) {
      const res = await axios.post("http://localhost:5000/api/post/search", {
        search: e.trim(),
      });
      setSearchSuggestion(res.data.slice(0, 10));
    } else {
      setSearchSuggestion([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate("/search/" + search);
    }
  };

  const handleSearchClick = () => {
    if (search.trim()) {
      navigate("/search/" + search);
    }
  };

  const handleSearchSuggestionsClick = (e) => {
    setSearch(e);
    if (search.trim()) {
      navigate("/search/" + e);
    }
  };

  const getByProfile = () => {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if (user) {
      axios
        .post("http://localhost:5000/api/auth/getById", { userId: user._id })
        .then((res) => {
          setGetByIdProfile(res.data);
        });
    }
  };

  const searchResponsiveClick = (deger) => {
    setSearchClick(deger);
    const headerCenter = document.querySelector(".header-center");
    if (deger) {
      headerCenter.style.display = "none";
    } else {
      headerCenter.style.display = "block";
    }
  };

  useEffect(() => {
    getByProfile();
  }, []);

  return (
    <div className="header-wrapper">
      <div className="header-right">
        <img src="../../film (5).png" className="logo-icon" />
        <Link className="header-logo" to="/">
          SeyirKeyfi
        </Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Ara"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />

        <div className="bi-search-button" onClick={handleSearchClick}>
          <i className="bi bi-search"></i>
        </div>

        <div className="search-suggestion dropdown-menu">
          {search.trim() === "" ? (
            <div className="search-suggestion-item no-results">
              Aramak için bir değer girin
            </div>
          ) : searchSuggestion.length > 0 ? (
            searchSuggestion.map((val, index) => (
              <div
                key={index}
                className="search-suggestion-item"
                onClick={() => handleSearchSuggestionsClick(val.title)}
              >
                {val.title}
              </div>
            ))
          ) : (
            <div className="search-suggestion-item no-results">
              Aranan sonuç bulunamadı
            </div>
          )}
        </div>
      </div>

      <div className="header-left">
        {searchClick && (
          <div
            className="bi-search-click"
            onClick={() => searchResponsiveClick(false)}
          >
            <i className="bi bi-search responseve-search"></i>
          </div>
        )}

        {!searchClick && (
          <div
            className="bi-search-click"
            onClick={() => searchResponsiveClick(true)}
          >
            <i className="bi bi-x-lg"></i>
          </div>
        )}

        {!user && (
          <div className="login-profil-wrapper">
            <Link to="/login" className="login-profil-wrapper2">
              <div className="login-profil">
                <i className="bi bi-person-circle profil-icon"></i>
                <div className="session">Oturum aç</div>
              </div>
            </Link>
          </div>
        )}

        {user && (
          <div>
            {getByIdProfile?.images ? (
              <img
                className="header-avatar"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                src={`http://localhost:5000/${getByIdProfile?.images.path}`}
                alt={getByIdProfile.name}
              />
            ) : (
              <img
                className="header-avatar"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                src="../../avatar2.jpg"
                alt=""
              />
            )}
            <div className="dropdown-menu">
              <div className="exit-button" onClick={exit}>
                <i className="bi bi-box-arrow-right"></i>
                <div>Otutumu Kapat</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

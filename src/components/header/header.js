import "./header.scss";
import { Link } from "react-router-dom";
import MarvelLogo from "../../assets/img/marvel-logo-4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ search, setSearch }) => {
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="header-logo">
              <img src={MarvelLogo} alt="marvel-logo" />
            </Link>
            <div className="header-search-bar">
              <form>
                <i>
                  <FontAwesomeIcon icon="search" size="2x" />
                </i>
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Rechercher"
                />
              </form>
            </div>
          </div>
          <div className="header-right">
            <div className="header-menu">
              <nav>
                <Link to="/characters">CHARACTERS</Link>
                <Link to="/comics">COMICS</Link>
                <Link to="/favorite">FAVORITE</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

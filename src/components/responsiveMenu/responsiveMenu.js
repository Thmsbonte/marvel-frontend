import "./responsiveMenu.scss";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ setResponsiveMenu, responsiveMenu, setSearch }) => {
  return (
    <div className="header-menu-xs container">
      <nav>
        <Link
          to="/characters"
          onClick={() => {
            setResponsiveMenu(!responsiveMenu);
            setSearch("");
          }}
        >
          CHARACTERS
        </Link>
        <Link
          to="/comics"
          onClick={() => {
            setResponsiveMenu(!responsiveMenu);
            setSearch("");
          }}
        >
          COMICS
        </Link>
        <Link
          to="/favorites"
          onClick={() => {
            setResponsiveMenu(!responsiveMenu);
            setSearch("");
          }}
        >
          FAVORITES
        </Link>
      </nav>
    </div>
  );
};

export default ResponsiveMenu;

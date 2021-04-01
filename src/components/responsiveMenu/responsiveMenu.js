import "./responsiveMenu.scss";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ setResponsiveMenu, responsiveMenu }) => {
  return (
    <div className="header-menu-xs container">
      <nav>
        <Link
          to="/characters"
          onClick={() => setResponsiveMenu(!responsiveMenu)}
        >
          CHARACTERS
        </Link>
        <Link to="/comics" onClick={() => setResponsiveMenu(!responsiveMenu)}>
          COMICS
        </Link>
        <Link
          to="/favorites"
          onClick={() => setResponsiveMenu(!responsiveMenu)}
        >
          FAVORITES
        </Link>
      </nav>
    </div>
  );
};

export default ResponsiveMenu;

import "./header.scss";
import { Link, useHistory } from "react-router-dom";
import MarvelLogo from "../../assets/img/marvel-logo-4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import LoginModal from "../loginModal/loginModal";
import SignupModal from "../signupModal/signupModal";
import Cookies from "js-cookie";

const Header = ({
  search,
  setSearch,
  userInfo,
  setUser,
  responsiveMenu,
  setResponsiveMenu,
}) => {
  //When opening the page, display of the login page
  const [modal, setModal] = useState({
    loginModal: true,
    signupModal: false,
  });

  // If user is known, hide login modal
  useEffect(() => {
    if (Cookies.get("userToken")) {
      const newModal = { ...modal };
      newModal.loginModal = false;
      setModal(newModal);
    }
    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  // Function : update login modal state to display or not the modal
  const updateModal = () => {
    const newModal = { ...modal };
    newModal.loginModal = !modal.loginModal;
    setModal(newModal);
  };

  return (
    <>
      {/* Display login and signup modal when necessary */}
      {modal.loginModal && (
        <LoginModal modal={modal} setModal={setModal} setUser={setUser} />
      )}
      {modal.signupModal && (
        <SignupModal modal={modal} setModal={setModal} setUser={setUser} />
      )}
      <div className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <Link to="/" className="header-logo">
                <img src={MarvelLogo} alt="marvel-logo" />
              </Link>
              <div className="header-search-bar hidden-xs">
                <form>
                  <i>
                    <FontAwesomeIcon icon="search" size="2x" />
                  </i>
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Rechercher"
                  />
                </form>
              </div>
            </div>
            {/* Responsive : div hidden when small device */}
            <div className="header-right">
              <div className="header-menu">
                <nav>
                  <Link
                    to="/characters"
                    onClick={() => {
                      setSearch("");
                    }}
                  >
                    CHARACTERS
                  </Link>
                  <Link
                    to="/comics"
                    onClick={() => {
                      setSearch("");
                    }}
                  >
                    COMICS
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={() => {
                      setSearch("");
                    }}
                  >
                    FAVORITES
                  </Link>
                </nav>
              </div>
              {/* If user is connected display of a logout button */}
              {userInfo.token ? (
                <button
                  className="Button-logout"
                  onClick={() => {
                    setUser(null);
                    updateModal();
                    history.push("/");
                  }}
                >
                  Se déconnecter
                </button>
              ) : (
                // If user is not connected diplay of the login button
                <button onClick={() => updateModal()} className="Button-login">
                  Se connecter
                </button>
              )}
              {/* Responsive : display menu icon */}
              <div
                className="visible-xs menu-icon"
                onClick={() => {
                  setResponsiveMenu(!responsiveMenu);
                }}
              >
                <FontAwesomeIcon icon="bars" size="2x" />
              </div>
            </div>
          </div>
          <div className="header-search-bar visible-xxs">
            <form>
              <i>
                <FontAwesomeIcon icon="search" size="2x" />
              </i>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher"
              />
            </form>
          </div>
          {responsiveMenu && (
            <div className="login-button-xxs">
              {userInfo.token ? (
                <button
                  className="Button-logout"
                  onClick={() => {
                    setUser(null);
                    setResponsiveMenu(!responsiveMenu);
                    updateModal();
                    history.push("/");
                  }}
                >
                  Se déconnecter
                </button>
              ) : (
                // If user is not connected diplay of the login button
                <button onClick={() => updateModal()} className="Button-login">
                  Se connecter
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

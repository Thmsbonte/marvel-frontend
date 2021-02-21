import "./header.scss";
import { Link, useHistory } from "react-router-dom";
import MarvelLogo from "../../assets/img/marvel-logo-4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import LoginModal from "../loginModal/loginModal";
import SignupModal from "../signupModal/signupModal";
import Cookies from "js-cookie";

const Header = ({ search, setSearch, userInfo, setUser }) => {
  //When opening the page we display the login page
  const [modal, setModal] = useState({
    loginModal: true,
    signupModal: false,
  });

  // If user is known we hide login modal
  useEffect(() => {
    if (Cookies.get("userToken")) {
      const newModal = { ...modal };
      newModal.loginModal = false;
      setModal(newModal);
    }
  }, []);

  const history = useHistory();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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
                  <Link to="/favorites">FAVORITES</Link>
                </nav>
              </div>
              {/* If user connected display of a logout button */}
              {userInfo.token ? (
                <button
                  className="Button-logout"
                  onClick={() => {
                    setUser(null);
                    const newModal = { ...modal };
                    newModal.loginModal = !modal.loginModal;
                    setModal(newModal);
                    history.push("/");
                  }}
                >
                  Se déconnecter
                </button>
              ) : (
                // If user not connected diplay of the login button
                <button
                  onClick={() => {
                    const newModal = { ...modal };
                    newModal.loginModal = !modal.loginModal;
                    setModal(newModal);
                  }}
                  className="Button-login"
                >
                  Se connecter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

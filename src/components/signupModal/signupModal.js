import "../loginModal/loginModal.scss";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const SignupModal = ({ setUser, modal, setModal }) => {
  // States initialization
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Function : save all text inputs changes
  const handleInputChange = (event) => {
    const newCredentials = { ...credentials };
    newCredentials[event.target.id] = event.target.value;
    setCredentials(newCredentials);
  };

  // Function : handle form submit-> send new user sign-up data to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Initialization of an error message state
    setLoadingMessage(true); // Display of a loading message

    try {
      const response = await axios.post(
        "https://thmsbonte-marvel-backend.herokuapp.com/user/signup",
        credentials
      );
      setUser(response.data.token, response.data._id); // Save user token and username information
      setLoadingMessage(false);
      setModal(false);
    } catch (error) {
      setLoadingMessage(false);
      console.log(error);
      setErrorMessage(error.response.data.message); // Set an "error message" to display to the user
    }
  };

  return (
    <div className="Modal">
      <div className="Modal-content">
        <div className="Modal-header">
          {Cookies.get("userToken") && (
            <i
              onClick={() => {
                const newModal = { ...modal };
                newModal.signupModal = !modal.signupModal;
                setModal(newModal);
              }}
            >
              <FontAwesomeIcon icon="times" size="lg" />
            </i>
          )}
        </div>
        <h1>Inscription</h1>
        {/* Display loading or error messages when needed */}
        {loadingMessage && (
          <p className="Login-error-message">
            {"Profil en cours de création ..."}
          </p>
        )}
        {errorMessage && <p className="Login-error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            value={credentials.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            value={credentials.password}
            onChange={handleInputChange}
          />
          <button type="submit">S'inscrire</button>
        </form>
        {/* Link to the login page */}
        <Link
          onClick={() => {
            const newModal = { ...modal };
            newModal.loginModal = !modal.loginModal;
            newModal.signupModal = !modal.signupModal;
            setModal(newModal);
          }}
        >
          Déjà un compte ? Je me connecte !
        </Link>
      </div>
    </div>
  );
};

export default SignupModal;

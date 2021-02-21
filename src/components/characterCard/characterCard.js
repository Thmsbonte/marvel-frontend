import "./character-card.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const CharacterCard = ({ characterData }) => {
  const localStorage = window.localStorage;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favCharacters")) || [];
    const index = favorites.findIndex((elem) => {
      return elem._id === characterData._id;
    });
    index === -1 ? favorites.push(characterData) : favorites.splice(index, 1);
    localStorage.setItem("favCharacters", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favCharacters")) || [];
    favorites.findIndex((elem) => {
      return elem._id === characterData._id;
    }) !== -1 && setIsFavorite(true);
  }, []);

  return (
    <div className="character-card">
      <Link
        to={{ pathname: `/character/${characterData._id}` }}
        className="character-card-content"
      >
        <img
          src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}
          alt="marvel-character"
        />
        {isFavorite && (
          <Link
            to="#"
            className="character-card-favorite"
            onClick={handleFavorite}
            style={
              isFavorite ? { color: "rgb(218, 218, 75)" } : { color: "white" }
            }
          >
            <FontAwesomeIcon icon="star" size="2x" />
          </Link>
        )}

        <div className="character-card-information">
          <Link
            to="#"
            className="character-card-favorite-hover"
            onClick={handleFavorite}
          >
            <FontAwesomeIcon icon="star" size="2x" />
          </Link>
          <div className="character-card-details">
            <h2>{characterData.name}</h2>
            <p>{characterData.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;

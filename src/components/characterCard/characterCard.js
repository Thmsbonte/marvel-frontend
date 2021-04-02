import "./character-card.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const CharacterCard = ({ characterData, setSearch }) => {
  const localStorage = window.localStorage;
  const [isFavorite, setIsFavorite] = useState(false);

  // Function : tag/untag character as favorite and save/delete its data from "Favorites" local storage
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favCharacters")) || [];
    const index = favorites.findIndex((elem) => {
      // If character's data already exists, we get its array index
      return elem._id === characterData._id;
    });
    index === -1 ? favorites.push(characterData) : favorites.splice(index, 1); // According to index, we add or delete character's data from local storage
    localStorage.setItem("favCharacters", JSON.stringify(favorites));
    setIsFavorite(!isFavorite); // In any case we update its "favorite" state
  };

  // When opening component, update of its "favorite" state according to local storage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favCharacters")) || [];
    favorites.findIndex((elem) => {
      return elem._id === characterData._id;
    }) !== -1 && setIsFavorite(true);
  }, [characterData._id, localStorage]);

  return (
    <div className="character-card">
      <Link
        to={{ pathname: `/character/${characterData._id}` }} // Whole character-card redirect to character's page chen clicked
        className="character-card-content"
      >
        <img
          src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`}
          alt="marvel-character"
        />
        {isFavorite && ( // If tag as favorite, display of a yellow star which does not redirect to character's page when clicked
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
            <h2
              dangerouslySetInnerHTML={{
                __html: characterData.name,
              }}
            ></h2>
            <p
              dangerouslySetInnerHTML={{
                __html: characterData.description,
              }}
            ></p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;

import "./comic-card.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const ComicCard = ({ comicData }) => {
  const localStorage = window.localStorage;
  const [isFavorite, setIsFavorite] = useState(false);

  // Function : tag/untag comic as favorite and save/delete its data from "Favorites" local storage
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favComics")) || [];
    const index = favorites.findIndex((elem) => {
      // If comic's data already exists, we get its array index
      return elem._id === comicData._id;
    });
    index === -1 ? favorites.push(comicData) : favorites.splice(index, 1); // According to index, we add or delete comic's data from local storage
    localStorage.setItem("favComics", JSON.stringify(favorites));
    setIsFavorite(!isFavorite); // In any case we update its "favorite" state
  };

  // When opening component, update of its "favorite" state according to local storage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favComics")) || [];
    favorites.findIndex((elem) => {
      return elem._id === comicData._id;
    }) !== -1 && setIsFavorite(true);
  }, [localStorage, comicData._id]);

  return (
    <div className="comic-card">
      <div className="comic-card-content">
        <img
          src={`${comicData.thumbnail.path}.${comicData.thumbnail.extension}`}
          alt="marvel-comic"
        />
        {isFavorite && ( // If tag as favorite, display of a yellow star which does not redirect to comics' page when clicked
          <div
            to="#"
            className="comic-card-favorite"
            onClick={handleFavorite}
            style={
              isFavorite ? { color: "rgb(218, 218, 75)" } : { color: "white" }
            }
          >
            <FontAwesomeIcon icon="star" size="2x" />
          </div>
        )}
        <div className="comic-card-information">
          <Link
            to="#"
            className="comic-card-favorite-hover"
            onClick={handleFavorite}
            style={
              isFavorite ? { visibility: "hidden" } : { visibility: "visible" }
            }
          >
            <FontAwesomeIcon icon="star" size="2x" />
          </Link>
          <div className="comic-card-details">
            <h2
              dangerouslySetInnerHTML={{
                __html: comicData.title,
              }}
            ></h2>
            <p
              dangerouslySetInnerHTML={{
                __html: comicData.description,
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;

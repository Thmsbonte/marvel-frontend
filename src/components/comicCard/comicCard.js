import "./comic-card.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const ComicCard = ({ comicData }) => {
  const localStorage = window.localStorage;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favComics")) || [];
    const index = favorites.findIndex((elem) => {
      return elem._id === comicData._id;
    });
    index === -1 ? favorites.push(comicData) : favorites.splice(index, 1);
    localStorage.setItem("favComics", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favComics")) || [];
    favorites.findIndex((elem) => {
      return elem._id === comicData._id;
    }) !== -1 && setIsFavorite(true);
  }, []);

  return (
    <div className="comic-card">
      <Link
        to={{ pathname: "/comics", data: { comicData } }}
        className="comic-card-content"
      >
        <img
          src={`${comicData.thumbnail.path}.${comicData.thumbnail.extension}`}
          alt="marvel-comic"
        />
        {isFavorite && (
          <Link
            to="#"
            className="comic-card-favorite"
            onClick={handleFavorite}
            style={
              isFavorite ? { color: "rgb(218, 218, 75)" } : { color: "white" }
            }
          >
            <FontAwesomeIcon icon="star" size="2x" />
          </Link>
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
            <h2>{comicData.title}</h2>
            <p>{comicData.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ComicCard;

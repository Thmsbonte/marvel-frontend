import "./character-card.scss";
import { Link } from "react-router-dom";

const CharacterCard = ({ characterData }) => {
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
        <div className="character-card-information">
          <h2>{characterData.name}</h2>
          <p>{characterData.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;

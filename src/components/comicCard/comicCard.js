import "./comic-card.scss";
import { Link } from "react-router-dom";

const CommicCard = ({ comicData }) => {
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
        <div className="comic-card-information">
          <h2>{comicData.title}</h2>
          <p>{comicData.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default CommicCard;

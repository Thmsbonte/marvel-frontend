import "./character.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IsLoading from "../../components/isLoading/isLoading";
import CommicCard from "../../components/comicCard/comicCard";

const Character = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comicsRelated, setComicsRelated] = useState([]);
  const { character_id } = useParams();
  console.log(character_id);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/comics/${character_id}`
      );
      setComicsRelated(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <IsLoading />
  ) : (
    <div className="character">
      <div className="container">
        <div className="character-content">
          <div className="character-picture">
            <img
              src={`${comicsRelated.thumbnail.path}.${comicsRelated.thumbnail.extension}`}
              alt="marvel-character"
            />
          </div>
          <div className="character-information">
            <div className="character-comics">
              {comicsRelated.comics.map((item) => {
                return (
                  <div className="character-comic" key={item._id}>
                    <CommicCard comicData={item} />
                  </div>
                );
              })}
            </div>

            <div className="character-details">
              <h2>{comicsRelated.name}</h2>
              <p>{comicsRelated.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
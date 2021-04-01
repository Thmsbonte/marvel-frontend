import "./character.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IsLoading from "../../components/isLoading/isLoading";
import ComicCard from "../../components/comicCard/comicCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResponsiveMenu from "../../components/responsiveMenu/responsiveMenu";

const Character = ({ search, responsiveMenu, setResponsiveMenu }) => {
  // States initialization
  const [isLoading, setIsLoading] = useState(true);
  const [comicsRelated, setComicsRelated] = useState([]);

  const { character_id } = useParams();

  // At the opening of the page, one data request
  useEffect(() => {
    // Function : get comics related to a specific character
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://thmsbonte-marvel-backend.herokuapp.com/comics/${character_id}`
        );
        setComicsRelated(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [character_id]);

  return !responsiveMenu ? (
    isLoading ? (
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
              <div className="character-details">
                <h2>{comicsRelated.name}</h2>
                <p>{comicsRelated.description}</p>
              </div>
              <div className="carousel">
                <div>
                  {comicsRelated.comics.length > 0 ? (
                    <p>
                      {comicsRelated.comics.length} comics related to this
                      character :
                    </p>
                  ) : (
                    <p className="no-comic-related">
                      No comic related to this character.
                    </p>
                  )}
                </div>
                <div className="character-comics-content">
                  {comicsRelated.comics.length > 3 && (
                    <i className="arrow-left">
                      <FontAwesomeIcon icon="arrow-left" />
                    </i>
                  )}
                  <div className="character-comics">
                    {comicsRelated.comics.map((item) => {
                      return (
                        <div className="character-comic" key={item._id}>
                          <ComicCard comicData={item} />
                        </div>
                      );
                    })}
                  </div>
                  {comicsRelated.comics.length > 3 && (
                    <i className="arrow-right">
                      <FontAwesomeIcon icon="arrow-right" />
                    </i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <ResponsiveMenu
      responsiveMenu={responsiveMenu}
      setResponsiveMenu={setResponsiveMenu}
    />
  );
};

export default Character;

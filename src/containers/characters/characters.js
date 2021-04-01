import "./characters.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "../../components/characterCard/characterCard";
import IsLoading from "../../components/isLoading/isLoading";
import Pagging from "../../components/pagging/pagging";
import PaggingLimit from "../../components/paggingLimit/paggingLimit";
import ResponsiveMenu from "../../components/responsiveMenu/responsiveMenu";

const Characters = ({ search, responsiveMenu, setResponsiveMenu }) => {
  // States initialization
  const [charactersData, setCharactersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState("10");
  const [skip, setSkip] = useState("0");
  const pagging = Number(skip) + Number(limit);

  // Function : get characters data according to filters
  const fetchData = async (search, skip, limit) => {
    let url = "https://thmsbonte-marvel-backend.herokuapp.com/characters?";
    if (search) {
      url += `name=${search}&`;
    }
    if (skip) {
      url += `skip=${skip}&`;
    }
    if (limit) {
      url += `limit=${limit}&`;
    }
    try {
      const response = await axios.get(url);
      setCharactersData(response.data.results); // Save characters data in a state
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Each time search, skip or limit state change, new data request
  useEffect(() => {
    fetchData(search, skip, limit);
  }, [search, skip, limit]);

  return !responsiveMenu ? (
    <div className="characters">
      <div className="container">
        <div className="characters-hero">
          <h1>CHARACTERS</h1>
          <div className="characters-paging">
            <Pagging
              skip={skip}
              limit={limit}
              pagging={pagging}
              setSkip={setSkip}
            />
          </div>
          <div className="character-pagging-limit">
            <PaggingLimit setLimit={setLimit} />
          </div>
        </div>
        {isLoading ? (
          <IsLoading />
        ) : (
          <div className="characters-content">
            {charactersData.map((item) => {
              return (
                <div className="character-card" key={item._id}>
                  <CharacterCard characterData={item} />
                </div>
              );
            })}
          </div>
        )}
        <div className="characters-paging">
          <div className="characters-paging">
            <Pagging
              skip={skip}
              limit={limit}
              pagging={pagging}
              setSkip={setSkip}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ResponsiveMenu
      responsiveMenu={responsiveMenu}
      setResponsiveMenu={setResponsiveMenu}
    />
  );
};

export default Characters;

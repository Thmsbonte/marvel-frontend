import "./characters.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import CharacterCard from "../../components/characterCard/characterCard";
import IsLoading from "../../components/isLoading/isLoading";

const Characters = () => {
  const [charactersData, setCharactersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (name, skip, limit) => {
    let url = "http://localhost:3001/characters?";
    if (name) {
      url += `name=${name}&`;
    }
    if (skip) {
      url += `skip=${skip}&`;
    }
    if (limit) {
      url += `limit=${limit}&`;
    }
    try {
      const response = await axios.get(url);
      setCharactersData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="characters">
      <div className="container">
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
      </div>
    </div>
  );
};

export default Characters;

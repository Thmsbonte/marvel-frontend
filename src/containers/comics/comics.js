import "./comics.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import ComicCard from "../../components/comicCard/comicCard";
import IsLoading from "../../components/isLoading/isLoading";
import Pagging from "../../components/pagging/pagging";
import PaggingLimit from "../../components/paggingLimit/paggingLimit";
import ResponsiveMenu from "../../components/responsiveMenu/responsiveMenu";

const Comics = ({ search, responsiveMenu, setResponsiveMenu, setSearch }) => {
  // States initialization
  const [comicsData, setComicsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState("10");
  const [skip, setSkip] = useState("0");
  const pagging = Number(skip) + Number(limit);

  // Function : get comics data according to filters
  const fetchData = async (search, skip, limit) => {
    let url = "https://thmsbonte-marvel-backend.herokuapp.com/comics?";
    if (search) {
      url += `title=${search}&`;
    }
    if (skip) {
      url += `skip=${skip}&`;
    }
    if (limit) {
      url += `limit=${limit}&`;
    }
    try {
      const response = await axios.get(url);
      setComicsData(response.data.results); // Save comics data in a state
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Each time the search, skip or limit state change, new data request
  useEffect(() => {
    fetchData(search, skip, limit);
  }, [search, skip, limit]);

  return !responsiveMenu ? (
    <div className="comics">
      <div className="container">
        <div className="comics-hero">
          <h1>COMICS</h1>
          <div className="comics-paging">
            <Pagging
              skip={skip}
              limit={limit}
              pagging={pagging}
              setSkip={setSkip}
            />
          </div>
          <div className="comics-pagging-limit">
            <PaggingLimit setLimit={setLimit} />
          </div>
        </div>
        {isLoading ? (
          <IsLoading />
        ) : (
          <div className="comics-content">
            {comicsData.map((item) => {
              return (
                <div className="comic-card" key={item._id}>
                  <ComicCard comicData={item} />
                </div>
              );
            })}
          </div>
        )}
        <div className="comics-paging">
          <div className="comics-paging">
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
      setSearch={setSearch}
    />
  );
};

export default Comics;

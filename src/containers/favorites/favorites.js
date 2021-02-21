import "./favorites.scss";
import CharacterCard from "../../components/characterCard/characterCard";
import ComicCard from "../../components/comicCard/comicCard";

const Favorites = ({ search }) => {
  const favCharacters =
    JSON.parse(window.localStorage.getItem("favCharacters")) || [];
  const favComics = JSON.parse(window.localStorage.getItem("favComics")) || [];

  let regex = new RegExp(search, "i");

  return (
    <div className="favorites container">
      <h2>FAVORITES CHARACTERS</h2>
      <div className="favorites-content">
        {favCharacters.map((item) => {
          return (
            regex.test(item.name) && (
              <CharacterCard characterData={item} className="character-card" />
            )
          );
        })}
      </div>
      <h2>FAVORITES COMICS</h2>
      <div className="favorites-content">
        {favComics.map((item) => {
          return (
            regex.test(item.title) && (
              <ComicCard comicData={item} className="comic-card" />
            )
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;

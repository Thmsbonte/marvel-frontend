import "./favorites.scss";
import CharacterCard from "../../components/characterCard/characterCard";
import ComicCard from "../../components/comicCard/comicCard";
import ResponsiveMenu from "../../components/responsiveMenu/responsiveMenu";

const Favorites = ({
  search,
  responsiveMenu,
  setResponsiveMenu,
  setSearch,
}) => {
  // Get data stored in local storage
  const favCharacters =
    JSON.parse(window.localStorage.getItem("favCharacters")) || [];
  const favComics = JSON.parse(window.localStorage.getItem("favComics")) || [];

  let regex = new RegExp(search, "i");

  return !responsiveMenu ? (
    <div className="favorites container">
      <h2>FAVORITES CHARACTERS</h2>
      <a href="#favorites-comics">Go to favorites comics</a>
      <div className="favorites-content">
        {favCharacters.length > 0 ? (
          favCharacters.map((item) => {
            return (
              regex.test(item.name) && (
                <CharacterCard
                  characterData={item}
                  className="character-card"
                />
              )
            );
          })
        ) : (
          <p>
            You don't have any favorite character yet. To save one, click on the
            star on the top right corner of a character card.
          </p>
        )}
      </div>
      <h2 id="favorites-comics">FAVORITES COMICS</h2>
      <div className="favorites-content">
        {favComics.length > 0 ? (
          favComics.map((item) => {
            return (
              regex.test(item.title) && (
                <ComicCard comicData={item} className="comic-card" />
              )
            );
          })
        ) : (
          <p>
            You don't have any favorite comic yet. To save one, click on the
            star on the top right corner of a comic card.
          </p>
        )}
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

export default Favorites;

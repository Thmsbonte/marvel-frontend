import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import Characters from "./containers/characters/characters";
import Comics from "./containers/comics/comics";
import Character from "./containers/character/character";
import { library } from "@fortawesome/fontawesome-svg-core";
import Cookies from "js-cookie";
import {
  faSearch,
  faArrowLeft,
  faArrowRight,
  faStar,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Favorites from "./containers/favorites/favorites";
import Footer from "./components/footer/footer";
library.add(faSearch, faArrowLeft, faArrowRight, faStar, faTimes, faBars);

const App = () => {
  // State initialization
  const [search, setSearch] = useState("");
  const [userInfo, setUserInfo] = useState({
    token: "",
    user_id: "",
  });
  const [responsiveMenu, setResponsiveMenu] = useState(false);

  // Function : create/delete user's cookies
  const setUser = (token, user_id) => {
    if (token) {
      Cookies.set("userToken", token);
      Cookies.set("user_id", user_id);
      setUserInfo({ token: token, user_id: user_id });
    } else {
      Cookies.remove("userToken");
      Cookies.remove("username");
      setUserInfo("");
    }
  };

  // At the opening of the App, if a user token exist, update user's state information
  useEffect(() => {
    Cookies.get("userToken") &&
      setUserInfo({
        token: Cookies.get("userToken"),
        user_id: Cookies.get("user_id"),
      });
  }, []);

  return (
    <Router>
      <Header
        search={search}
        setSearch={setSearch}
        userInfo={userInfo}
        setUser={setUser}
        responsiveMenu={responsiveMenu}
        setResponsiveMenu={setResponsiveMenu}
      />
      <Switch>
        <Route path="/comics">
          <Comics
            search={search}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
          />
        </Route>
        <Route path="/favorites">
          <Favorites
            search={search}
            setSearch={setSearch}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
          />
        </Route>
        <Route path="/character/:character_id">
          <Character
            search={search}
            setSearch={setSearch}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
          />
        </Route>
        <Route path="/">
          <Characters
            search={search}
            responsiveMenu={responsiveMenu}
            setResponsiveMenu={setResponsiveMenu}
          />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;

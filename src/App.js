import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import Characters from "./containers/characters/characters";
import Comics from "./containers/comics/comics";
import Character from "./containers/character/character";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
library.add(faSearch, faArrowLeft, faArrowRight);

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header search={search} setSearch={setSearch} />
      <Switch>
        <Route path="/comics">
          <Comics search={search} />
        </Route>
        <Route path="/character/:character_id">
          <Character />
        </Route>
        <Route path="/">
          <Characters search={search} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

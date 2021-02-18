import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import Characters from "./containers/characters/characters";
import Comics from "./containers/comics/comics";
import Character from "./containers/character/character";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey, faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faSearch);

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/character/:character_id">
          <Character />
        </Route>
        <Route path="/">
          <Characters />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

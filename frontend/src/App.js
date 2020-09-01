import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Welcome from "./components/welcomepage";
import NavBar from "./components/navbar";
import BoxesList from "./components/boxeslist";
import AddBox from "./components/addbox";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/addbox" exact component={AddBox} />
          <Route path="/listboxes" exact component={BoxesList} />
          <Route path="*" exact>
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import Header from "./Header";
import { Switch, Route } from "react-router-dom"
import Deck from "../Home/Deck";


function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
        <Route exact path={"/"}>
          <Home />
        </Route>
        <Route path={"/decks"}>
          <Deck />
        </Route>
        <Route>
        <NotFound />
        </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;

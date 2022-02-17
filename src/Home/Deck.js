import React from "react";
import { Route, Switch } from "react-router-dom";
import NewDeck from "../CardDecks/NewDeck";
import CardDeck from "../CardDecks/CardDeck";
import NotFound from "../Layout/NotFound";

function Deck() {
  return (
    <Switch>
      <Route exact path="/decks/new">
        <NewDeck />
      </Route>
      <Route path="/decks/:deckId">
        <CardDeck />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Deck;
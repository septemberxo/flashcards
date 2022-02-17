import React, { useEffect, useState } from "react";
import Load from "../Common/Load";
import DeckItem from "./DeckItem";
import { listDecks } from "../utils/api";


function DeckList() {
  const [decks, setDecks] = useState(null);

  const deckList = decks
    ? decks.map((deck, index) => (
        <DeckItem key={index} deck={deck} setDecks={setDecks} />
      ))
    : [];

  useEffect(() => {
    const controller = new AbortController();

    listDecks(controller.signal)
      .then(setDecks)
      .catch(() => {});

    return () => controller.abort();
  }, []);

  if (decks && decks.length) return deckList;
  else
    return (
      <div className={"col-12"}>
        {decks ? (
          <h1 className="text-center">
            Looks like there are currently no decks.
          </h1>
        ) : (
          <Load container={false} />
        )}
      </div>
    );
}

export default DeckList;
import React from "react";
import { useHistory } from "react-router-dom";
import DeckList from "./DeckList";

function Home() {
  const history = useHistory();

  return (
    <React.Fragment>
      <div className={"row"}>
        <div className={"col-12"}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/decks/new")}
          >
            <span className="oi oi-plus" /> Create Deck
          </button>
        </div>
        <DeckList />
      </div>
    </React.Fragment>
  );
}

export default Home;
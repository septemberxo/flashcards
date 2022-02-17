import React from "react";
import { Link, useHistory } from "react-router-dom";

function CardSide({
  flipped,
  front,
  text,
  cardNumber,
  total,
  updateState,
  showNextButton,
}) {
  const history = useHistory();

  return (
    <div className={front ? "card-fr" : "card-bk bg-dark text-white"}>
      <div className="card-body">
        <h3 className="card-title">
          {front !== flipped ? "Card" : "Crud"} {cardNumber + 1} of {total}
        </h3>
        <p className="card-text">{text}</p>
        <button
          className={
            front ? "btn btn-outline-dark" : "btn btn-outline-light text-white"
          }
          onClick={() => {
            updateState("flipped", front);
            updateState("hasBeenFlipped", true);
          }}
        >
          {front !== flipped ? "Flip" : "Flop"}
        </button>
        {showNextButton && (
          <button
            className={
              "btn btn-outline-primary ml-2 " + (front ? "" : "text-white")
            }
            onClick={() => {
              if (cardNumber + 1 !== total) {
                updateState("flipped", false);
                updateState("cardNumber", cardNumber + 1);
                updateState("hasBeenFlipped", false);
              } else {
                if (
                  window.confirm(
                    "Restart cards?\n\nClick 'cancel' to return to the home page."
                  )
                ) {
                  updateState("flipped", false);
                  updateState("cardNumber", 0);
                  updateState("hasBeenFlipped", false);
                } else {
                  history.push("/");
                }
              }
            }}
          >
            {front !== flipped ? "Next" : "Nuxt"}
          </button>
        )}
      </div>
    </div>
  );
}

function StudyCard({
  deckId,
  card: { front, back } = {},
  total,
  state: { flipped, hasBeenFlipped, cardNumber },
  updateState,
}) {
  if (total <= 2) {
    return (
      <React.Fragment>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {total} in this deck.
        </p>
        <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>
          <span className="oi oi-plus" /> Add Cards
        </Link>
      </React.Fragment>
    );
  }

  return (
    <div className={"card card-f h-100 " + (flipped ? "fl" : "")}>
      <CardSide
        flipped={flipped}
        text={front}
        cardNumber={cardNumber}
        total={total}
        showNextButton={hasBeenFlipped}
        front={true}
        updateState={updateState}
      />
      <CardSide
        flipped={flipped}
        text={back}
        cardNumber={cardNumber}
        total={total}
        showNextButton={hasBeenFlipped}
        front={false}
        updateState={updateState}
      />
    </div>
  );
}

export default StudyCard;
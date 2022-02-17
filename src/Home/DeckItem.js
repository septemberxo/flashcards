import React from "react";
import DeleteButton from "../Common/DeleteButton";
import { Link } from "react-router-dom";


function DeckItem({ deck: { id, name, description, cards }, setDecks }) {
  return (
    <div className={"col-12 mt-4"}>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 style={{ display: "inline-block" }}>{name}</h5>
            <small className="text-muted float-right">
              {cards.length} cards
            </small>
          </div>
          <p className="card-text">{description}</p>
          <Link className="btn btn-secondary mr-2" to={`/decks/${id}`}>
            <span className="oi oi-eye" /> View
          </Link>
          <Link className="btn btn-primary mr-2" to={`/decks/${id}/study`}>
            <span className="oi oi-book" /> Study
          </Link>
          <Link className="btn btn-info" to={`/decks/${id}/edit`}>
            <span className="oi oi-list" /> Edit
          </Link>
          <DeleteButton
            id={id}
            onComplete={() =>
              setDecks((current) => {
                return current.filter((deck) => deck.id !== id);
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DeckItem;
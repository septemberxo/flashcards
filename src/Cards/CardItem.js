import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api/";

function CardItem({ card, setCards }) {
  const { url } = useRouteMatch();

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <p className="card-text">{card.front}</p>
          </div>
          <div className="col-6">
            <p className="card-text">{card.back}</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-right">
            <Link
              className="btn btn-secondary mr-2"
              to={`${url}/cards/${card.id}/edit`}
            >
              <span className="oi oi-pencil" /> Edit
            </Link>
            <button
              className="btn btn-danger text-center float-right"
              onClick={() => {
                if (
                  window.confirm(
                    "Delete this card?\n\nYou will not be able to recover it."
                  )
                ) {
                  deleteCard(card.id, null)
                    .then(() =>
                      setCards((cards) =>
                        cards.filter((check) => check.id !== card.id)
                      )
                    )
                    .catch((error) => {});
                }
              }}
            >
              <span className="oi oi-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
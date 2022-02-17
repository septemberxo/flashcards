import React from "react";
import { deleteDeck } from "../utils/api";

function DeleteButton({ id, onComplete }) {
  return (
    <button
      className="btn btn-danger text-center float-right"
      onClick={() => {
        if (
          window.confirm(
            "Delete this deck?\n\nYou will not be able to recover it."
          )
        ) {
          deleteDeck(id, null)
            .then(onComplete)
            .catch((error) => {
            
            });
        }
      }}
    >
      <span className="oi oi-trash" />
    </button>
  );
}

export default DeleteButton;
import React, { useState } from "react";
import { createCard } from "../utils/api";
import Load from "../Common/Load";
import Crumbs from "../Common/Crumbs";
import Form from "../Common/Form";


function NewCard({ deck }) {
  const [submitting, setSubmitting] = useState(false);

  if (!deck) return <Load container={true} />;

  const submitCard = (formData) => {
    setSubmitting(true);

    createCard(deck.id, formData, null)
      .then((card) => deck.cards.push(card))
      .then(() => setSubmitting(false))
      .catch((error) => {
      });
  };

  const content = !submitting ? (
    <Form
      inputs={[
        {
          inputType: "textarea",
          name: "front",
          formattedName: "Front",
          placeholder: "Front side of card",
          id: "front",
          defaultValue: "",
        },
        {
          inputType: "textarea",
          name: "back",
          formattedName: "Back",
          placeholder: "Back side of card",
          id: "back",
          defaultValue: "",
        },
      ]}
      submit={{ name: "Save", action: submitCard }}
      cancel={{ name: "Done", url: `/decks/${deck.id}` }}
    />
  ) : (
    <Load />
  );

  return (
    <React.Fragment>
      <div className={"row"}>
        <div className="col-12">
          <Crumbs
            includeHome={true}
            navigation={[
              { name: deck.name, url: `/decks/${deck.id}` },
              { name: "Add Card" },
            ]}
          />
        </div>
      </div>
      <div className={"row"}>
        <div className="col-12">
          <h3>{deck.name}: Add Card</h3>
        </div>
      </div>
      <div className={"row"}>
        <div className="col-12">{content}</div>
      </div>
    </React.Fragment>
  );
}

export default NewCard;
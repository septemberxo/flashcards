import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../Common/Form";
import Load from "../Common/Load";
import { createDeck } from "../utils/api";
import Crumbs from "../Common/Crumbs";


function NewDeck() {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);

  const submitDeck = (formData) => {
    setSubmitting(true);

    createDeck(formData, null)
      .then((deck) => history.push(`/decks/${deck.id}`))
      .then(setSubmitting(false))
      .catch(() => {});
  };

  const content = !submitting ? (
    <Form
      inputs={[
        {
          inputType: "text",
          name: "name",
          formattedName: "Name",
          placeholder: "Deck Name",
          id: "name",
          defaultValue: "",
        },
        {
          inputType: "textarea",
          name: "description",
          formattedName: "Description",
          placeholder: "Brief description of the deck",
          id: "description",
          defaultValue: "",
        },
      ]}
      submit={{ action: submitDeck }}
      cancel={{ url: "/" }}
    />
  ) : (
    <Load container={false} />
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <Crumbs
            includeHome={true}
            navigation={[{ name: "Create Deck" }]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h1>Create Deck</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">{content}</div>
      </div>
    </React.Fragment>
  );
}

export default NewDeck;
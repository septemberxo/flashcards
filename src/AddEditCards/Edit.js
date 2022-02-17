import React from "react";
import { useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";
import Form from "../Common/Form";
import Load from "../Common/Load";
import Crumbs from "../Common/Crumbs";


function Edit({ deck }) {
  const history = useHistory();

  const editDeck = (formData) => {
    updateDeck({ id: deck.id, ...formData })
      .then(() => {
        deck.name = formData.name;
        deck.description = formData.description;
        history.push(`/decks/${deck.id}`);
      })
      .catch(() => {});
  };

 
  return deck ? (
    <React.Fragment>
      <div className={"row"}>
        <div className="col-12">
          <Crumbs
            includeHome={true}
            navigation={[
              { name: deck.name, url: `/decks/${deck.id}` },
              { name: "Edit Deck" },
            ]}
          />
        </div>
      </div>
      <div className={"row"}>
        <div className={"col-12"}>
          <h3>Edit Deck</h3>
        </div>
      </div>
      <div className={"row"}>
        <div className={"col-12"}>
          <Form
            inputs={[
              {
                inputType: "text",
                name: "name",
                formattedName: "Name",
                placeholder: "Deck Name",
                id: "name",
                defaultValue: deck.name,
              },
              {
                inputType: "textarea",
                name: "description",
                formattedName: "Description",
                placeholder: "Brief description of the deck",
                id: "description",

                defaultValue: deck.description,
              },
            ]}

            //form submit return back to the deck screen 
            submit={{ action: editDeck }}
            cancel={{ url: `/decks/${deck.id}` }}
          />
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Load container={true} />
  );
}

export default Edit;
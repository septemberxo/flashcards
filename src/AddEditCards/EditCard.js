import React, { useEffect, useState } from "react";
import Crumbs from "../Common/Crumbs";
import Form from "../Common/Form";
import Load from "../Common/Load";
import { readCard, updateCard } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";


function EditCard({ deck }) {
  const history = useHistory();
  const { cardId } = useParams();
  const [card, setCard] = useState(
    deck ? deck.cards.find((placeHolderCard) => placeHolderCard.id === cardId) : {}
  );


  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    readCard(cardId, controller.signal)
      .then(setCard)
      .catch((error) => {});

    return () => controller.abort();
  }, [cardId]);

  if (!deck || !card) return <Load container={true} />;

  const submitCard = (formData) => {
    setSubmitting(true);

    updateCard({ id: cardId, deckId: deck.id, ...formData }, null)
      .then((placeHolderCard) => {
        const find = deck.cards.find((placeHolder) => placeHolder.id === placeHolderCard.id);

        if (find) {
          find.front = placeHolderCard.front;
          find.back = placeHolderCard.back;
        }

        return placeHolderCard;
      })
      .then(() => setSubmitting(false))
      .then(() => history.push(`/decks/${deck.id}`))
      .catch((error) => {
        console.log(error);
      });
  };

  const content = !submitting ? (
    <Form
      inputs={[
        {
          inputType: "textarea",
          id: "front",
          name: "front",
          formattedName: "Front",
          placeholder: "Front side of card",
          defaultValue: card.front,
        },
        {
          inputType: "textarea",
          id: "back",
          name: "back",
          formattedName: "Back",
          placeholder: "Back side of card",
          defaultValue: card.back,
        },
      ]}
      submit={{ action: submitCard }}
      cancel={{ url: `/decks/${deck.id}` }}
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
              { name: "Edit Card " + cardId },
            ]}
          />
        </div>
      </div>
      <div className={"row"}>
        <div className="col-12">
          <h3>Edit Card</h3>
        </div>
      </div>
      <div className={"row"}>
        <div className="col-12">{content}</div>
      </div>
    </React.Fragment>
  );
}

export default EditCard;
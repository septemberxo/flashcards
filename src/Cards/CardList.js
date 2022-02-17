import React from "react";
import CardItem from "../Cards/CardItem";

function CardList({ setCards, cards }) {
  const cardList = cards.map((card, index) => (
    <CardItem key={index} card={card} setCards={setCards} />
  ));

  return (
    <div className="row mt-4">
      <div className="col-12">
        <h3>Cards</h3>
      </div>
      <div className="col-12">{cardList}</div>
    </div>
  );
}

export default CardList;
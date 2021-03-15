import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./cards";
import ActionButton from "./actionButton";

const TrelloList = ({ title, cards, listID }) => {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={styles.container}
        >
          <h3>{title}</h3>
          {cards.map((card, index) => {
            return (
              <Card key={card.id} index={index} id={card.id} text={card.text} />
            );
          })}
          {provided.placeholder}
          <ActionButton listID={listID} />
        </div>
      )}
    </Droppable>
  );
};

const styles = {
  container: {
    backgroundColor: "#EBECF0",
    borderRadius: 3,
    width: 300,
    padding: 8,
    marginRight: 8,
    height: "100%",
  },
};

export default TrelloList;

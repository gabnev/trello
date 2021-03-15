import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

const Cards = ({ text, id, index }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {text}
              </Typography>
            </CardContent>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};

const styles = {
  cardContainer: {
    marginBottom: 8,
  },
};

export default Cards;

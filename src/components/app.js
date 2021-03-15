import React from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { sort } from "../actions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./list";
import ActionButton from "./actionButton";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flexdirection: row;
  marginright: 8;
`;

const App = ({ lists }) => {
  const dispatch = useDispatch();

  const renderList = () => {
    return lists.map((list, index) => {
      return (
        <List
          key={list.id}
          listID={list.id}
          title={list.title}
          cards={list.cards}
          index={index}
        />
      );
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            {renderList()}
            {provided.placeholder}
            <ActionButton list />
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => {
  return { lists: state.lists };
};

export default connect(mapStateToProps)(App);

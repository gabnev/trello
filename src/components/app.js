import React from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { sort } from "../actions";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./list";
import ActionButton from "./actionButton";

const App = ({ lists }) => {
  const dispatch = useDispatch();

  const renderList = () => {
    return lists.map((list) => {
      return (
        <List
          key={list.id}
          listID={list.id}
          title={list.title}
          cards={list.cards}
        />
      );
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    console.log("source Id:", source.droppableId);
    console.log("destination Id:", destination.droppableId);
    console.log("source Index:", source.index);
    console.log("destination Index:", destination.index);
    console.log("drag id:", draggableId);

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={styles.listsContainer}>
        {renderList()}
        <ActionButton list />
      </div>
    </DragDropContext>
  );
};

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 8,
  },
};

const mapStateToProps = (state) => {
  return { lists: state.lists };
};

export default connect(mapStateToProps)(App);

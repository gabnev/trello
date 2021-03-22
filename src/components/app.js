import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import { addList, addCard, sort, fetchLists } from "../actions";
import ActionButton from "./actionButton";

import List from "./list";
import Auth from "../components/googleAuth";

const ListContainer = styled.div`
  display: flex;
  flexdirection: row;
  marginright: 8;
  color: black;
`;

const App = ({ lists, auth }) => {
  console.log("lists in app", lists);

  // pre-loads the lists from servers, but affects the draggable
  useEffect(() => {
    // dispatch(fetchLists());
    // if (lists) {
    //   lists.map((user) => {
    //     if (user.id === auth.userId) {
    //       user.lists.map((list) => {
    //         dispatch(addList(list.title, auth.userId));
    //         list.cards.map((card) => {
    //           dispatch(addCard(list.id, card.text));
    //         });
    //       });
    //     }
    //   });
    // }

    async function loadData() {
      const response = await fetch("http://localhost:4001/lists");
      const data = await response.json();
      if (data) {
        data.map((user) => {
          if (user.id === auth.userId) {
            user.lists.map((list) => {
              dispatch(addList(list.title, auth.userId));
              list.cards.map((card) => {
                dispatch(addCard(list.id, card.text));
              });
            });
          }
        });
      }
    }
    loadData();
  }, [auth]);

  const dispatch = useDispatch();

  const renderList = () => {
    return lists.map((list, index) => {
      if (list.userId === auth.userId) {
        return (
          <List
            key={list.id}
            listID={list.id}
            title={list.title}
            cards={list.cards}
            index={index}
          />
        );
      }
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
      <div className="ui right aligned grid">
        <div className="sixteen wide column">
          <div className="ui segment">
            <Auth />
          </div>
        </div>
        <div className="row">
          <div className="sixteen wide column">
            {auth.isSignedIn ? (
              <Droppable
                droppableId="all-lists"
                direction="horizontal"
                type="list"
              >
                {(provided) => (
                  <ListContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {renderList()}
                    {provided.placeholder}
                    <ActionButton list />
                  </ListContainer>
                )}
              </Droppable>
            ) : (
              <>Please log in</>
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => {
  return { lists: state.lists, auth: state.auth };
};

export default connect(mapStateToProps)(App);

import { combineReducers } from "redux";
import { CONSTANTS } from "../actions";

// Setting both ids to 0 allows to pre-load cards from the BD, but breaks draggable. Having a hard coded initial state solved (for now)
let listID = 2;
let cardID = 3;

// const initialListState = [
//   {
//     userId: null,
//     title: "My first list",
//     id: "list-0",
//     cards: [
//       {
//         id: "card-0",
//         text: "My first card",
//       },
//       {
//         id: "card-1",
//         text: "My second card",
//       },
//     ],
//   },
// {
//   title: "Phase 2",
//   id: `list-${1}`,
//   cards: [
//     {
//       id: `card-${2}`,
//       text: "Some text 3",
//     },
//     {
//       id: `card-${3}`,
//       text: "Some text 4",
//     },
//   ],
// },
// ];

const initialAuthState = {
  isSignedIn: null,
  userId: null,
};

const listsReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        userId: action.payload.userId,
        title: action.payload.title,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      // console.log("new list after addList:", newList);
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      };
      cardID += 1;
      // console.log("new card after addCard:", newCard);

      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;

      const newState = [...state];

      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      //  in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where drag started
        const listStart = state.find((list) => droppableIdStart === list.id);

        // pull out the card from list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        // find the list where drag ended
        const listEnd = state.find((list) => droppableIdEnd === list.id);

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

    default:
      return state;
  }
};

const fetchListsReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_LISTS:
      return action.payload;
    default:
      return state;
  }
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case CONSTANTS.SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case CONSTANTS.SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};

export default combineReducers({
  lists: listsReducer,
  auth: authReducer,
  fetch: fetchListsReducer,
});

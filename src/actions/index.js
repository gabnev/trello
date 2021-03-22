// export * from "./listActions";
// export * from "./cardActions";
import jsonServer from "../apis/jsonServer";

export const CONSTANTS = {
  ADD_CARD: "ADD_CARD",
  ADD_LIST: "ADD_LIST",
  DRAG_HAPPENED: "DRAG_HAPPENED",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  FETCH_LISTS: "FETCH_LISTS",
};

export const fetchLists = () => {
  return async (dispatch) => {
    const response = await jsonServer.get("/lists");

    dispatch({ type: CONSTANTS.FETCH_LISTS, payload: response.data });
  };
};

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const addCard = (listID, text) => {
  // return async (dispatch) => {
  //   const response = await jsonServer.post("/lists", (listID, text));
  //   dispatch({ type: CONSTANTS.ADD_CARD, payload: { response } });
  // };

  // without async
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listID },
  };
};

export const addList = (title, userId) => {
  // return async (dispatch) => {
  //   const response = await jsonServer.post("/lists", (title, userId));
  //   dispatch({ type: CONSTANTS.ADD_LIST, payload: { response } });
  // };

  //  without async
  return {
    type: CONSTANTS.ADD_LIST,
    payload: { title, userId },
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  };
};

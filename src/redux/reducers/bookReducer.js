import allBooks from "../../fakeData/books.json";

const initialState = {
  readingList: [],
  discoverList: allBooks,
  finishedList: [],
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_READING_LIST": {
      const newState = {
        ...state,
        readingList: [...state.readingList, action.payload],
      };
      return newState;
    }
    case "REMOVE_FROM_READING_LIST": {
      const newState = {
        ...state,
        readingList: state.readingList.filter((b) => b.id !== action.payload.id),
      };
      return newState;
    }
    case "ADD_TO_FINISH_LIST": {
        const newState = {
          ...state,
          readingList: state.readingList.filter((b) => b.id !== action.payload.id),
          finishedList: [...state.finishedList, action.payload]
        };
        return newState;
      }
    default: {
      return state;
    }
  }
};

export default bookReducer;
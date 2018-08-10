import * as actionTypes from "../actions/actionTypes";

const initialState = {
  results: null
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SANITIZED_DATA_ACTION:
      return {
        ...state,
        results: action.payload
      };
    case actionTypes.CLEAR_ACTION:
      return {
        ...state,
        results: null,
        text: ""
      };
    case actionTypes.UPDATE_TEXT_ACTION:
      return {
        ...state,
        text: action.payload
      };
    default:
      return state;
  }
};

export default mainReducer;

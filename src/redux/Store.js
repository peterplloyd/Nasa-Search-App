import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { main } from "./reducers";

const rootReducer = combineReducers({
  main: main
});

let Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;

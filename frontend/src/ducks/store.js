import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import workspacesReducer from "./workspaces/reducer";
import languagesReducer from "./languages/reducer";

const Reducer = combineReducers({
    workspacesReducer,
    languagesReducer
});

const store = createStore(Reducer, applyMiddleware(logger, thunk));

export default store;

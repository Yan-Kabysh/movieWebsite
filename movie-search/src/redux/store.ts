// store.ts
import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from 'redux-saga/effects';
import { watcherMovies } from "./actionCreaters/moviesActionCreators";
import { watcherUser } from "./actionCreaters/userActionCreators";
import modalReducer from "./reducers/modalReducer";
import { moviesReducer } from "./reducers/moviesReducer";
import { uiReducer } from "./reducers/uiReducer";
import { userReducer } from "./reducers/userReducer";

const middleWare = createSagaMiddleware();
function* rootSaga(){
    yield all([
        watcherMovies(),
        watcherUser(),
    ])
}
const store = createStore(
    combineReducers({
        movies: moviesReducer,
        ui: uiReducer,
        user: userReducer,
        modal: modalReducer,
    }),{},
    applyMiddleware(middleWare)
);

middleWare.run(rootSaga);
export { store };

import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from 'redux-saga/effects';
import { watcherMovies } from "./actionCreaters/moviesActionCreators";
import { moviesReducer } from "./reducers/moviesReducer";
import { uiReducer } from "./reducers/uiReducer";


const middleWare = createSagaMiddleware()
function* rootSaga(){
    yield all([
        watcherMovies(),
    ])
}

const store =  createStore(
    combineReducers({
        movies: moviesReducer,
        ui: uiReducer,
    }),{},
    applyMiddleware(middleWare)
);

middleWare.run(rootSaga)
export { store }
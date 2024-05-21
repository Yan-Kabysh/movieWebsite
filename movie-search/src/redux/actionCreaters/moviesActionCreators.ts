import { LOAD_MOVIES, SET_MOVIES } from "../actionTypes/moviesActionTypes";
import { put, takeEvery } from "redux-saga/effects"
import { ILoadMovies, IMovieData, IMovieDataResponse } from "../../types";


const loadMovies = (movies: ILoadMovies) =>({
    type: LOAD_MOVIES,
    movies
})

const setMovies = (movies: IMovieData[]) =>({
    type: SET_MOVIES,
    movies
})




function* fetchLoadMovies(action: any){
    // console.log(action)
    const {limit, page} = action.movies
    const response: Response = yield fetch(`https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}&selectFields=`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'JMSSR28-GJA4VYC-JTRHZQR-S1MKV40',
            'accept': 'application/json'
        }
    });
    const data: IMovieDataResponse  = yield response.json();
    console.log(data)
    yield put(setMovies(data.docs))
}

function* watcherMovies(){
    yield takeEvery(LOAD_MOVIES, fetchLoadMovies)
}


export { watcherMovies, loadMovies }
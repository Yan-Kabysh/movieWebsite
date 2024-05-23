import { LOAD_MOVIES, SEARCH_MOVIES, SET_MOVIES } from "../actionTypes/moviesActionTypes";
import { put, takeEvery } from "redux-saga/effects"
import { ILoadMovies, IMovieData, IMovieDataResponse, ISearchData } from "../../types";


const loadMovies = (movies: ILoadMovies) =>({
    type: LOAD_MOVIES,
    movies
})

const setMovies = (movies: IMovieData[]) =>({
    type: SET_MOVIES,
    movies
})

const searchMovies = (info: ISearchData) =>({
    type: SEARCH_MOVIES,
    info
})


function* fetchSearchMovies(action: any){
    const {limit, page, search} = action.info
    const response: Response = yield fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=${limit}&query=${search}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'JMSSR28-GJA4VYC-JTRHZQR-S1MKV40',
            'accept': 'application/json'
        }
    });
    const data: IMovieDataResponse = yield response.json()
    yield put(setMovies(data.docs))

}
function* fetchLoadMovies(action: any) {
    console.log("то что нужно", action)
    const { limit, page, year, rating, votes } = action.movies;

    const baseUrl = 'https://api.kinopoisk.dev/v1.4/movie';

    // Функция для формирования URL с параметрами
    const buildUrl = (baseUrl: string, params: any) => {
        const url = new URL(baseUrl);
        for (const key in params) {
            if (params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        }
        return url.toString();
    };

    // Формируем параметры запроса
    const params: any = {
        page: page,
        limit: limit,
    };

    if (year) {
        params.year = year;
    }

    if (rating) {
        params['rating.imdb'] = rating;
    } 
    if (votes) {
        params['votes.imdb'] = votes;
    }

    // Формируем полный URL
    const url = buildUrl(baseUrl, params);
    console.log(url)

    try {
        const response: Response = yield fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'JMSSR28-GJA4VYC-JTRHZQR-S1MKV40',
                'accept': 'application/json'
            }
        });
        const data: IMovieDataResponse = yield response.json();
        console.log(data);
        yield put(setMovies(data.docs));
    } catch (error) {
        console.error('Error fetching movies:', error);
        // Обработка ошибок, например, диспетчеризация действия для установки ошибки в состояние
    }
}


function* watcherMovies(){
    yield takeEvery(LOAD_MOVIES, fetchLoadMovies)
    yield takeEvery(SEARCH_MOVIES, fetchSearchMovies)

}


export { watcherMovies, loadMovies, searchMovies }
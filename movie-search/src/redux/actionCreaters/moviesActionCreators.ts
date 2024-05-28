import { LOAD_MOVIES, LOAD_SELECTED_MOVIE, SEARCH_MOVIES, SET_MOVIES, SET_SELECTED_MOVIE } from "../actionTypes/moviesActionTypes";
import { put, takeEvery } from "redux-saga/effects"
import { ILoadMovies, IMovieData, IMovieDataResponse, ISearchData, ISelectedMovie } from "../../types";


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

const loadSelectedMovie = (id: number) => ({
    type: LOAD_SELECTED_MOVIE,
    id
})

const setSelectedMovie = (movie: ISelectedMovie) => ({
    type: SET_SELECTED_MOVIE,
    movie
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
    console.log(action)
    const { limit, page, year, rating, votes, sortField, sortType, genre, yearStateFrom, yearStateTo, ratingStateFrom, ratingStateTo, country } = action.movies;

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
    if (sortField) {
        params.sortField = sortField
    }
    if (sortType) {
        params.sortType = sortType
    }
    if (yearStateFrom && yearStateTo) {
        params.year = yearStateFrom + '-' + yearStateTo
    }
    else if (yearStateFrom) {
        params.year = yearStateFrom
    }
    else if (yearStateTo) {
        params.year = yearStateTo
    }
    if (ratingStateFrom && ratingStateTo) {
        params['rating.imdb'] = ratingStateFrom + '-' + ratingStateTo
    }
    else if (ratingStateFrom) {
        params['rating.imdb'] = ratingStateFrom
    }
    else if (ratingStateTo) {
        params['rating.imdb'] = ratingStateTo
    }

    // Формируем полный URL
    let url = buildUrl(baseUrl, params);
    if (genre) {
        const genreQueryString = genre.reduce((accumulator: string, current: { value: any; }) => {
            return accumulator + `genres.name=${current.value}&`;
        }, '');

        // Удалите лишний символ "&" в конце строки
        const finalGenreQueryString = genreQueryString.slice(0, -1);

        // Если URL уже содержит параметры, добавьте "&", иначе "?"
        url += (url.includes('?') ? '&' : '?') + finalGenreQueryString;
    }
    if (country) {
        const genreQueryString = country.reduce((accumulator: string, current: { value: any; }) => {
            return accumulator + `countries.name=${current.value}&`;
        }, '');

        // Удалите лишний символ "&" в конце строки
        const finalGenreQueryString = genreQueryString.slice(0, -1);

        // Если URL уже содержит параметры, добавьте "&", иначе "?"
        url += (url.includes('?') ? '&' : '?') + finalGenreQueryString;
    }

    try {
        const response: Response = yield fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': 'JMSSR28-GJA4VYC-JTRHZQR-S1MKV40',
                'accept': 'application/json'
            }
        });
        const data: IMovieDataResponse = yield response.json();
        yield put(setMovies(data.docs));
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}


function* fetchLoadSelectedMovie(action: any){
    const { id } = action
    const response: Response = yield fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, 
    {
        method: 'GET',
        headers: {
            'X-API-KEY': 'JMSSR28-GJA4VYC-JTRHZQR-S1MKV40',
            'accept': 'application/json'
        }
    });
    const data: ISelectedMovie = yield response.json()
    yield put(setSelectedMovie(data))
}


function* watcherMovies(){
    yield takeEvery(LOAD_MOVIES, fetchLoadMovies)
    yield takeEvery(SEARCH_MOVIES, fetchSearchMovies)
    yield takeEvery(LOAD_SELECTED_MOVIE, fetchLoadSelectedMovie)
}


export { watcherMovies, loadMovies, searchMovies, loadSelectedMovie, setSelectedMovie }
import { LOAD_MOVIES, LOAD_SELECTED_MOVIE, SEARCH_MOVIES, SET_MOVIES, SET_PAGE, SET_SELECTED_MOVIE, SET_TOTAL, SET_IS_SEARCH, FAVORITES_MOVIES } from "../actionTypes/moviesActionTypes";
import { put, takeEvery, select } from "redux-saga/effects";
import { ILoadMovies, IMovieData, IMovieDataResponse, ISearchData, ISelectedMovie } from "../../types";

const loadMovies = (movies: ILoadMovies) => ({
    type: LOAD_MOVIES,
    movies
});

const setMovies = (movies: IMovieData[]) => ({
    type: SET_MOVIES,
    movies
});

const searchMovies = (info: ISearchData) => ({
    type: SEARCH_MOVIES,
    info
});

const loadSelectedMovie = (id: number) => ({
    type: LOAD_SELECTED_MOVIE,
    id
});

const setSelectedMovie = (movie: ISelectedMovie) => ({
    type: SET_SELECTED_MOVIE,
    movie
});

const setTotal = (total: number, pages: number) => ({
    type: SET_TOTAL,
    total,
    pages
});

const setPage = (page: number) => ({
    type: SET_PAGE,
    page
});

const setIsSearch = (isSearch: boolean) => ({
    type: SET_IS_SEARCH,
    isSearch
});

const favoritesMovies = (ids: number[]) => ({
    type: FAVORITES_MOVIES,
    ids
})

function* fetchFavoritesMovies(action: any) {
    const { ids } = action;
    const page = 1;
    const limit = 250;
    const idParams = ids.map((id: string) => `id=${id}`).join('&');
    if(idParams){

    
    const url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}&${idParams}`;
    
    const response: Response = yield fetch(url, {
        method: 'GET',
        headers: {
            //2VY0P72-C2QMW2W-PRA1W5W-SRSY3CV
            // JMSSR28-GJA4VYC-JTRHZQR-S1MKV40
            'X-API-KEY': 'JMSSR28-GJA4VYC-JTRHZQR-S1MKV40',
            'accept': 'application/json'
        }
    });

    if (response.ok) {
        const data: IMovieDataResponse = yield response.json();
        yield put(setMovies(data.docs));
        yield put(setTotal(data.total, data.pages));
        // yield put(setIsSearch(false));
    } else {
        console.error('Failed to fetch favorite movies', response.statusText);
        // Обработка ошибки: возможно, стоит уведомить пользователя или предпринять иные действия
    }
}
    else{
        yield put(setMovies([]));

    }
}


function* fetchSearchMovies(action: any) {
    yield put(setIsSearch(true));

    const { limit, page, search } = action.info;
    const response: Response = yield fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=${limit}&query=${search}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'JMSSR28-GJA4VYC-JTRHZQR-S1MKV40',
            'accept': 'application/json'
        }
    });
    const data: IMovieDataResponse = yield response.json();
    yield put(setMovies(data.docs));
    yield put(setTotal(data.total, data.pages));
    yield put(setIsSearch(false));
}

function* fetchLoadMovies(action: any) {
    const isSearch: boolean = yield select((state: any) => state.movies.isSearch);
    if (isSearch) return;

    const { limit, page, year, rating, votes, sortField, sortType, genre, yearStateFrom, yearStateTo, ratingStateFrom, ratingStateTo, country } = action.movies;
    const baseUrl = 'https://api.kinopoisk.dev/v1.4/movie';

    const buildUrl = (baseUrl: string, params: any) => {
        const url = new URL(baseUrl);
        for (const key in params) {
            if (params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        }
        return url.toString();
    };

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
        params.sortField = sortField;
    }
    if (sortType) {
        params.sortType = sortType;
    }
    if (yearStateFrom && yearStateTo) {
        params.year = `${yearStateFrom}-${yearStateTo}`;
    } else if (yearStateFrom) {
        params.year = yearStateFrom;
    } else if (yearStateTo) {
        params.year = yearStateTo;
    }
    if (ratingStateFrom && ratingStateTo) {
        params['rating.imdb'] = `${ratingStateFrom}-${ratingStateTo}`;
    } else if (ratingStateFrom) {
        params['rating.imdb'] = `${ratingStateFrom}-10`;
    } else if (ratingStateTo) {
        params['rating.imdb'] = `0-${ratingStateTo}`;
    }

    let url = buildUrl(baseUrl, params);
    if (genre) {
        const genreQueryString = genre.reduce((accumulator: string, current: { value: any; }) => {
            return accumulator + `genres.name=${current.value}&`;
        }, '');

        const finalGenreQueryString = genreQueryString.slice(0, -1);
        url += (url.includes('?') ? '&' : '?') + finalGenreQueryString;
    }
    if (country) {
        const countryQueryString = country.reduce((accumulator: string, current: { value: any; }) => {
            return accumulator + `countries.name=${current.value}&`;
        }, '');

        const finalCountryQueryString = countryQueryString.slice(0, -1);
        url += (url.includes('?') ? '&' : '?') + finalCountryQueryString;
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
        yield put(setTotal(data.total, data.pages));
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function* fetchLoadSelectedMovie(action: any) {
    const { id } = action;
    const response: Response = yield fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'JMSSR28-GJA4VYC-JTRHZQR-S1MKV40',
            'accept': 'application/json'
        }
    });
    const data: ISelectedMovie = yield response.json();
    yield put(setSelectedMovie(data));
}

function* watcherMovies() {
    yield takeEvery(LOAD_MOVIES, fetchLoadMovies);
    yield takeEvery(SEARCH_MOVIES, fetchSearchMovies);
    yield takeEvery(LOAD_SELECTED_MOVIE, fetchLoadSelectedMovie);
    yield takeEvery(FAVORITES_MOVIES, fetchFavoritesMovies);

}

export { watcherMovies, loadMovies, searchMovies, loadSelectedMovie, setSelectedMovie, setPage, setIsSearch, favoritesMovies };

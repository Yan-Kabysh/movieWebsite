import { IMovieData, IMovieDataResponse, ISelectedMovie } from "../../types";
import { SET_MOVIES, SET_PAGE, SET_SELECTED_MOVIE, SET_TOTAL, SET_IS_SEARCH, IS_FAVORITE } from "../actionTypes/moviesActionTypes";

const initialState: IMovieDataResponse = {
    docs: [] as IMovieData[],
    total: 0,
    limit: 20,
    page: 1,
    pages: 1,
    isSearch: false,
    isFavorite: false
};

const moviesReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case SET_PAGE: {
            return {
                ...state,
                page: action.page
            };
        }
        case SET_TOTAL: {
            return {
                ...state,
                total: action.total,
                pages: action.pages
            };
        }
        case SET_MOVIES: {
            return {
                ...state,
                docs: action.movies
            };
        }
        case SET_SELECTED_MOVIE: {
            return {
                ...state,
                movie: action.movie
            };
        }
        case SET_IS_SEARCH: {
            return {
                ...state,
                isSearch: action.isSearch
            };
        }
        case IS_FAVORITE: {
            return {
                ...state,
                isFavorite: action.isFavorite
            };
        }
        default: {
            return state;
        }
    }
};

export { moviesReducer };

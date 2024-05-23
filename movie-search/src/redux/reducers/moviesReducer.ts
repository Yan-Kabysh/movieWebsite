import { IMovieData, IMovieDataResponse } from "../../types";
import { SET_MOVIES } from "../actionTypes/moviesActionTypes";

const initialState: IMovieDataResponse = {
    "docs": [] as IMovieData[],
    "total": 10,
    "limit": 10,
    "page": 1,
    "pages": 1
  };

const moviesReducer = (state = initialState, action: any) =>{
    switch(action.type){
        case SET_MOVIES:{
            return({
                ...state,
                docs: action.movies
            })
        }
        default:{
            return state
        }
    }
}

export { moviesReducer }
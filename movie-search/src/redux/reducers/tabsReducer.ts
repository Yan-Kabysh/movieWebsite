import { IMovieData, IMovieDataResponse, ITansReducer, TABS } from "../../types";
import { SEARCH_MOVIES, SET_MOVIES } from "../actionTypes/moviesActionTypes";

const initialState: ITansReducer = {
    tab: TABS.HOME
  };

const moviesReducer = (state = initialState, action: any) =>{
    switch(action.type){
        case SEARCH_MOVIES:{
            return({
                ...state,
                tab: action.tab
            })
        }
        default:{
            return state
        }
    }
}

export { moviesReducer }
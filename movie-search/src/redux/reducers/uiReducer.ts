import { IUIState, THEME_TYPES } from "../../types";
import { SET_FILTERS_STATE, SET_THEME } from "../actionTypes/uiActionTypes";

const initialState = {
    theme: THEME_TYPES.LIGHT,
    filtersState: false
};

const uiReducer =  (state: IUIState = initialState, action: any) => {
    
    switch (action.type){
        case SET_THEME:{
            return({
                ...state,
                theme: action.theme
            })
        }
        case SET_FILTERS_STATE:{
            return({
                ...state,
                filtersState: action.state
            })
        }
        default: {
            return state
        }
    }
}

export { uiReducer }
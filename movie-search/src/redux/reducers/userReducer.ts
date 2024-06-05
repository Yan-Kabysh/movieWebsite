import { convertCompilerOptionsFromJson } from "typescript";
import { IUserState } from "../../types";
import { LOADING_SAVED_MOVIES, SET_USER, SIGN_OUT } from "../actionTypes/userActionTypes";



const initialState: IUserState = {
    user: {
        id: 0,
        username: "",
        email: ""
    },
    isLoadingSavedMovies: false,
};



const userReducer = (state: IUserState = initialState, action: any) => {
    switch(action.type) {
        case SET_USER: {
           
                return {
                    ...state,
                    user: action.user.user
                };
            }
        case SIGN_OUT:{
            return{
                ...state,
                user: null
            }
        }
        case LOADING_SAVED_MOVIES:{
            return{
                ...state,
                isLoadingSavedMovies: !state.isLoadingSavedMovies
            }
        }
        default: {
            return state;
        }
    }
};

export { userReducer };

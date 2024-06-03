import { convertCompilerOptionsFromJson } from "typescript";
import { IUserState } from "../../types";
import { SET_USER, SIGN_OUT } from "../actionTypes/userActionTypes";



const initialState: IUserState = {
    user: {
        id: 0,
        username: "",
        email: ""
    } 
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
        default: {
            return state;
        }
    }
};

export { userReducer };

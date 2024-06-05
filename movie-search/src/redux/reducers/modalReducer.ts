import { IModalState, IStoreState } from "../../types";
import { HIDE_MODAL, SHOW_MODAL } from "../actionTypes/modalActionTypes";

const initialState = {
    modal: {
        isOpen: false,
        message: "",
        status: ""
    }
};

const modalReducer = (state: IModalState = initialState, action: any) => {
    switch (action.type) {
        case SHOW_MODAL:
            console.log(action)
            return {
                ...state,
                modal: {
                    isOpen: true,
                    message: action.payload.message,
                    status: action.payload.status
                }
            };
        case HIDE_MODAL:
            return {
                ...state,
                modal: {
                    isOpen: false,
                    message: "",
                    status: ""
                }
            };
        default:
            return state;
    }
};

export default modalReducer;
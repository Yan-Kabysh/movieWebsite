import { THEME_TYPES } from "../../types";
import { SET_FILTERS_STATE, SET_THEME } from "../actionTypes/uiActionTypes";

const setTheme = (theme: THEME_TYPES) => ({
    type: SET_THEME,
    theme
})

const setFiltersState = (state: boolean) =>({
    type: SET_FILTERS_STATE,
    state
})

export { setTheme, setFiltersState }
import { TABS } from "../../types";
import { SET_ACTIVE_TAB } from "../actionTypes/tabsActionTypes";

const setActiveTab = (tab: TABS) =>({
    type: SET_ACTIVE_TAB,
    tab
})

export { setActiveTab }
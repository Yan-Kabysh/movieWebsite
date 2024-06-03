import { useSelector } from "react-redux"
import { IStoreState, THEME_TYPES } from "../../types"
import "./ThemeSwitcher.css"

const ThemeSwitcher = ({onClick}: any) => {

    const theme = useSelector((state: IStoreState) => state.ui.theme)

    console.log(theme)
    return(
        <div className="container">
            <input  checked = {theme == THEME_TYPES.DARK} className="inputToggle" type="checkbox" id="check"  onClick={onClick} />
            <label htmlFor="check" className="themeToggle"></label>
        </div>
    )
}

export { ThemeSwitcher }

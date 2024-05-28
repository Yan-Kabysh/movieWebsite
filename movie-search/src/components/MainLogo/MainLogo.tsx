import { useSelector } from "react-redux"
import { IStoreState } from "../../types"
import "./MainLogo.css"

const MainLogo = () =>{

    const theme = useSelector((state: IStoreState) => state.ui.theme)
    return(
        <div className={"mainLogo "  + theme}>
            <span className="logo-movie">MOVIE</span>
            <span className={"logo-search "  + theme}>SEARCH</span>
        </div>
    )
}

export { MainLogo }
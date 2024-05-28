import { useSelector } from "react-redux"
import { IStoreState } from "../../types"
import { Header } from "../Header"
import { Menu } from "../Menu"


const FavoritesPage = () =>{
    const theme = useSelector((state: IStoreState) => state.ui.theme)

    return(
        <div className={"MainPage " + theme}>
            <Header/>
            <div className="MainPageContent">
                <Menu/>
            </div>
        </div>
    )
}

export { FavoritesPage }
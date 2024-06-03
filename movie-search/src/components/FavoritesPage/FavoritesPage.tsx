import { useSelector } from "react-redux"
import { IStoreState } from "../../types"
import { Header } from "../Header"
import { EmptyFavorites } from "../Icons"
import { Menu } from "../Menu"
import "./FavoritesPage.css"

const FavoritesPage = () =>{
    const theme = useSelector((state: IStoreState) => state.ui.theme)

    return(
        <div className={"MainPage " + theme}>
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                <div className="emptyFavorites">
                    <EmptyFavorites/>
                    <span className="emptyFavoritesText">The list of favorite movies is empty</span>
                </div>
            </div>
        </div>
    )
}

export { FavoritesPage }
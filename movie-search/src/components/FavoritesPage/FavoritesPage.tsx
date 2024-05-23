import { Header } from "../Header"
import { Menu } from "../Menu"

const FavoritesPage = () =>{
    return(
        <div className="MainPage">
            <Header/>
            <div className="MainPageContent">
                <Menu/>
            </div>
        </div>
    )
}

export { FavoritesPage }
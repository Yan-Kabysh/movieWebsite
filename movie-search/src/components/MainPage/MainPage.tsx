import { useSelector } from "react-redux"
import { IStoreState } from "../../types"
import { Header } from "../Header"
import { Menu } from "../Menu"
import { Movies } from "../Movies"
import { Pagination, PaginationComponent } from "../Pagination"
import "./MainPage.css"


const MainPage = () =>{

    const theme = useSelector((state: IStoreState) => state.ui.theme)
    const {limit, page} = useSelector((state: IStoreState) => state.movies)

    return(
        <div className={"MainPage " + theme}>
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                <Movies limit={limit} page={page}/>
            </div>
            <PaginationComponent/>
        </div>
    )
}

export { MainPage }
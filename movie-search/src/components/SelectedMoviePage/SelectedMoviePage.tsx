import { useSelector } from "react-redux"
import { IStoreState } from "../../types"
import { Header } from "../Header"
import { Menu } from "../Menu"
import { SelectedMovie } from "../SelectedMovie/SelectedMovie"

const SelectedMoviePage = () =>{

    const theme = useSelector((state: IStoreState) => state.ui.theme)


    return(
        <div className={"MainPage " + theme}>
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                <SelectedMovie/>
            </div>
        </div>
    )
}

export { SelectedMoviePage }
import { useSelector } from "react-redux"
import { IStoreState } from "../../types"
import { Header } from "../Header"
import { Menu } from "../Menu"
import { Movies } from "../Movies"


const TrendsPage = () =>{
    const theme = useSelector((state: IStoreState) => state.ui.theme)

    return(
        <div className={"MainPage " + theme}>
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                <Movies year={2024} rating="7-10" votes="10000-666666"/>
            </div>
        </div>
    )
}

export  {TrendsPage}
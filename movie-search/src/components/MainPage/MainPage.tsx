import { useSelector } from "react-redux"
import { IStoreState } from "../../types"
import { Header } from "../Header"
import { Menu } from "../Menu"
import { Movies } from "../Movies"
import "./MainPage.css"


const MainPage = () =>{

    const theme = useSelector((state: IStoreState) => state.ui.theme)

    return(
        <div className={"MainPage " + theme}>
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                <Movies limit={100} page={1}/>
            </div>
        </div>
    )
}

export { MainPage }
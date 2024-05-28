import { useSelector } from "react-redux"
import { IStoreState } from "../../types"
import { Header } from "../Header"
import { Menu } from "../Menu"
import { SettingsComponent } from "../SettingsComponent"


const SettingsPage = () =>{
    const theme = useSelector((state: IStoreState) => state.ui.theme)

    return(
        <div className={"MainPage " + theme}>
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                <SettingsComponent/>
            </div>
        </div>
    )
}

export  {SettingsPage}
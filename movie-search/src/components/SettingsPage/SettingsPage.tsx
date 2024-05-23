import { Header } from "../Header"
import { Menu } from "../Menu"

const SettingsPage = () =>{
    return(
        <div className="MainPage">
            <Header/>
            <div className="MainPageContent">
                <Menu/>
            </div>
        </div>
    )
}

export  {SettingsPage}
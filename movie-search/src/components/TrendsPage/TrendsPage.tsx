import { Header } from "../Header"
import { Menu } from "../Menu"
import { Movies } from "../Movies"

const TrendsPage = () =>{
    return(
        <div className="MainPage">
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                <Movies year={2024} rating="7-10" votes="10000-666666"/>
            </div>
        </div>
    )
}

export  {TrendsPage}
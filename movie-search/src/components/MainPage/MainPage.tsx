import { Header } from "../Header"
import { Menu } from "../Menu"
import { Movies } from "../Movies"
import "./MainPage.css"

const MainPage = () =>{
    return(
        <div className="MainPage">
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                <Movies limit={100} page={1}/>
            </div>
        </div>
    )
}

export { MainPage }
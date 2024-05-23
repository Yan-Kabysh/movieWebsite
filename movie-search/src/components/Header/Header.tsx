import { UserName } from "../Users"
import { MainLogo } from "../MainLogo"
import { SearchInput } from "../SearchInput"
import "./Header.css"

const Header = () => {
    return(
        <div className="header">
            <MainLogo/>
            <SearchInput/>
            <UserName>yanKabysh</UserName>
        </div>
    )
}

export  {Header} 
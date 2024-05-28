import { UserName } from "../Users"
import { MainLogo } from "../MainLogo"
import { SearchInput } from "../SearchInput"
import "./Header.css"
import { useSelector } from "react-redux"
import { IStoreState } from "../../types"

const Header = () => {
    const theme = useSelector((state: IStoreState) => state.ui.theme)
    return(
        <div className={"header " + theme}>
            <MainLogo/>
            <SearchInput/>
            <UserName>yanKabysh</UserName>
        </div>
    )
}

export  {Header} 
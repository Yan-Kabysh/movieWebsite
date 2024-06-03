// components/Header.tsx
import { UserName } from "../Users";
import { MainLogo } from "../MainLogo";
import { SearchInput } from "../SearchInput";
import "./Header.css";
import { useSelector } from "react-redux";
import { IStoreState } from "../../types";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const Header = () => {
    const theme = useSelector((state: IStoreState) => state.ui.theme);
    const user = useSelector((state: IStoreState) => state.user.user);

    console.log("User from state:", user);

    return (
        <div className={"header " + theme}>
            <NavLink to="/movies/home">
                <MainLogo />
            </NavLink>
            <SearchInput />
            <UserName>{user.username}</UserName>
        </div>
    );
}

export { Header };

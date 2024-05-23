import { NavLink } from "react-router-dom";
import { FavoritesIcon, HomeIcon, SettingIcon, TrendsIcon } from "../Icons";
import "./Menu.css";

const Menu = () => {
    return (
        <div className="menuBlock">
            <NavLink to="/movies/home" end className={({ isActive }) => isActive ? "menuItem activeLink" : "menuItem"}>
                <HomeIcon/>
                <span className="itemmenuText">Home</span>
            </NavLink>
            <NavLink to="/movies/trends" className={({ isActive }) => isActive ? "menuItem activeLink" : "menuItem"}>
                <TrendsIcon/>
                <span className="itemmenuText">Trends</span>
            </NavLink>
            <NavLink to="/movies/favorites" className={({ isActive }) => isActive ? "menuItem activeLink" : "menuItem"}>
                <FavoritesIcon/>
                <span className="itemmenuText">Favorites</span>
            </NavLink>
            <NavLink to="/movies/settings" className={({ isActive }) => isActive ? "menuItem activeLink" : "menuItem"}>
                <SettingIcon/>
                <span className="itemmenuText">Settings</span>
            </NavLink>
        </div>
    );
};

export { Menu };

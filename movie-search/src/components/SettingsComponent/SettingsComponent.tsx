import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../redux/actionCreaters/uiActionCreaters"
import { changePassword, changeUserData, signout } from "../../redux/actionCreaters/userActionCreators"
import { uiReducer } from "../../redux/reducers/uiReducer"
import { IStoreState, THEME_TYPES } from "../../types"
import { ThemeSwitcher } from "../ThemeSwitcher"
import "./SettingsComponent.css"

const SettingsComponent = () =>{

    const user = useSelector((state: IStoreState) => state.user.user)
    useEffect(() => {
        const formattedUsername = user.username.replace(/([A-Z])/g, ' $1').trim();
        const capitalizedUsername = formattedUsername.charAt(0).toUpperCase() + formattedUsername.slice(1);
        setName(capitalizedUsername);
        setEmail(user.email);
    }, [user]);
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")


    console.log(name)
    console.log(email)

    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()

    const theme = useSelector((state: IStoreState) => state.ui.theme)
  

    const handleSetTheme = (theme: THEME_TYPES) =>{
        dispatch(setTheme(theme))
        localStorage.setItem("theme", theme);
    }

    function formatUsername(name: string) {
        // Убираем пробелы и делаем первую букву прописной
        return name.replace(/\s+/g, '').replace(/^\w/, c => c.toLowerCase());
    }

    const saveDataClick =() =>{
        dispatch(changeUserData({id: user.id, username: formatUsername(name), email}))
    }

    const changePasswordClick =() =>{
        if(newPassword === confirmPassword)
        dispatch(changePassword({id: user.id, currentPassword: password, newPassword}))
    }


    return(
        <div className={"settings-content " + theme}>
            <div className="settings-container-big">
                <h2 className="settings-h2">Profile</h2>
                <div className="settings-input-container">
                    <div className="settings-input-container-small">
                        <h3 className="settings-h3">Name</h3>
                        <input className="settings-input" onChange={(e: any)=>{setName(e.target.value)}} placeholder="Your name" value={name}/>
                    </div> 
                    <div>
                        <h3 className="settings-h3">Email</h3>
                        <input className="settings-input" onChange={(e: any)=>{setEmail(e.target.value)}} placeholder="Your email" value={email}/>
                    </div>
                </div>
                    <button className="settings-save-btm" onClick={saveDataClick}>Save</button>
            </div>
            <div className="settings-container-big">
                <h2 className="settings-h2">Password</h2>
                <div className="settings-input-grid-container">
                    <div className="settings-input-grid-container-item">
                        <h3 className="settings-h3">Password</h3>
                        <input className="settings-input" onChange={(e: any)=>{setPassword(e.target.value)}} placeholder="Your password" value={password}/>
                    </div> 
                    <div  className="settings-input-grid-container-item">
                        <h3 className="settings-h3">New password</h3>
                        <input className="settings-input" onChange={(e: any)=>{setNewPassword(e.target.value)}} placeholder="New password" value={newPassword}/>
                    </div>
                    <div  className="settings-input-grid-container-item">
                        <h3 className="settings-h3">Confirm password</h3>
                        <input className="settings-input" onChange={(e: any)=>{setConfirmPassword(e.target.value)}} placeholder="Confirm password" value={confirmPassword}/>
                    </div>
                </div>
                <button className="settings-save-btm" onClick={changePasswordClick}>Save</button>

            </div>
            <div className="settings-container-big">
                <h2 className="settings-h2">Color mode</h2>
                <div  className="settings-input-container-theme">
                    <div>
                        <h3 className="settings-h3">Dark</h3>
                        <span className="settings-span">Use dark theme</span>
                    </div>
                    <ThemeSwitcher onClick={() => {
                        theme === THEME_TYPES.LIGHT ? handleSetTheme(THEME_TYPES.DARK) : handleSetTheme(THEME_TYPES.LIGHT)
                       
                        }}/>
                </div>
            </div>
            <button className="settings-save-btm" style={{marginBottom: "20px"}} onClick={() => {
                localStorage.removeItem("user")
                dispatch(signout())
                window.location.pathname = "/signin"
            }}>Sign out</button>

        </div>
    )
}

export { SettingsComponent }
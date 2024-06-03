import { NavLink } from "react-router-dom"
import { MainLogo } from "../MainLogo"
import "./ResetPassword.css"
const ResetPassword = () => {
    return(
        <div className="signIn">
             <div className={"mainLogo"} style={{padding: "24px 0 150px 0"}}>
                <span className="logo-movie">MOVIE</span>
                <span className={"logo-search"} style={{color: "white"}}>SEARCH</span>
            </div>
            <div className="signInBlock">
                <h1  className="settings-h2" style={{color: "white"}}>Reset password</h1>
                <span className="settings-span" style={{color: "white"}}>You will receive an email example@gmail.com with a link to reset your password!</span>
                <div>
                    <h3 className="settings-h3"  style={{color: "white"}}>Email</h3>
                    <input type="text" className="settings-input" style={{width: "96%", backgroundColor: "#323537", border: "none", color: "white"}} placeholder="Your email"/>
                </div>
               
                <button className="settings-save-btm" style={{margin: "30px 0 0 0", width: "100%"}}>Reset</button>

            </div>
        </div>
    )
}

export { ResetPassword }
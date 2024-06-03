import { NavLink } from "react-router-dom"
import { MainLogo } from "../MainLogo"
const NewPassword = () => {
    return(
        <div className="signIn">
              <div className={"mainLogo"} style={{padding: "24px 0 120px 0"}}>
                <span className="logo-movie">MOVIE</span>
                <span className={"logo-search"} style={{color: "white"}}>SEARCH</span>
            </div>
            <div className="signInBlock">
                <h1  className="settings-h2" style={{color: "white", margin: "0"}}>New password</h1>
                <div>
                    <h3 className="settings-h3"  style={{color: "white"}}>Password</h3>
                    <input type="password" className="settings-input" style={{width: "96%", backgroundColor: "#323537", border: "none", color: "white"}} placeholder="Your password"/>
                </div>
                <div>
                    <h3 className="settings-h3"  style={{color: "white"}}>Confirm password</h3>
                    <input type="password" className="settings-input" style={{width: "96%", backgroundColor: "#323537", border: "none", color: "white"}} placeholder="Confirm password"/>
                </div>
                <button className="settings-save-btm" style={{margin: "10px 0 0 0", width: "100%"}}>Set password</button>
            </div>
        </div>
    )
}

export { NewPassword }
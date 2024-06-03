import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"
import { signUpUser } from "../../redux/actionCreaters/userActionCreators";
import { IStoreState } from "../../types";
import { MainLogo } from "../MainLogo"
import "./SignUp.css"
const SignUp = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function formatUsername(name: string) {
        // Убираем пробелы и делаем первую букву прописной
        return name.replace(/\s+/g, '').replace(/^\w/, c => c.toLowerCase());
    }
    

    return(
        <div className="signIn">
              <div className={"mainLogo"} style={{paddingTop: "24px"}}>
                <span className="logo-movie">MOVIE</span>
                <span className={"logo-search"} style={{color: "white"}}>SEARCH</span>
            </div>
            <div className="signInBlock">
                <h1  className="settings-h2" style={{color: "white", margin: "0"}}>Sign Up</h1>
                <div>
                    <h3 className="settings-h3"  style={{color: "white"}}>Name</h3>
                    <input type="text" value={name} onChange={(e: any) => setName(e.target.value)} className="settings-input" style={{width: "96%", backgroundColor: "#323537", border: "none", color: "white"}} placeholder="Your name"/>
                </div>
                <div>
                    <h3 className="settings-h3"  style={{color: "white"}}>Email</h3>
                    <input type="text" value={email} onChange={(e: any) => setEmail(e.target.value)} className="settings-input" style={{width: "96%", backgroundColor: "#323537", border: "none", color: "white"}} placeholder="Your email"/>
                </div>
                <div>
                    <h3 className="settings-h3"  style={{color: "white"}}>Password</h3>
                    <input type="password"  value={password} onChange={(e: any) => setPassword(e.target.value)} className="settings-input" style={{width: "96%", backgroundColor: "#323537", border: "none", color: "white"}} placeholder="Your password"/>
                </div>
                <div>
                    <h3 className="settings-h3"  style={{color: "white"}}>Confirm password</h3>
                    <input type="password" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} className="settings-input" style={{width: "96%", backgroundColor: "#323537", border: "none", color: "white"}} placeholder="Confirm password"/>
                </div>
                <button className="settings-save-btm" style={{margin: "0", width: "100%"}}
                onClick={() => {
                    
                    dispatch(signUpUser({username: formatUsername(name), email, password}, navigate))
                }}
                >Sign up</button>
                <span  className="signIn-span signup-span">Already have an account? 
                {<NavLink to = "/signin" className="signUp-link"> Sign In</NavLink>}
                </span>
            </div>
        </div>
    )
}

export { SignUp }
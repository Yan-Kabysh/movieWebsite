import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signInUser } from "../../redux/actionCreaters/userActionCreators";
import { IStoreState } from "../../types";
import "./SignIn.css";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
      email: '',
      password: '',
    });

    const handler = (key: string, value: string) => {
      setFormState(prev => ({
          ...prev,
          [key]: value
      }));
    }

    const handleSignIn = () => {
      dispatch(signInUser( formState, navigate ));
    }

    return (
        <div className="signIn">
             <div className="mainLogo" style={{ padding: "24px 0 100px 0" }}>
                <span className="logo-movie">MOVIE</span>
                <span className="logo-search" style={{ color: "white" }}>SEARCH</span>
            </div>
            <div className="signInBlock">
                <h1 className="settings-h2" style={{ color: "white" }}>Sign In</h1>
                <div>
                    <h3 className="settings-h3" style={{ color: "white" }}>Email</h3>
                    <input
                      type="text"
                      value={formState.email}
                      onChange={(e: any) => handler('email', e.target.value)}
                      className="settings-input"
                      style={{ width: "96%", backgroundColor: "#323537", border: "none", color: "white" }}
                      placeholder="Your email"
                    />
                </div>
                <div>
                    <h3 className="settings-h3" style={{ color: "white" }}>Password</h3>
                    <input
                      type="password"
                      value={formState.password}
                      onChange={(e: any) => handler('password', e.target.value)}
                      className="settings-input"
                      style={{ width: "96%", backgroundColor: "#323537", border: "none", color: "white" }}
                      placeholder="Your password"
                    />
                </div>
                <NavLink to="/reset">
                    <span className="signIn-span">Forgot password?</span>
                </NavLink>
                <button className="settings-save-btm" onClick={handleSignIn} style={{ margin: "0", width: "100%" }}>Sign in</button>
                <span className="signIn-span signup-span">Don’t have an account?  
                  <NavLink to="/signup" className="signUp-link"> Sign Up</NavLink>
                </span>
            </div>
        </div>
    )
}

export { SignIn }

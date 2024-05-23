
import { IUserName } from "../../../types"
import "./UserName.css"

const UserName = ({ children} : IUserName) =>{



    let upperCaseIndex = -1
    for(let i = 0; i < children.length; i++){
        if(children[i] === children[i].toUpperCase()){
            upperCaseIndex = children.indexOf(children[i])
            break
        }
    }
    const userName = children.charAt(0).toUpperCase() + children.substring(1, upperCaseIndex) + " " + children.substring(upperCaseIndex, children.length);
    const nameArray = userName.split(' ')
    return(
        <div className="user">
            <p className="userLogoName">
                <span  className="logo">{nameArray.map(elem => elem.charAt(0))}</span>
                <span className="userName">{userName}</span>
            </p> 
        </div>
    )
}

export { UserName }
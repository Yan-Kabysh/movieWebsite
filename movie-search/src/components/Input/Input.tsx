import { IInput } from "../../types"
import "./Input.css"

const Input = ({placeholder, className, onChange, value}: IInput) =>{
    return (
        <>
            <input type="text" 
            placeholder={placeholder} 
            className={className} 
            value={value}  
            onChange = {(e) => onChange(e)}/>
        </>
    )
}

export { Input }
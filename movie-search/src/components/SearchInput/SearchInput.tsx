import { useState } from "react"
import { Input } from "../Input"
import "./SearchInput.css"
import { FaTimes } from 'react-icons/fa';


const SearchInput = () => {

    const [SearchInputState, setSearchinrutState] = useState("")

    return(
        <div className="search-input-container">
            <Input 
            placeholder="Search" 
            className="SearchInut"
            value = {SearchInputState}
            onChange = {(e: any) => setSearchinrutState(e.target.value)}/>
            {SearchInputState && (
                <button onClick={() => setSearchinrutState("")} className="clear-button">
                    <FaTimes />
      </button>
      )}
        </div>
    )
}

export { SearchInput }
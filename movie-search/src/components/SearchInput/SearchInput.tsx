import { useState } from "react"
import { Input } from "../Input"
import "./SearchInput.css"
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { searchMovies } from "../../redux/actionCreaters/moviesActionCreators";


const SearchInput = () => {

    const dispatch = useDispatch()

  

    const [SearchInputState, setSearchinrutState] = useState("")

    return(
        <div className="search-input-container">
            <input 
            placeholder="Search" 
            className="SearchInut"
            value = {SearchInputState}
            onKeyDown = {(e: any) => {
                console.log("enter")
                if(e.key === 'Enter'){
                    dispatch(searchMovies({limit: 20, page: 1, search: SearchInputState}))
                  }
              }}
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
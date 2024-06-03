import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { searchMovies, setIsSearch } from "../../redux/actionCreaters/moviesActionCreators";
import { IStoreState } from "../../types";
import { useNavigate } from "react-router-dom";
import "./SearchInput.css"
import { setFiltersState } from "../../redux/actionCreaters/uiActionCreaters";
import { Filters } from "../Filters";
import { FiltersIcon } from "../Icons";

const SearchInput = () => {
    const [searchInProgress, setSearchInProgress] = useState(false);

    const dispatch = useDispatch();
    const { limit, page } = useSelector((state: IStoreState) => state.movies);
    const filtersState = useSelector((state: IStoreState) => state.ui.filtersState)

    const navigate = useNavigate();
    const [searchInputState, setSearchInputState] = useState("");

    useEffect(() => {
        if (searchInProgress) {
            navigate("/movies/search");
            setSearchInProgress(false);
        }
    }, [searchInProgress, navigate]);

    const handleSearch = () => {
        dispatch(setIsSearch(true));
        dispatch(searchMovies({ limit, page, search: searchInputState }));
        setSearchInProgress(true);
    };

    return (
        <div className="search-input-container">
            <input
                placeholder="Search"
                className="SearchInput"
                value={searchInputState}
                onKeyDown={(e: any) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                onChange={(e: any) => setSearchInputState(e.target.value)}
            />
           
                <button onClick={() => dispatch(setFiltersState(!filtersState))} className="clear-button">
                   <FiltersIcon/>
                </button>
           
             {filtersState && <Filters/>}
        </div>
    );
};

export { SearchInput };

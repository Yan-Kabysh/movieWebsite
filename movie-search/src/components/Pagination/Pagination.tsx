import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../../redux/actionCreaters/moviesActionCreators"
import { IStoreState } from "../../types"

const Pagination = () =>{
    const dispatch = useDispatch()
    const {page, pages, total, limit} = useSelector((state: IStoreState) =>  state.movies)
   
    return(
        <div style={{display: "flex"}}>
            <button disabled = {page === 1}
            onClick={() => dispatch(setPage(page - 1))}>
                {"<"}
            </button>
            {page}
            <button disabled =  {page === pages}
              onClick={() => dispatch(setPage(page + 1))}>
                {">"}
            </button>
        </div>
    )
}

export {Pagination}
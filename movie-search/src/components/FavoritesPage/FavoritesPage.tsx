import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSavedMovies } from "../../redux/actionCreaters/userActionCreators"
import { IStoreState } from "../../types"
import { Header } from "../Header"
import { EmptyFavorites } from "../Icons"
import { Menu } from "../Menu"
import { Movies } from "../Movies"
import "./FavoritesPage.css"

const FavoritesPage = () =>{

    const dispatch = useDispatch()

    const theme = useSelector((state: IStoreState) => state.ui.theme)
    const {docs, limit, page} = useSelector((state: IStoreState) => state.movies)
    const userId = useSelector((state: IStoreState) => state.user.user.id)
    console.log(docs)
    console.log("id", userId)


    useEffect(() => {
        if (userId) {
            console.log("awdawdawdawdawdawd")
            dispatch(getSavedMovies(userId));
        }
    }, [userId, dispatch]);

    return(
        <div className={"MainPage " + theme}>
            <Header/>
            <div className="MainPageContent">
                <Menu/>
                {docs.length === 0 && <div className="emptyFavorites">
                    <EmptyFavorites/>
                    <span className="emptyFavoritesText">The list of favorite movies is empty</span>
                </div>}
                {docs &&  <Movies flag={true} limit={limit} page={page}/>}
            </div>
        </div>
    )
}

export { FavoritesPage }
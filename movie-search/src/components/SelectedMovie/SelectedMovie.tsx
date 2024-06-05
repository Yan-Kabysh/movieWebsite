import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSelectedMovie } from "../../redux/actionCreaters/moviesActionCreators";
import { checkFavorites, deleteFavorites, saveMovie } from "../../redux/actionCreaters/userActionCreators";
import { IIds, IStoreState } from "../../types";
import { EmptyPoster } from "../EmptyPoster";
import { Bookmark, FavoritesIcon, ShareIcon } from "../Icons";
import { Player } from "../Player";
import { Recomandation } from "../Recomendation";
import "./SelectedMovie.css"

const SelectedMovie = () => {
    const { id = "" } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state: IStoreState) => state.user.user)

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        dispatch(loadSelectedMovie(+id));
    }, [id, dispatch]);

    useEffect(() => {
        if (user && id) {
            dispatch(checkFavorites(user.id, +id))
        }
    }, [user, id]);

  

    const data = useSelector((state: IStoreState) => state.movies.movie);

    const data2 = useSelector((state: IStoreState) => state.movies);


    useEffect(() => {
        if (data && user) {
            console.log(data2)
            if (data2.isFavorite) {
                setIsFavorite(true);
            }
        }
    }, [data, user]);

   console.log(data)
    if (!data) {
        return <div>No data found</div>;
    }

    const saveClick = (ids: IIds) =>{
        dispatch(saveMovie(ids))
        setIsFavorite(true)
    }

    const deleteClick = (ids: IIds) => {
        dispatch(deleteFavorites(ids.userId, ids.movieId))
        setIsFavorite(false)

    }

    return (
        <div className="selectedMovie">
        <div className="selectedMovieBlock">
            <div className="selectedMoviePosterWithButtons">
                {data.poster?.url === undefined || data.poster?.url === null ? 
                <EmptyPoster /> : <img src={data.poster.url} alt={data.name} className="posterImage" />}
                <div className="selectedMovieBtns">
                        {isFavorite ? (
                            <button className="selectedMovieButton selectedMovieButtonDelete" style={{color: "white", borderRadius: "10px 0 0 10px"}} onClick={() => deleteClick({ userId: user.id, movieId: data.id })}>!{<Bookmark/>}</button>
                        ) : (
                            <button className="selectedMovieButton selectedMovieButtonSave" onClick={() => saveClick({ userId: user.id, movieId: data.id })}>{<Bookmark/>}</button>
                        )}
                        <button className="selectedMovieButton selectedMovieButtonShare">{<ShareIcon/>}</button>
                    </div>     
            </div>
            <div className="mainMovieInfo">
                <ul className="movieGenreList">
                    {data.genres?.map((genre, index) => (
                        <li className="movieGenre" key={index}>{genre.name}</li>
                    ))}
                </ul>
                <h1 className="selectedMovieName">{!!data.name  ? data.name : data.alternativeName}</h1>
                {data.rating &&<div className="ratings-block">
                   {
                    <p className={"ratingSelectedMovie " + ((data.rating.kp) >= 7 ? "green" : (data.rating.kp >= 5 ? "yellow" : "red"))}>{data.rating.kp.toFixed(1)}</p>}
                    <p className="ratingItem">{"IMDb " + data.rating.imdb}</p>

                   {data.movieLength && <p className="ratingItem">{data.movieLength + " min"}</p>}
                    
                </div>}
                <p className="selectedMovieDescr">{data.description}</p>
                <div className="movieDataList">
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Slogan</p>
                        <p className="movieDataListItemValue">{!!data.slogan ? data.slogan : "-"}</p>
                    </div>
                    { data.seriesLength && <div className="movieDataListItem">
                        <p className="movieDataListItemName">Series length</p>
                        <p className="movieDataListItemValue">{!!data.seriesLength ? data.seriesLength : "-"}</p>
                    </div>}
                    {data && data.year !== undefined && data.year !== null && (
                        <div className="movieDataListItem">
                            <p className="movieDataListItemName">Year</p>
                            <p className="movieDataListItemValue">{!!data.year ? data.year : "-"}</p>
                        </div>
                    )}

                    {data.budget && data.budget.value &&
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Budget</p>
                        <p className="movieDataListItemValue">{data.budget.currency +  data.budget.value.toLocaleString()}</p>
                    </div>}
                    {data.countries &&
                        <div className="movieDataListItem">
                        <p className="movieDataListItemName">Country</p>
                        <p className="movieDataListItemValue">{data.countries.map(elem => elem.name).join(', ')}</p>
                    </div>}
                    {data.persons.find(elem => elem.enProfession === "actor") &&
                        <div className="movieDataListItem">
                        <p className="movieDataListItemName">Actors</p>
                        <p className="movieDataListItemValue">{data.persons.filter(elem => elem.enProfession === "actor").map(elem => !!elem.name ? elem.name : elem.enName).join(', ')}</p>
                    </div>}
                    {data.persons.find(elem => elem.enProfession === "director") &&
                        <div className="movieDataListItem">
                        <p className="movieDataListItemName">Director</p>
                        <p className="movieDataListItemValue">{data.persons.filter(elem => elem.enProfession === "director").map(elem => !!elem.name ? elem.name : elem.enName).join(', ')}</p>
                    </div>}
                    
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Age rating</p>
                        <p className="movieDataListItemValue">{!!data.ageRating ? data.ageRating : "-"}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="player">
            <h2 className="selectedMovieTitle">Trailer</h2>
             <Player/>
        </div>
       
        {  data.similarMovies && data.similarMovies.length !== 0 &&    <h2 className="selectedMovieTitle">Recommendations</h2>}
           { data.similarMovies &&  data.similarMovies.length !== 0 &&     
            <Recomandation data={data.similarMovies}/>}
      
        </div>
       
    );
};

export { SelectedMovie };

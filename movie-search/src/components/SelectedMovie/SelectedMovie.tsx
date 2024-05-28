import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSelectedMovie } from "../../redux/actionCreaters/moviesActionCreators";
import { IStoreState } from "../../types";
import { EmptyPoster } from "../EmptyPoster";
import { FavoritesIcon, ShareIcon } from "../Icons";
import "./SelectedMovie.css"

const SelectedMovie = () => {
    const { id = "" } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSelectedMovie(+id));
    }, [id, dispatch]);

    const data = useSelector((state: IStoreState) => state.movies.movie);
   console.log(data)
    if (!data) {
        return <div>No data found</div>;
    }

    return (
        <div className="selectedMovieBlock">
            <div className="selectedMoviePosterWithButtons">
                {data.poster?.url === undefined || data.poster?.url === null ? 
                <EmptyPoster /> : <img src={data.poster.url} alt={data.name} className="posterImage" />}
                <div className="selectedMovieBtns">
                    <button className="selectedMovieButton">{<FavoritesIcon/>}</button>    
                    <button className="selectedMovieButton">{<ShareIcon/>}</button>    

                </div>    
            </div>
            <div >
                <ul className="movieGenreList">
                    {data.genres?.map((genre, index) => (
                        <li className="movieGenre" key={index}>{genre.name}</li>
                    ))}
                </ul>
                <h1 className="selectedMovieName">{data.name}</h1>
                <div className="ratings-block">
                    <p className={"ratingSelectedMovie " + ((data.rating.kp) >= 7 ? "green" : (data.rating.kp >= 5 ? "yellow" : "red"))}>{data.rating.kp}</p>
                    <p className="ratingItem">{"IMDb " + data.rating.imdb}</p>
                    <p className="ratingItem">{data.movieLength + " min"}</p>
                </div>
                <p className="selectedMovieDescr">{data.description}</p>
                <div className="movieDataList">
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Slogan</p>
                        <p className="movieDataListItemValue">{data.slogan}</p>
                    </div>
                    {data && data.year !== undefined && data.year !== null && (
                        <div className="movieDataListItem">
                            <p className="movieDataListItemName">Year</p>
                            <p className="movieDataListItemValue">{data.year}</p>
                        </div>
                    )}

                    {data.budget &&
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Budget</p>
                        <p className="movieDataListItemValue">{data.budget.value}</p>
                    </div>}
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Country</p>
                        <p className="movieDataListItemValue">{data.countries.map(elem => elem.name).join(', ')}</p>
                    </div>
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Actors</p>
                        <p className="movieDataListItemValue">{data.persons.filter(elem => elem.enProfession === "actor").map(elem => elem.name).join(', ')}</p>
                    </div>
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Director</p>
                        <p className="movieDataListItemValue">{data.persons.filter(elem => elem.enProfession === "director").map(elem => elem.name)}</p>
                    </div>
                    
                    <div className="movieDataListItem">
                        <p className="movieDataListItemName">Age</p>
                        <p className="movieDataListItemValue">{data.ageRating}</p>
                    </div>
                </div>
            </div>
        </div>
       
    );
};

export { SelectedMovie };

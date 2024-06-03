import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadMovies } from "../../redux/actionCreaters/moviesActionCreators";
import { IMovieData, IStoreState } from "../../types";
import { Movie } from "./Movie";
import "./Movies.css"

const Movies = ({ limit, page, year, rating, votes}: any) => {
   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMovies({ limit, page, year, rating, votes }));
    }, [limit, page]);

    const moviesData = useSelector((state: IStoreState) => state.movies.docs);

    return (
        <div className="movies">
            {moviesData && moviesData.map((movie: IMovieData) => (
                <NavLink to = {"/movies/" + movie.id} className="NavLink">
                    <Movie key={movie.id} data={movie} />
                </NavLink>
            ))}
        </div>
    );
}

export { Movies };

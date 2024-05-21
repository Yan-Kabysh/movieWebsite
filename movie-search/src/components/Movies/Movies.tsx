import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../../redux/actionCreaters/moviesActionCreators";
import { IMovieData, IStoreState } from "../../types";
import { Movie } from "./Movie";
import "./Movies.css"

const Movies = () => {
    const limit = 30;
    const page = 13;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMovies({ limit, page }));
    }, [dispatch, limit, page]);

    const moviesData = useSelector((state: IStoreState) => state.movies.docs);
    console.log("component", moviesData);

    return (
        <div className="movies">
            {moviesData && moviesData.map((movie: IMovieData) => (
                <Movie key={movie.id} data={movie} />
            ))}
        </div>
    );
}

export { Movies };

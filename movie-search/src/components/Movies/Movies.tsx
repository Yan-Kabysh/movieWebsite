import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../../redux/actionCreaters/moviesActionCreators";
import { IMovieData, IStoreState } from "../../types";
import { Movie } from "./Movie";

const Movies = () => {
    const limit = 20;
    const page = 10; // Исправлено на 1, если это не ошибка

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMovies({ limit, page }));
    }, [dispatch, limit, page]);

    const moviesData = useSelector((state: IStoreState) => state.movies.docs);
    console.log("component", moviesData);

    return (
        <div>
            {moviesData && moviesData.map((movie: IMovieData) => (
                <Movie key={movie.id} data={movie} />
            ))}
        </div>
    );
}

export { Movies };

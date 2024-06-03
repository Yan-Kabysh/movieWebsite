import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies, searchMovies } from "../../redux/actionCreaters/moviesActionCreators";
import { IStoreState } from "../../types";
import { Header } from "../Header";
import { Menu } from "../Menu";
import { Movies } from "../Movies";
import { Pagination } from "../Pagination";

const SearchPage = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: IStoreState) => state.ui.theme);
    const { limit, page } = useSelector((state: IStoreState) => state.movies);
    const [query, setQuery] = useState("");

    useEffect(() => {
        // Если нет запроса поиска, загружаем обычные фильмы
        if (!query) {
            dispatch(loadMovies({ limit, page }));
        }
    }, [limit, page]);

    useEffect(() => {
        // Если есть запрос поиска, выполняем поиск фильмов
        if (query) {
            dispatch(searchMovies({ limit, page, search: query }));
        }
    }, [query, limit, page, dispatch]);

    return (
        <div className={"MainPage " + theme}>
            <Header />
            <div className="MainPageContent">
                <Menu />
                <Movies limit={limit} page={page} />
            </div>
        </div>
    );
};

export { SearchPage };

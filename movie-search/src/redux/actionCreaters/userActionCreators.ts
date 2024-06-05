// actionCreaters/userActionCreators.ts
import { call, put, takeEvery } from "redux-saga/effects";
import { IChangePassword, IIds, ISignUp, IUser } from "../../types";
import { HIDE_MODAL, SHOW_MODAL } from "../actionTypes/modalActionTypes";
import { IS_FAVORITE } from "../actionTypes/moviesActionTypes";
import { CHANGE_PASSWORD, CHANGE_USER_DATA, CHECK_FAVORITES, DELETE_FAVORITE, GET_SAVED_MOVIES, LOADING_SAVED_MOVIES, SAVE_MOVIE, SET_USER, SIGN_IN_USER, SIGN_OUT, SIGN_UP_USER } from "../actionTypes/userActionTypes";
import { favoritesMovies } from "./moviesActionCreators";

const signUpUser = (userData: ISignUp, navigate: Function) => ({
    type: SIGN_UP_USER,
    userData,
    navigate
});

const setUser = (user: IUser) => ({
    type: SET_USER,
    user,
});

const signInUser = (signInData: { email: string, password: string }, navigate: Function) => ({
    type: SIGN_IN_USER,
    signInData,
    navigate
});

const changeUserData = (user: IUser) => ({
    type: CHANGE_USER_DATA,
    user,
})

const changePassword = (user: IChangePassword) => ({
    type: CHANGE_PASSWORD,
    user,
})

const signout = () =>({
    type: SIGN_OUT
})

const saveMovie = (ids: IIds) => ({
    type: SAVE_MOVIE,
    ids
})

const getSavedMovies = (userId: number) =>({
    type: GET_SAVED_MOVIES,
    userId
})

const loadingSavedMovies = () => ({
    type: LOADING_SAVED_MOVIES
});

const checkFavorites = (userId: number, movieId: number) => ({
    type: CHECK_FAVORITES,
    userId,
    movieId
})

const deleteFavorites = (userId: number, movieId: number) => ({
    type: DELETE_FAVORITE,
    userId,
    movieId
})

const isFavorite = (isFavorite: boolean) =>({
    type: IS_FAVORITE,
    isFavorite
})

function* fetchDeleteFavorites(action: any) {
    try {
        const resp: Response = yield call(fetch, `http://localhost:3001/user_movies/${action.userId}/${action.movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("resp.status", resp.status)

        if (resp.status === 200) {
           
           
            yield put({ type: SHOW_MODAL, payload: { message: "The film was successfully deleted", status: 'success' } });
        } else {
            
          
            yield put({ type: SHOW_MODAL, payload: { message: "Error when deleting movie", status: 'error' } });
        }
    } catch (error) {
      
        yield put({ type: SHOW_MODAL, payload: { message: 'Error deleting movie', status: 'error' } });
    } finally {
        yield put({ type: HIDE_MODAL });
    }
}

function* fetchCheckFavorites(action: any) {
    if(action.userId === 0){
        return
    }
    // yield put(loadingSavedMovies());
    console.log("asdasdasdasdasdasda", action)
    const { userId, movieId } = action
    const resp: Response = yield fetch(`http://localhost:3001/user_movies/${userId}/${movieId}`);
    if (resp.status === 200) {
      const data: boolean = yield resp.json()
      console.log(data) 
      yield put (isFavorite(data))
    }
}

function* fetchGetSavedMovies(action: any) {
    // yield put(loadingSavedMovies());
    console.log(action)
    const resp: Response = yield fetch(`http://localhost:3001/user_movies/${action.userId}`);
    if (resp.status === 200) {
      const data: number[] = yield resp.json()
      console.log(data)
    
      yield put(favoritesMovies(data))
    }
    yield put(loadingSavedMovies());

}

function* fetchSaveMovie(action: any) {
    const resp: Response = yield fetch('http://localhost:3001/user_movies', {
        method: 'POST',
        body: JSON.stringify(action.ids),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (resp.status === 201) {
        yield put({ type: SHOW_MODAL, payload: { message: "The movie was successfully saved", status: "success" } });
    } else if (resp.status === 400) {
        yield put({ type: SHOW_MODAL, payload: { message: "The movie has already been added to your favorites", status: "error" } });
    }
}

function* fetchChangePassword(action: any) {
    const resp: Response = yield fetch('http://localhost:3001/update_password', {
        method: 'POST',
        body: JSON.stringify(action.user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (resp.status === 200) {
      
        console.log("fetchChangePassword");
        yield put({ type: SHOW_MODAL, payload: { message: "Password changed successfully", status: "success" } });

    }
}

function* fetchChangeUserData(action: any) {
    const resp: Response = yield fetch('http://localhost:3001/update_user', {
        method: 'POST',
        body: JSON.stringify(action.user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (resp.status === 200) {
        const data: IUser = yield resp.json();
        console.log("fetchChangeUserData", data);
        localStorage.setItem("user", JSON.stringify({user: {...data}}));
        yield put({ type: SHOW_MODAL, payload: { message: "Data changed successfully", status: "success" } });
    }
}

function* signIn(action: any) {
    try {
        const resp: Response = yield call(fetch, 'http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(action.signInData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (resp.status === 200) {
            const data: IUser = yield resp.json();
            console.log("fetchSignUp response data:", data);
            yield put(setUser(data));
            localStorage.setItem("user", JSON.stringify(data));
            action.navigate('/movies/home'); // Используем navigate для перехода
        } else {
            console.error('Login failed with status:', resp.status);
            // Дополнительная обработка ошибки, если необходимо
        }
    } catch (error) {
        console.error('Login failed with error:', error);
        // Дополнительная обработка ошибки, если необходимо
    }
}

function* fetchSignUp(action: any) {
    try {
        console.log("fetchSignUp action:", action); // Логируем действие
        const response: Response = yield fetch (`http://localhost:3001/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.userData)
        });
        if (response.status === 201) {
            const data: IUser = yield response.json(); // Предполагаем, что сервер возвращает данные пользователя
            console.log("fetchSignUp response data:", data); // Логируем ответ сервера
            yield put(setUser(data)); // Используем данные из ответа сервера
            localStorage.setItem("user", JSON.stringify({...data}));
            console.log(data)
            action.navigate('/movies/home'); // Используем navigate для перехода
        } else {
            console.error("Failed to sign up user:", response.status);
        }
    } catch (error) {
        console.error("fetchSignUp error:", error);
    }
}

function* watcherUser() {
    yield takeEvery(SIGN_UP_USER, fetchSignUp);
    yield takeEvery(SIGN_IN_USER, signIn);
    yield takeEvery(CHANGE_USER_DATA, fetchChangeUserData);
    yield takeEvery(CHANGE_PASSWORD, fetchChangePassword);
    yield takeEvery(SAVE_MOVIE, fetchSaveMovie);
    yield takeEvery(GET_SAVED_MOVIES, fetchGetSavedMovies);
    yield takeEvery(CHECK_FAVORITES, fetchCheckFavorites);
    yield takeEvery(DELETE_FAVORITE, fetchDeleteFavorites);

}

export { signUpUser, watcherUser, setUser, signInUser, changeUserData, changePassword, signout, saveMovie, getSavedMovies, checkFavorites, deleteFavorites };
